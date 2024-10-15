<template>
  <div class=" max-w-full md:w-3/4 mx-auto p-4">
    <div class=" flex justify-center items-center mb-4">
      <button @click="prevMonth" class="bg-gray-300 text-gray-700 p-2 rounded shadow hover:bg-gray-400">&lt;</button>
      <h2 class="text-lg mx-8 font-bold text-gray-800">{{ monthYear }}</h2>
      <button @click="nextMonth" class="bg-gray-300 text-gray-700 p-2 rounded shadow hover:bg-gray-400">&gt;</button>
    </div>
    
    <div class="calendar-grid grid grid-cols-7 gap-2">
      <div v-for="(day, index) in daysOfWeek" :key="index" class="text-center font-semibold text-gray-700">
        {{ day }}
      </div>
      
      <div v-for="day in blankDays" :key="day" class="empty-day"></div>
      
      <div v-for="day in daysInMonth" :key="day.date" class="day-cell border p-2 rounded shadow-sm relative">
        <div class="text-gray-800">{{ day.day }}</div>
        <div 
          v-for="event in day.events" 
          :key="event.id" 
          class="event bg-blue-500 text-white text-sm p-1 mt-2 rounded shadow cursor-pointer hover:bg-blue-600 transition-colors duration-200 text-nowrap"
          @click="showEventDetails(event)"
        >
          {{ event.title }} - {{ event.time }}
        </div>
      </div>
    </div>

    <EventDetailsModal 
      v-if="selectedEvent" 
      :event="selectedEvent" 
      :isVisible="isModalVisible" 
      @close="closeModal" 
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, addMonths, subMonths, isSameMonth, isSameDay } from 'date-fns';
import EventDetailsModal from './EventDetailsModal.vue';

const currentDate = ref(new Date());
const events = ref([
  {
    id: 1,
    title: 'Event 1',
    description: 'Description for Event 1',
    date: new Date(),
    time: '10:00',
  },
  {
    id: 2,
    title: 'Event 2',
    description: 'Description for Event 2',
    date: new Date(new Date().setDate(new Date().getDate() + 3)), 
    time: '14:30',
  },
]);

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const monthYear = computed(() => format(currentDate.value, 'MMMM yyyy'));

const startOfCurrentMonth = computed(() => startOfMonth(currentDate.value));
const endOfCurrentMonth = computed(() => endOfMonth(currentDate.value));

const startOfCalendar = computed(() => startOfWeek(startOfCurrentMonth.value, { weekStartsOn: 0 }));
const endOfCalendar = computed(() => endOfWeek(endOfCurrentMonth.value, { weekStartsOn: 0 }));

const daysInMonth = computed(() => {
  const days = eachDayOfInterval({
    start: startOfCalendar.value,
    end: endOfCalendar.value
  });

  return days.map(date => {
    return {
      date,
      day: format(date, 'd'),
      events: events.value.filter(event => isSameDay(new Date(event.date), date))
    };
  });
});

const blankDays = computed(() => {
  return Array.from({ length: startOfCalendar.value.getDay() });
});

const prevMonth = () => {
  currentDate.value = subMonths(currentDate.value, 1);
};

const nextMonth = () => {
  currentDate.value = addMonths(currentDate.value, 1);
};

const selectedEvent = ref(null);
const isModalVisible = ref(false);

const showEventDetails = (event) => {
  selectedEvent.value = event;
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
  selectedEvent.value = null;
};
</script>

<style scoped>
.day-cell {
  min-height: 100px;
  position: relative;
}

.empty-day {
  visibility: hidden;
}

@media (max-width: 640px) {
  .day-cell {
    min-height: 70px;
  }
}
</style>

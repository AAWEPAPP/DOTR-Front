<template>
  <div class="w-full h-full">
    <button 
      @click="showCreateEventForm = true" 
      class="bg-blue-500 text-white p-2 rounded mb-4 text-center text-md"
      v-if="!showCreateEventForm"
    >
      <font-awesome-icon icon="fa-regular fa-square-plus" /> Add
    </button>

    <CreateEvent 
      v-if="showCreateEventForm" 
      @eventCreated="addEvent" 
      @cancelCreation="showCreateEventForm = false"
    />

    <div class="w-full flex flex-col justify-start items-center" v-if="events.length > 0">
      <div 
        v-for="event in events" 
        :key="event.id" 
        class="w-full flex flex-col justify-center gap-4 md:flex md:justify-between md:items-center md:flex-row mb-4 p-4 border rounded shadow-sm shadow-slate-500"
      >
        <div>
          <div v-if="event.isEditing">
            <input 
              type="text" 
              v-model="event.tempTitle" 
              class="border rounded p-2 w-full shadow-sm shadow-slate-500"
            />
          </div>
          <div v-else>
            <h2 class="text-xl font-bold">{{ event.title }}</h2>
          </div>
        </div>

        <div>
          <div v-if="event.isEditing">
            <Datepicker 
              v-model="event.tempDate" 
              :value="event.tempDate" 
              class="border rounded p-2 w-full shadow-sm shadow-slate-500"
            />
          </div>
          <div v-else>
            <p>{{ event.displayDate }}</p>
          </div>
        </div>

        <div>
          <div v-if="event.isEditing">
            <input 
              type="time" 
              v-model="event.tempTime" 
              class="border rounded p-2 w-full shadow-sm shadow-slate-500"
            />
          </div>
          <div v-else>
            <p>{{ event.displayTime }}</p>
          </div>
        </div>

        <div>
          <div v-if="event.isEditing">
            <textarea 
              v-model="event.tempDescription" 
              class="h-full border rounded p-2 w-full shadow-sm shadow-slate-500"
            ></textarea>
          </div>
          <div v-else>
            <p>{{ event.description }}</p>
          </div>
        </div>

        <div class="flex space-x-4 justify-end">
          <button 
            v-if="event.isEditing" 
            @click="confirmEdit(event)" 
            class="text-green-500"
          >
            <font-awesome-icon icon="fa-solid fa-check" />
          </button>
          <button 
            v-else 
            @click="editEvent(event)" 
            class="text-blue-500"
          >
            <font-awesome-icon icon="fa-solid fa-pen" />
          </button>

          <button 
            v-if="event.isEditing" 
            @click="cancelEdit(event)" 
            class="text-red-500"
          >
            <font-awesome-icon icon="fa-solid fa-x" />
          </button>
          <button 
            v-else 
            @click="deleteEvent(event.id)" 
            class="text-red-500"
          >
            <font-awesome-icon icon="fa-solid fa-trash-can" />
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No events available.</p>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import CreateEvent from './CreateEvent.vue';
import Datepicker from 'vue3-datepicker';
import { getAllEvents, updateEvent as updateEventAPI, deleteEvent as deleteEventAPI } from "../../services/apiService";

const events = ref([
  // Sample event data
  {
    id: 1,
    title: "Event 1",
    description: "This is the first event.",
    displayDate: "2022-12-31",
    displayTime: "15:00"
  },
  {
    id: 2,
    title: "Event 2",
    description: "This is the second event.",
    displayDate: "2023-01-01",
    displayTime: "10:00"
  }
]);
const showCreateEventForm = ref(false);
// onMounted(async () => {
//   try {
//     const fetchedEvents = await getAllEvents();
//     events.value = fetchedEvents.map(event => {
//       const dateObj = new Date(event.date);

//       return {
//         ...event,
//         isEditing: false, 
//         tempTitle: event.title,
//         tempDescription: event.description,
//         tempDate: dateObj, 
//         tempTime: dateObj.toISOString().substr(11, 5),
//         displayDate: dateObj.toLocaleDateString(),
//         displayTime: dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//       };
//     });
//   } catch (error) {
//     console.error("Error fetching events:", error);
//   }
// });

const addEvent = (newEvent) => {
  events.value.push(newEvent);
  showCreateEventForm.value = false;
};

const editEvent = (event) => {
  event.isEditing = true;
  event.tempTitle = event.title;
  event.tempDescription = event.description;
  event.tempDate = new Date(event.date);
  event.tempTime = event.time;
};

const cancelEdit = (event) => {
  event.isEditing = false;
};

const confirmEdit = async (event) => {
  const date = new Date(event.tempDate);
  const [hours, minutes] = event.tempTime.split(':');
  date.setHours(hours);
  date.setMinutes(minutes);

  try {
    const updatedEvent = await updateEventAPI(event.id, {
      title: event.tempTitle,
      description: event.tempDescription,
      date: date.toISOString(),
      time: event.tempTime
    });

    const index = events.value.findIndex(e => e.id === event.id);
    if (index !== -1) {
      events.value[index] = updatedEvent;
      events.value[index].displayDate = new Date(updatedEvent.date).toLocaleDateString();
      events.value[index].displayTime = new Date(updatedEvent.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    event.isEditing = false;
  } catch (error) {
    console.error('Error updating event:', error);
  }
};

const deleteEvent = async (id) => {
  try {
    await deleteEventAPI(id);
    events.value = events.value.filter(event => event.id !== id);
  } catch (error) {
    console.error("Error deleting event:", error);
  }
};
</script>

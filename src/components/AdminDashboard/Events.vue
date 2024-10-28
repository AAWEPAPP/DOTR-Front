<template>
  <div class="w-full h-full">
    <!-- Button for creating event -->
    <button 
      @click="showCreateEventForm = true" 
      class="bg-blue-500 text-white p-2 rounded mb-4 text-center text-md w-1/8 sm:w-auto"
      v-if="!showCreateEventForm"
    >
      <font-awesome-icon icon="fa-regular fa-square-plus" /> Add
    </button>

    <!-- CreateEvent form -->
    <CreateEvent 
      v-if="showCreateEventForm" 
      @eventCreated="addEvent" 
      @cancelCreation="showCreateEventForm = false"
    />

    <!-- Table Header for Desktop -->
    <div class="hidden md:grid w-full grid-cols-5 gap-4 p-4 border-b font-bold  rounded-t-md">
      <div class="col-span-1 text-left">Title</div>
      <div class="col-span-1 text-left">Date</div>
      <div class="col-span-1 text-left">Time</div>
      <div class="col-span-1 text-left">Description</div>
      <div class="col-span-1 text-right">Actions</div>
    </div>

    <!-- Events List -->
    <div class="w-full flex flex-col justify-start items-center" v-if="events.length > 0">
      <div 
        v-for="event in events" 
        :key="event.id" 
        class="w-full grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 p-4 border rounded shadow-sm shadow-slate-500"
      >
        <!-- Title -->
        <div class="col-span-1 text-left flex flex-col md:flex-row items-start md:items-center">
          <span class="block text-xs font-bold text-gray-500 md:hidden">Title:</span>
          <div v-if="event.isEditing" class="w-full">
            <input 
              type="text" 
              v-model="event.tempTitle" 
              class="border rounded p-2 w-full shadow-sm shadow-slate-500"
            />
          </div>
          <div v-else class="text-xl font-bold">
            {{ event.title }}
          </div>
        </div>

        <!-- Date -->
        <div class="col-span-1 text-left flex flex-col md:flex-row items-start md:items-center">
          <span class="block text-xs font-bold text-gray-500 md:hidden">Date:</span>
          <div v-if="event.isEditing" class="w-full">
            <Datepicker 
              v-model="event.tempDate" 
              :value="event.tempDate" 
              class="border rounded p-2 w-full shadow-sm shadow-slate-500"
            />
          </div>
          <div v-else class="text-sm">
            {{ event.displayDate }}
          </div>
        </div>

        <!-- Time -->
        <div class="col-span-1 text-left flex flex-col md:flex-row items-start md:items-center">
          <span class="block text-xs font-bold text-gray-500 md:hidden">Time:</span>
          <div v-if="event.isEditing" class="w-full">
            <input 
              type="time" 
              v-model="event.tempTime" 
              class="border rounded p-2 w-full shadow-sm shadow-slate-500"
            />
          </div>
          <div v-else class="text-sm">
            {{ event.displayTime }}
          </div>
        </div>

        <!-- Description -->
        <div class="col-span-1 text-left flex flex-col md:flex-row items-start md:items-center ">
          <span class="block text-xs font-bold text-gray-500 md:hidden">Description:</span>
          <div v-if="event.isEditing" class="w-full">
            <textarea 
              v-model="event.tempDescription" 
              class="border rounded p-2 w-full shadow-sm shadow-slate-500"
            ></textarea>
          </div>
          <div v-else class="text-sm">
            {{ event.description }}
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="col-span-1 text-right flex justify-end items-center space-x-4">
          <!-- Edit/Confirm/Cancel/Delete Buttons -->
          <div v-if="event.isEditing" class="flex gap-4">
            <button @click="confirmEdit(event)" class="text-green-500">
              <font-awesome-icon icon="fa-solid fa-check" />
            </button>
            <button @click="cancelEdit(event)" class="text-red-500">
              <font-awesome-icon icon="fa-solid fa-x" />
            </button>
          </div>
          <div v-else class="flex gap-4">
            <button @click="editEvent(event)" class="text-blue-500">
              <font-awesome-icon icon="fa-solid fa-pen" />
            </button>
            <button @click="deleteEvent(event.id)" class="text-red-500">
              <font-awesome-icon icon="fa-solid fa-trash-can" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- No Events Found -->
    <div v-else>
      <p class="text-center text-gray-500">No events available.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CreateEvent from './CreateEvent.vue';
import Datepicker from 'vue3-datepicker';
import { getAllEvents, updateEvent as updateEventAPI, deleteEvent as deleteEventAPI, validateAuthToken as validateAuth } from "../../services/apiService";

// Sample event data
const events = ref([
  { id: 1, title: "Event 1", description: "This is the first event.", displayDate: "2022-12-31", displayTime: "15:00" },
  { id: 2, title: "Event 2", description: "This is the second event.", displayDate: "2023-01-01", displayTime: "10:00" }
]);

onMounted(() => {
  getAllEventsFromAPI();
})

// Show/Hide Create Event form
const showCreateEventForm = ref(false);

const getAllEventsFromAPI = async () => {
  try{
    const response = await getAllEvents();
    events.value = response.data;}
    catch(error){console.error(error);}
}

// Add Event
const addEvent = (newEvent) => {
  events.value.push(newEvent);
  showCreateEventForm.value = false;
};

// Edit Event
const editEvent = (event) => {
  event.isEditing = true;
  event.tempTitle = event.title;
  event.tempDescription = event.description;
  event.tempDate = new Date(event.date);
  event.tempTime = event.time;
};

// Cancel Edit
const cancelEdit = (event) => {
  event.isEditing = false;
};

// Confirm Edit
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

// Delete Event
const deleteEvent = async (id) => {
  try {
    await deleteEventAPI(id);
    events.value = events.value.filter(event => event.id !== id);
  } catch (error) {
    console.error("Error deleting event:", error);
  }
};
</script>

<template>
  <div class="w-full h-full">
    <button 
      @click="showCreateEventForm = true" 
      class="bg-blue-500 text-white p-2 rounded mb-4 text-center text-md"
      v-if="!showCreateEventForm"
    >
    <font-awesome-icon icon="fa-regular fa-square-plus" />  Add
    </button>

    <CreateEvent 
      v-if="showCreateEventForm" 
      @eventCreated="addEvent" 
      @cancelCreation="showCreateEventForm = false"
    />

    <div class="w-full flex flex-col justify-start items-center">
      <div v-for="event in events" :key="event.id" class="w-full flex justify-between items-center mb-4 p-4 border rounded shadow-sm shadow-slate-500">
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
            <p>{{ event.date.toLocaleDateString() }}</p>
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
            <p>{{ event.time }}</p>
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
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CreateEvent from './CreateEvent.vue';
import Datepicker from 'vue3-datepicker';

const events = ref([
  {
    id: 1,
    title: 'Event 1',
    description: 'Description for Event 1',
    date: new Date(),
    time: '10:00',
    isEditing: false,
    tempTitle: '',
    tempDescription: '',
    tempDate: null,
    tempTime: ''
  },
  {
    id: 2,
    title: 'Event 2',
    description: 'Description for Event 2',
    date: new Date(), 
    time: '14:30',
    isEditing: false,
    tempTitle: '',
    tempDescription: '',
    tempDate: null,
    tempTime: ''
  },
]);

const showCreateEventForm = ref(false);

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

const confirmEdit = (event) => {
  event.isEditing = false;
  event.title = event.tempTitle;
  event.description = event.tempDescription;
  event.date = event.tempDate;
  event.time = event.tempTime;
  // Save changes to the database
};

const deleteEvent = (eventId) => {
  events.value = events.value.filter(event => event.id !== eventId);
};

const addEvent = (newEvent) => {
  events.value.push(newEvent);
  showCreateEventForm.value = false;
};
</script>
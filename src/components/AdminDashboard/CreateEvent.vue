<template>
  <div class="create-event-form p-4 border rounded shadow-sm shadow-slate-500 mb-4">
    <h2 class="text-xl font-bold mb-4">Create New Event</h2>
    
    <div class="mb-4">
      <label class="block mb-2 font-semibold">Title</label>
      <input 
        type="text" 
        v-model="newEvent.title" 
        class="border rounded p-2 w-full shadow-sm shadow-slate-500"
      />
    </div>
    
    <div class="mb-4">
      <label class="block mb-2 font-semibold">Description</label>
      <textarea 
        v-model="newEvent.description" 
        class="border rounded p-2 w-full shadow-sm shadow-slate-500"
      ></textarea>
    </div>
    
    <div class="mb-4">
      <label class="block mb-2 font-semibold">Date</label>
      <Datepicker 
        v-model="newEvent.date" 
        class="border rounded p-2 w-full shadow-sm shadow-slate-500"
      />
    </div>
    
    <div class="mb-4">
      <label class="block mb-2 font-semibold">Time</label>
      <input 
        type="time" 
        v-model="newEvent.time" 
        class="border rounded p-2 w-full shadow-sm shadow-slate-500"
      />
    </div>
    
    <div class="mt-4 flex space-x-2">
      <button 
        @click="createEvent" 
        class="bg-green-500 text-white p-2 rounded"
      >
        Create
      </button>
      <button 
        @click="cancelCreation" 
        class="bg-red-500 text-white p-2 rounded"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Datepicker from 'vue3-datepicker';

const newEvent = ref({
  title: '',
  description: '',
  date: null,
  time: ''
});

const emit = defineEmits(['eventCreated', 'cancelCreation']);

const createEvent = () => {
  if (newEvent.value.title && newEvent.value.description && newEvent.value.date && newEvent.value.time) {
    emit('eventCreated', { 
      ...newEvent.value, 
      id: Date.now(), 
      isEditing: false 
    });
    resetForm();
  }
};

const cancelCreation = () => {
  emit('cancelCreation');
  resetForm();
};

const resetForm = () => {
  newEvent.value.title = '';
  newEvent.value.description = '';
  newEvent.value.date = null;
  newEvent.value.time = '';
};
</script>
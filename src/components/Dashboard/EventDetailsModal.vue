<template>
    <div 
      v-if="isVisible"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-lg w-3/4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold text-gray-800">{{ event.title }}</h2>
          <button 
            @click="closeModal"
            class="text-gray-600 hover:text-red-500 focus:outline-none transition-colors duration-300 p-2"
          >
            &times;
          </button>
        </div>
        <p class="text-gray-700 mb-2"><strong>Date:</strong> {{ event.date.toLocaleDateString() }}</p>
        <p class="text-gray-700 mb-2"><strong>Time:</strong> {{ event.time }}</p>
        <p class="text-gray-700"><strong>Description:</strong> {{ event.description }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    event: {
      type: Object,
      required: true
    },
    isVisible: {
      type: Boolean,
      default: false
    }
  });
  
  const emit = defineEmits(['close']);
  
  const closeModal = () => {
    emit('close');
  };
  </script>
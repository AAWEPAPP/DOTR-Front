<template>
  <div class="p-4  mx-auto">
    <div class="border-b border-gray-300">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          @click="activeTab = index"
          :class="[
            'py-2 px-4 focus:outline-none transition-colors duration-300',
            activeTab === index
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-600 hover:text-blue-500'
          ]"
        >
          {{ tab }}
        </button>
    </div>

    <div class="mt-4">
      <div v-if="activeTab === 0" class="flex justify-center items-center p-4 bg-white rounded shadow">
        <Events />
      </div>
      <div v-if="activeTab === 1" class="p-4 bg-white rounded shadow">
        
      </div>
      <div v-if="activeTab === 2" class="p-4 bg-white rounded shadow">
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Events from '../components/AdminDashboard/Events.vue';

const tabs = ref(['Events', 'Users', 'Tab 3']);

const activeTab = ref(0);

const props = defineProps({
    isAdminVisible: { type: Boolean, default: false }
  });

const handleClose = () => {
    props.isAdminVisible = false;
}
</script>
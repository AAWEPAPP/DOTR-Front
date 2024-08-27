<template>
  <div 
    class="fixed inset-0 bg-white bg-opacity-90 p-4 z-50 overflow-auto"
    @click.self="handleClose"
  >
    <div class="w-full max-w-4xl mx-auto bg-white rounded shadow-lg max-h-screen overflow-y-auto">
      <div class="border-b border-gray-300 flex justify-between items-center">
        <div>
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
        <button 
          @click="handleClose"
          class="text-gray-600 hover:text-red-500 focus:outline-none transition-colors duration-300 p-2"
          aria-label="Close admin dashboard"
        >
          &times;
        </button>
      </div>

      <div class="mt-4 p-4">
        <div v-if="activeTab === 0">
          <Events />
        </div>
        <div v-if="activeTab === 1">
          
        </div>
        <div v-if="activeTab === 2">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Events from '../components/AdminDashboard/Events.vue';

const tabs = ref(['Events', 'Users', 'Tab 3']);
const activeTab = ref(0);

const props = defineProps({
  isAdminVisible: { type: Boolean, default: false }
});

const emit = defineEmits(['update:isAdminVisible']);

const handleClose = () => {
  emit('update:isAdminVisible', false);
};

const disableScroll = () => {
  document.body.style.overflow = 'hidden';
};

const enableScroll = () => {
  document.body.style.overflow = '';
};

onMounted(() => {
  if (props.isAdminVisible) {
    disableScroll();
  }
});

onBeforeUnmount(() => {
  enableScroll();
});

watch(() => props.isAdminVisible, (newVal) => {
  if (newVal) {
    disableScroll();
  } else {
    enableScroll();
  }
});
</script>
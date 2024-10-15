<template>
  <div class="flex justify-between items-center">
    <a href="/dashboard"><img class="h-auto w-20" src="../../assets/dotrlogo.svg" alt="Dog on the roof logo"></a>
    <div class="flex justify-end items-center gap-6 p-4">
      <h2 class="text-6">Hello {{firstName}}!</h2>
      <div @click="toggleMenu" class="block md:hidden">
        <svg
          class="w-8 h-8 text-black"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </div>
      <div class="hidden md:flex md:gap-6 ">
        <button v-if="isAdmin" @click="$emit('toggleAdminDashboard')" class="rounded-md border border-blue-600 p-1 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-300">{{ isAdminVisible ? 'Close' : 'Admin' }}</button>
        <button class="rounded-md bg-red-600 text-white p-1">Logout</button>
      </div>
      <div v-if="isMenuOpen" class="md:hidden flex flex-col justify-center items-center absolute top-20 left-0 w-full bg-white text-black p-4 space-y-2 z-10">
        <button v-if="isAdmin" @click="$emit('toggleAdminDashboard')" class="block w-1/4 p-1 text-center rounded-md border border-gray-700 shadow-lg hover:bg-blue-600 hover:text-white">{{ isAdminVisible ? 'Close' : 'Admin' }}</button>
        <button class="block p-1 rounded-md text-white  w-1/4 text-center bg-red-500">Logout</button>
      </div>
    </div
   >
  </div>
</template>

<script setup>
    import { ref } from 'vue';

    const isMenuOpen = ref(false);

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const props = defineProps({
        userFirstName: {
            type: String,
            required: true,
        },
        admin: {
            type: Boolean,
            default: true,
        },
        isAdminVisible: Boolean,

    });
    const isAdmin = ref(props.admin);
    const firstName = ref(props.userFirstName);
</script>
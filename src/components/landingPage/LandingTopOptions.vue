<template>
  <nav class="flex items-center justify-between p-6 bg-white md:justify-end">
    <div class="text-black text-2xl font-bold md:hidden">
      <img class="h-auto w-20" src="../../assets/dotrlogo.jpg" alt="Dog On The Roof Logo">
    </div>

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

    <div class="hidden md:flex space-x-4">
      <RegisterBtn :onClick="handleRegister" class="p-1 w-20 text-black rounded-md border border-gray-700 hover:bg-blue-600 hover:text-white hover:border-none  hover:shadow-md h-8"></RegisterBtn>
      <LoginBtn :onClick="handleLogin"></LoginBtn>
    </div>

    <div v-if="isMenuOpen" class="md:hidden absolute top-20 left-0 w-full bg-white text-black p-4 space-y-2 z-10">
      <RegisterBtn :onClick="handleRegister" class="block w-full p-1 text-center rounded-md border border-gray-700 shadow-lg hover:bg-blue-600 hover:text-white"></RegisterBtn>
      <LoginBtn :onClick="handleLogin" class="block w-full text-center"></LoginBtn>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import LoginBtn from '../UI/LoginBtn.vue';
import RegisterBtn from '../UI/RegisterBtn.vue';
import { useRouter } from 'vue-router';

const isMenuOpen = ref(false);
const router = useRouter();


const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const handleRegister = () => {
  router.push('/register');
};

const handleLogin = () => {
  router.push('/login');
};

</script>
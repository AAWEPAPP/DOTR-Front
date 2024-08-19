<template>
    <RegisterBtn :onClick="handleRegister" class="p-1 w-20 text-black rounded-md border border-gray-700 shadow-lg hover:bg-blue-600 hover:text-white hover:border-none h-8"></RegisterBtn>
    <LoginBtn :onClick="handleLogin"></LoginBtn>
</template>

<script setup>
  import LoginBtn from '../UI/LoginBtn.vue'
  import RegisterBtn from '../UI/RegisterBtn.vue'

  const handleRegister = () => {
    router.push('/register')
  }

  const handleLogin = () => {
    router.push('/login')
  }
</script>
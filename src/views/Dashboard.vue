<template>
  <DashboardNavBar :userFirstName="user.firstName" :isAdminVisible="isAdminVisible" @toggleAdminDashboard="onToggleAdminDashboard"></DashboardNavBar>
  <AdminDashboard :isAdminVisible="isAdminVisible" @update:isAdminVisible="isAdminVisible = $event" />
  <div class="flex justify-center mt-20 h-auto w-full md:block md:mt-0"><Calendar /></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getUserById } from '../services/apiService';

import AdminDashboard from '../views/AdminDashboard.vue';
import DashboardNavBar from '../components/Dashboard/DashboardNavBar.vue';
import Calendar from '../components/Dashboard/Calendar.vue';

const isAdminVisible = ref(false);

const firstName = localStorage.getItem('firstName');
const userId = localStorage.getItem('userId');

const user = { firstName: firstName };

onMounted (() => {
  getAdminStatus();
});

const getAdminStatus = async () => {
  try{
    const response = await getUserById(userId);
    console.log(response);
  } catch(error){
    console.error(error);
  }
}

const onToggleAdminDashboard = () => {
  isAdminVisible.value = !isAdminVisible.value;
};
</script>

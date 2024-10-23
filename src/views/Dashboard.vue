<template>
  <DashboardNavBar :userFirstName="user.firstName" :isAdminVisible="isAdminVisible" @toggleAdminDashboard="onToggleAdminDashboard"></DashboardNavBar>
  <AdminDashboard :isAdminVisible="isAdminVisible" @update:isAdminVisible="isAdminVisible = $event" />
  <div class="flex justify-center mt-20 h-auto w-full md:block md:mt-0"><Calendar /></div>
</template>

<script setup>
import { ref } from 'vue';

import AdminDashboard from '../views/AdminDashboard.vue';
import DashboardNavBar from '../components/Dashboard/DashboardNavBar.vue';
import Calendar from '../components/Dashboard/Calendar.vue';

const isAdminVisible = ref(false);
const user = {
  firstName: 'Alec'
}
const onToggleAdminDashboard = () => {
  isAdminVisible.value = !isAdminVisible.value;
};
</script>

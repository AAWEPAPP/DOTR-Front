<template>
  <DashboardNavBar :userFirstName="user.firstName" :isAdminVisible="isAdminVisible" @toggleAdminDashboard="onToggleAdminDashboard"></DashboardNavBar>
  <AdminDashboard v-if="isAdminVisible"></AdminDashboard>
</template>

<script setup>
    import { ref } from 'vue';
    
    import AdminDashboard from '../views/AdminDashboard.vue';
    import DashboardNavBar from '../components/Dashboard/DashboardNavBar.vue';

    const isAdminVisible = ref(false);
    const user = {
      firstName: 'Alec'
    }
    const onToggleAdminDashboard = () => {
      isAdminVisible.value =!isAdminVisible.value;
    }
</script>
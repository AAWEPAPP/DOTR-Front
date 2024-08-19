<template>
    <div class="fixed top-0 right-1 w-full h-14 flex justify-end items-center gap-8 pr-10 shadow-lg bg-white "><LandingTopOptiionsVue></LandingTopOptiionsVue></div>
    <div class="flex flex-col items-end h-auto p-20">
        <MeetingList></MeetingList>
    </div>
</template>

<script setup>
import MeetingList from '../components/landingPage/MeetingList.vue'
import LandingTopOptiionsVue from '../components/landingPage/LandingTopOptions.vue'
</script>
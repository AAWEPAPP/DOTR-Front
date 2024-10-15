<template>
    <div class="flex flex-col justify-center items-center">
        <img class="hidden md:block md:h-auto md:w-1/4 md:mb-16 " src="../../assets/dotrlogo.svg" alt="">
        <ol class="flex flex-col justify-center items-center gap-4 font-roboto w-full h-auto mb-16 ">
            <li v-for="event in events" :key="event.name" class="flex flex-col justify-center items-center content-center md:w-1/6 border-b border-black ">
                <h1 class="text-lg font-medium">{{event.name}}</h1>
                <p class="text-md">{{event.date}} at: {{event.time}}</p>
            </li>
        </ol>
    </div>
    
</template>

<script setup>
    import { ref } from 'vue';
    import { getAllEvents } from '../../services/apiService';

    const events = ref([])

    async function fetchEvents() {
        const response = await getAllEvents();
        events.value = response.data;
    }
    fetchEvents();

    
</script>
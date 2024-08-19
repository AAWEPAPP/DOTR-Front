<template>
    <ol class="flex flex-col items-center justify-center gap-4 font-roboto w-1/5 h-auto">
        <li v-for="event in events" :key="event.name" class="w-full flex flex-wrap flex-col justify-center items-center gap-4 border shadow-md shadow-gray-400 p-2 flex-grow rounded-lg  ">
            <h1 class="text-lg font-medium">{{event.name}}</h1>
            <p class="text-md">{{event.date}} at: {{event.time}}</p>
            <div class="flex-shrink-0  text-wrap"><p class="text-sm ">{{ event.description }}</p></div>
        </li>
    </ol>
    
</template>

<script setup>
    import { ref } from 'vue';

    const events = ref([{
        name: 'Event-1',
        date: '2024-08-21',
        time: '10:00',
        description: 'This is an event description, but this description is quite long and should be truncated, it should be truncated, it should be truncated, it should be truncated, it should be truncated, it',
    }, {
        name: 'event-2',
        date: '2024-08-21',
        time: '10:00',
        description: 'This is an event description',
    },
    {
        name: 'event-3',
        date: '2024-08-21',
        time: '10:00',
        description: 'This is an event description',
    },
    {
        name: 'event-4',
        date: '2024-08-21',
        time: '10:00',
        description: 'This is an event description',
    },
    {
        name: 'event-4',
        date: '2024-08-21',
        time: '10:00',
        description: 'This is an event description',
    },
    {
        name: 'event-4',
        date: '2024-08-21',
        time: '10:00',
        description: 'This is an event description',
    }
])
</script>
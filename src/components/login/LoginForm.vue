<template>
    <div class="h-screen w-screen flex flex-row gap-6 justify-center content-center flex-wrap font-roboto">
        <form action="submit" class=" p-6 flex flex-col gap-6 justify-center items-center content-center h-auto w-auto flex-wrap" >
            <h1 class="text-center">Sign In</h1>
            <InputText class="shadow-md p-2 rounded-md w-60 hover:shadow-lg hover:cursor-pointer focus:outline-none focus:border-b focus:border-blue-500 focus:rounded-b-none" v-model="email"
            :invalid="value === null"
            type="email" placeholder="Email" />
            <InputText class="shadow-md p-2 rounded-md w-60 hover:shadow-lg hover:cursor-pointer focus:outline-none focus:border-b focus:border-blue-500 focus:rounded-b-none" type="password" placeholder="Password"  :invalid="value === null" />
            <p class="text-sm -mt-5">New user? Request access <a class="text-blue-500 underline" href="register.vue " >here</a></p>
            <Button label="Login" @click="handleSubmit" class="w-2/6 py-2 -m-4 text-white bg-blue-600 rounded-md hover:bg-blue-500 shadow-md "/>
            <p v-if="error" class="text-red-500 text-xs mt-2">{{ error }}</p>
        </form>
    </div>
</template>

<script setup>
    import InputText from 'primevue/inputtext';
    import Button from 'primevue/button';
    import { ref } from 'vue';

    const email = ref(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Email:', email.value);
    };
</script>
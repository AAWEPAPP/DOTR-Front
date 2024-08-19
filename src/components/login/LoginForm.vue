<template>
    <div class="h-screen w-screen flex flex-row gap-6 justify-center content-center flex-wrap font-roboto">
        <form @submit.prevent class=" p-6 flex flex-col gap-6 justify-center items-center content-center h-auto w-auto flex-wrap" >
            <h1 class="text-center">Sign In</h1>
            <InputText class="shadow-md p-2 rounded-md w-60 hover:shadow-lg hover:cursor-pointer focus:outline-none focus:border-b focus:border-blue-500 focus:rounded-b-none" id="email" v-model="email"
            :invalid="value === null"
            type="email" placeholder="Email" autocomplete="on" />
            <InputText class="shadow-md p-2 rounded-md w-60 hover:shadow-lg hover:cursor-pointer focus:outline-none focus:border-b focus:border-blue-500 focus:rounded-b-none" type="password" placeholder="Password" id="password"  :invalid="value === null" />
            <p class="text-sm -mt-5">New user? Request access <a class="text-blue-500 underline" href="register.vue " >here</a></p>
            <LoginBtn :onClick="handleSubmit" class="-m-4"></LoginBtn>
            <p v-if="error" class="text-red-500 text-xs mt-2">{{ error }}</p>
        </form>
    </div>
</template>

<script setup>
    import InputText from 'primevue/inputtext';
    import Button from 'primevue/button';
    import LoginBtn from '../UI/LoginBtn.vue';
    import { ref } from 'vue';

    const email = ref(null);

    const handleSubmit = (event) => {
        console.log('Email:', email.value);
    };
</script>
<template>
    <div class="h-auto w-full flex flex-col gap-6 justify-center content-center flex-wrap font-roboto">
        <form @submit.prevent class=" p-6 flex flex-col gap-6 justify-center items-center content-center h-auto w-auto flex-wrap" >
            <h1 class="text-center">Sign In</h1>
            <InputText class="shadow-md p-2 rounded-md w-60 hover:shadow-lg hover:cursor-pointer focus:outline-none focus:border-b focus:border-blue-500 focus:rounded-b-none" id="email" v-model="email"
            :invalid="value === null"
            type="email" placeholder="Email" autocomplete="on" />
            <InputText class="shadow-md p-2 rounded-md w-60 hover:shadow-lg hover:cursor-pointer focus:outline-none focus:border-b focus:border-blue-500 focus:rounded-b-none" type="password" placeholder="Password" id="password"  :invalid="value === null" />
            <p class="text-sm -mt-5">New user? Request access <a class="text-blue-500 underline" href="/register " >here</a></p>
            <LoginBtn :onClick="handleSubmit" class="-m-4"></LoginBtn>
            <p v-if="errorMessage" class="text-red-500 text-xs mt-2">{{ errorMessage }}</p>
            <p v-if="successMessage" class="text-green-500 text-xs mt-2">{{ successMessage }}</p>

        </form>
    </div>
</template>

<script setup>
    import InputText from 'primevue/inputtext';
    import LoginBtn from '../UI/LoginBtn.vue';
    import { ref } from 'vue';

    import { loginUser } from '../../services/apiService';

    const formData = ref({ email: '', password: '' });

    const successMessage = ref(null);
    const errorMessage = ref(null);

    const handleSubmit = async () => {
        try {
            const { email, password } = formData.value;
            const response = await loginUser(email, password);
            if (response.status === 200) {
                successMessage.value = 'Logged in successfully!';
                formData.value = { email: '', password: '' };
            } else {
                errorMessage.value = 'Invalid email or password.';
            }
        } catch (error) {
            errorMessage.value = 'Failed to log in. Please try again.';
        }
    };
</script>
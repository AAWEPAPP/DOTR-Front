<template>
    <div class="h-auto w-full flex flex-col gap-6 justify-center content-center flex-wrap font-roboto">
        <form @submit.prevent="handleSubmit" class="p-6 flex flex-col gap-6 justify-center items-center content-center h-auto w-auto flex-wrap">
            <h1 class="text-center">Sign In</h1>
            <InputText
                class="border-2 border-gray-300 p-2 rounded-md w-60 focus:outline-none focus:border-blue-500"
                id="email"
                v-model="formData.email"
                type="email"
                placeholder="Email"
                autocomplete="on"
            />
            <InputText
                class="border-2 border-gray-300 p-2 rounded-md w-60 focus:outline-none focus:border-blue-500"
                id="password"
                v-model="formData.password"
                type="password"
                placeholder="Password"
            />
            <p class="text-sm -mt-5">New user? Request access <a class="text-blue-500 underline" href="/register">here</a></p>
            <button @click="handleSubmit" class="bg-blue-500 p-2 rounded-md text-white -mt-4">Login</button>
            <p v-if="errorMessage" class="text-red-500 text-xs mt-2">{{ errorMessage }}</p>
            <p v-if="successMessage" class="text-green-500 text-xs mt-2">{{ successMessage }}</p>
        </form>
    </div>
</template>

<script setup>
    import InputText from 'primevue/inputtext';
    import { ref } from 'vue';
    import { loginUser } from '../../services/apiService';

    const formData = ref({ email: '', password: '' });
    const successMessage = ref(null);
    const errorMessage = ref(null);

    const handleSubmit = async () => {
    try {
        const { email, password } = formData.value;
        const data = await loginUser(email, password);
        if (data.message === "Login successful") {
            successMessage.value = 'Logged in successfully!';
            formData.value = { email: '', password: '' };
        } else {
            errorMessage.value = 'Invalid email or password.';
        }
    } catch (error) {
        errorMessage.value = error.response?.data?.message || 'Failed to log in. Please try again.';
    }
};

</script>

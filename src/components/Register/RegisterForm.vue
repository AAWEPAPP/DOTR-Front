<template>
  <div class="flex flex-col justify-center items-center w-full h-full gap-8">
    <form @submit.prevent="handleSubmit" method="post" class="flex flex-col gap-4 w-3/4 md:w-auto">
      <div class="border-2 rounded-md p-4 bg-green-200 ">
        <p>Please fill out the form below to request access to DOTR</p>
      </div>
      <div class="flex flex-col md:flex-row justify-between w-full gap-4">
        <div class="flex flex-col w-full">
          <label for="firstName" class="mb-1">First Name</label>
          <input id="firstName" v-model="formData.firstName" type="text" class="h-8 p-2 border-2 border-solid-black rounded-md text-base focus:outline-none focus:placeholder-transparent" placeholder="First Name">
        </div>
        <div class="flex flex-col w-full">
          <label for="lastName" class="mb-1">Last Name</label>
          <input id="lastName" v-model="formData.lastName" class="h-8 p-2 border-2 border-solid-black rounded-md focus:outline-none focus:placeholder-transparent" type="text" placeholder="Last Name">
        </div>
      </div>
      <div class="flex flex-col w-full">
        <label for="email" class="mb-1">Email</label>
        <input id="email" v-model="formData.email" class="h-8 p-2 border-2 border-solid-black rounded-md focus:outline-none focus:placeholder-transparent" type="email" placeholder="Email">
      </div>
      <div class="flex flex-col w-full">
        <label for="password" class="mb-1">Password</label>
        <input id="password" v-model="formData.password" class="h-8 p-2 border-2 border-solid-black rounded-md focus:outline-none focus:placeholder-transparent" type="password" placeholder="Password">
      </div>
      <div class="flex flex-col w-full">
        <label for="cellPhoneNumber" class="mb-1">Cell Phone Number</label>
        <input id="cellPhoneNumber" v-model="formData.cellPhoneNumber" class="h-8 p-2 border-2 border-solid-black rounded-md focus:outline-none focus:placeholder-transparent" type="number" placeholder="Cell Phone Number">
      </div>
      <div class="flex flex-col w-full">
        <label for="carrier" class="mb-1">Cell Carrier</label>
        <select id="carrier" v-model="formData.carrier" class="h-8 px-2 border-2 border-solid-black rounded-md text-gray-400 focus:outline-none focus:placeholder-transparent">
          <option value="">Select Cell Carrier</option>
          <option value="Verizon">Verizon</option>
          <option value="T-Mobile">T-Mobile</option>
          <option value="AT&T">AT&T</option>
          <option value="USCellular">US Cellular</option>
        </select>
      </div>
      <div class="flex flex-col w-full">
        <label for="contactMethod" class="mb-1">Contact Method</label>
        <select id="contactMethod" v-model="formData.contactMethod" class="h-8 px-2 border-2 border-solid-black rounded-md text-gray-400 focus:outline-none focus:placeholder-transparent">
          <option value="">Select Contact Method</option>
          <option value="Email">Email</option>
          <option value="Cell">Cell Phone</option>
          <option value="Both">Both</option>
        </select>
      </div>
      <div class="flex flex-col md:flex-row justify-between w-full gap-4">
        <div class="flex flex-col w-full">
          <label for="sponsorFirstName" class="mb-1">Sponsor First Name</label>
          <input id="sponsorFirstName" v-model="formData.sponsorFirstName" class="h-8 p-2 border-2 border-solid-black rounded-md focus:outline-none focus:placeholder-transparent" type="text" placeholder="Sponsor First Name">
        </div>
        <div class="flex flex-col w-full">
          <label for="sponsorLastName" class="mb-1">Sponsor Last Name</label>
          <input id="sponsorLastName" v-model="formData.sponsorLastName" class="h-8 p-2 border-2 border-solid-black rounded-md focus:outline-none focus:placeholder-transparent" type="text" placeholder="Sponsor Last Name">
        </div>
      </div>
      <p class="text-center text-sm -mt-3 px-2">Already have access? Click <a class="text-blue-500 underline" href="/login">here</a> to login</p>
      <button type="submit" class="rounded-md border-2 bg-blue-500 text-white shadow-sm p-2 w-2/5 self-center hover:bg-blue-400">Requst Access</button>
    </form>
    <div v-if="successMessage" class="text-green-500">{{ successMessage }}</div>
    <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { registerUser } from '../../services/apiService';

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  cellPhoneNumber: '',
  carrier: '',
  contactMethod: '',
  sponsorFirstName: '',
  sponsorLastName: '',
});

const successMessage = ref('');
const errorMessage = ref('');

const handleSubmit = async () => {
  successMessage.value = '';
  errorMessage.value = '';
  try {
    const response = await registerUser(formData.value);
    console.log('User registered successfully:', response);
    successMessage.value = 'User registered successfully!';
  } catch (error) {
    console.error('Error registering user:', error);
    errorMessage.value = 'Error registering user. Please try again later.';
  }
};
</script>


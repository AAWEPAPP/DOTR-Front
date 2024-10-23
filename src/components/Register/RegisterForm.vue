<template>
  <div class="flex flex-col justify-center items-center w-full h-full gap-8">
    <form @submit.prevent="handleSubmit" method="post" class="flex flex-col gap-4 w-3/4 md:w-auto">
      <div class="border-2 rounded-md p-4 bg-green-200">
        <p>Please fill out the form below to request access to DOTR</p>
      </div>

      <!-- First Name -->
      <div class="flex flex-col gap-4 md:flex-row md:gap-6">
        <div class="flex flex-col w-full">
          <label for="firstName" class="mb-1">First Name</label>
          <input id="firstName" v-model="formData.firstName" type="text" class="h-8 p-2 border-2 border-solid-black rounded-md" placeholder="First Name">
          <p v-if="errors.firstName" class="text-red-500">{{ errors.firstName }}</p>
        </div>
  
        <!-- Last Name -->
        <div class="flex flex-col w-full">
          <label for="lastName" class="mb-1">Last Name</label>
          <input id="lastName" v-model="formData.lastName" type="text" class="h-8 p-2 border-2 border-solid-black rounded-md" placeholder="Last Name">
          <p v-if="errors.lastName" class="text-red-500">{{ errors.lastName }}</p>
        </div>
      </div>

      <!-- Email -->
      <div class="flex flex-col w-full">
        <label for="email" class="mb-1">Email</label>
        <input id="email" v-model="formData.email" type="email" class="h-8 p-2 border-2 border-solid-black rounded-md" placeholder="Email">
        <p v-if="errors.email" class="text-red-500">{{ errors.email }}</p>
      </div>

      <!-- Password -->
      <div class="flex flex-col w-full">
        <label for="password" class="mb-1">Password</label>
        <input id="password" v-model="formData.password" type="password" class="h-8 p-2 border-2 border-solid-black rounded-md" placeholder="Password">
        <p v-if="errors.password" class="text-red-500">{{ errors.password }}</p>
      </div>

      <!-- Cell Number -->
      <div class="flex flex-col w-full">
        <label for="cellPhoneNumber" class="mb-1">Cell Phone Number</label>
        <input id="cellPhoneNumber" v-model="formData.cellPhoneNumber" type="number" class="h-8 p-2 border-2 border-solid-black rounded-md" placeholder="Cell Phone Number">
        <p v-if="errors.cellPhoneNumber" class="text-red-500">{{ errors.cellPhoneNumber }}</p>
      </div>

        <!-- Carrier -->
      <div class="flex flex-col w-full">
        <label for="carrier" class="mb-1">Cell Carrier</label>
        <select v-model="formData.carrier" name="carrier" id="carrier" class="h-8 px-2 border-2 border-solid-black rounded-md">
          <option value="">Select your carrier</option>
          <option value="Verizon">Verizon</option>
          <option value="AT&T">AT&T</option>
          <option value="T-Mobile">T-Mobile</option>
          <option value="Boost Mobile">Boost Mobile</option>
        </select>
        <p v-if="errors.carrier" class="text-red-500">{{ errors.carrier }}</p>
      </div>

      <!-- Contact method -->
      <div class="flex flex-col w-full">
        <label for="contactMethod" class="mb-1">Preferred Contact Method</label>
        <select v-model="formData.contactMethod" name="contactMethod" id="contactMethod" class="h-8 px-2 border-2 border-solid-black rounded-md">
          <option value="">Select your preferred contact method</option>
          <option value="Email">Email</option>
          <option value="Text Message">Text Message</option>
          <option value="Both">Both</option>
        </select>
        <p v-if="errors.contactMethod" class="text-red-500">{{ errors.contactMethod }}</p>
      </div>

      <!-- Sponsor's name -->
       <div class="flex flex-col gap-4 md:flex-row md:gap-6">
        <!-- Sponsor's First Name -->
         <div class="flex flex-col w-full">
          <label for="sponsorFirstName" class="mb-1">Sponsor's First Name</label>
          <input id="sponsorFirstName" v-model="formData.sponsorFirstName" type="text" class="h-8 p-2 border-2 border-solid-black rounded-md" placeholder="Sponsor's First Name">
          <p v-if="errors.sponsorFirstName" class="text-red-500">{{ errors.sponsorFirstName }}</p>
        </div>
  
        <!-- Sponsor's last name -->
         <div class="flex flex-col w-full">
          <label for="sponsorLastName" class="mb-1">Sponsor's Last Name</label>
          <input id="sponsorLastName" v-model="formData.sponsorLastName" type="text" class="h-8 p-2 border-2 border-solid-black rounded-md" placeholder="Sponsor's Last Name">
          <p v-if="errors.sponsorLastName" class="text-red-500">{{ errors.sponsorLastName }}</p>
        </div>
       </div>

      <!-- Submit button -->
      <button type="submit" class="rounded-md border-2 bg-blue-500 text-white shadow-sm p-2 md:w-2/5 self-center hover:bg-blue-400">Request Access</button>
    </form>

    <!-- API errors -->
    <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>
    <div v-if="successMessage" class="text-green-500">{{ successMessage }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import * as Yup from 'yup';
import { registerUser } from '../../services/apiService';


// Form data
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
const errors = ref({});

// Form validation
const formValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[@$!%*?&]/, 'Password must contain at least one special character')
    .required('Password is required'),
  cellPhoneNumber: Yup.string().required('Cell Phone Number is required'),
  carrier: Yup.string().required('Carrier is required'),
  contactMethod: Yup.string().required('Contact Method is required'),
});

// Form submission handler
const handleSubmit = async () => {
  successMessage.value = '';
  errorMessage.value = '';
  errors.value = {};

  try {

    await formValidationSchema.validate(formData.value, { abortEarly: false });
    const response = await registerUser(formData.value);
    successMessage.value = response.message;
    router.push('/login'); 

  } catch (err) {
    if (err.name === 'ValidationError') {
      err.inner.forEach((validationError) => {
        errors.value[validationError.path] = validationError.message;
      });
    } else if (err.response && err.response.data && err.response.data.message) {
      errorMessage.value = err.response.data.message;
    } else {
      errorMessage.value = 'Error registering user. Please try again later.';
    }
  }
};
</script>

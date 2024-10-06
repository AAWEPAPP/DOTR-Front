<template>
    <div class="flex">
      <form method="post" class="flex flex-col gap-12 w-46">
        <input type="text" class="registerInput" placeholder="First Name ">
        <input type="text" placeholder="Last Name ">
        <input type="email" placeholder="Email">
        <input type="password" placeholder="Password">
        <input type="number" placeholder="Cell Phone Number ">
        <select name="carrier" id="carrier">
          <option value="">Cell Carrier</option>
          <option value="Verizon">Verizon</option>
          <option value="T-Mobile">T-Mobile</option>
          <option value="AT&T">AT&T</option>
          <option value="USCellular">US Cellular</option>
        </select>
  
        <!-- AutoComplete Component -->
        <AutoComplete 
          v-model="selectedValue" 
          :dropdown="true" 
          :force-selection="false" 
          placeholder="Select or enter a value" 
          @input="onInput" 
          :suggestions="options" 
        />
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import AutoComplete from 'primevue/autocomplete';
  
  const options = ref(["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"]);
  const selectedValue = ref('');
  
  const onInput = (event) => {
    const inputValue = event.target.value;
    
    // Update selectedValue with inputValue
    selectedValue.value = inputValue;
  
    // Add the custom value to the options if not already present
    if (!options.value.includes(inputValue) && inputValue) {
      options.value.push(inputValue);
    }
  };
  </script>
  
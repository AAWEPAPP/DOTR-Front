<template>
  <div>
    <table>
        <th></th>
    </table>
  </div>
</template>

<script setup>
    import { ref } from 'vue'

    const users = ref([{
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        phoneNumber: '123-456-7890',
        comPreference: 'Email',
        status: 'Active'
    },{
        id: 2,
        firstName: 'Alice',
        lastName: 'Williams',
        email: 'aliwilliams@example.com',
        phoneNumber: '456-789-0123',
        comPreference: 'SMS',
        status: 'Inactive',
    }])
</script>
<template>
  <div class="w-full h-full">
    <!-- Search Input -->
    <input
      v-model="searchTerm"
      type="text"
      placeholder="Search users..."
      class="mb-4 p-2 border border-gray-300 rounded w-full"
    />

    <!-- Table Header for Desktop -->
    <div class="hidden md:grid w-full grid-cols-5 gap-4 p-4 border-b font-bold  rounded-t-md">
      <div class="col-span-1 text-left">Name</div>
      <div class="col-span-1 text-center">Email</div>
      <div class="col-span-1 text-center">Role</div>
      <div class="col-span-1 text-center">Status</div>
      <div class="col-span-1 text-right">Actions</div>
    </div>

    <!-- User Cards -->
    <div v-if="filteredUsers.length > 0" class="w-full flex flex-col justify-start items-center">
      <div
        v-for="user in filteredUsers"
        :key="user.id"
        class="w-full grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 p-4 border rounded shadow-sm shadow-slate-500"
      >
        <!-- Name -->
        <div class="col-span-1 text-left flex flex-col md:flex-row items-start md:items-center">
          <span class="block text-xs font-semibold text-gray-500 md:hidden">Name:</span>
          <div v-if="user.isEditing" class="w-full">
            <input
              type="text"
              v-model="user.tempName"
              class="border rounded p-2 w-full shadow-sm shadow-slate-500"
            />
          </div>
          <div v-else class="text-xl font-bold">
            {{ user.name }}
          </div>
        </div>

        <!-- Email -->
        <div class="col-span-1 text-left md:text-center flex flex-col md:flex-row items-start md:items-center">
          <span class="block text-xs font-semibold text-gray-500 md:hidden">Email:</span>
          <div v-if="user.isEditing" class="w-full">
            <input
              type="email"
              v-model="user.tempEmail"
              class="border rounded p-2 w-full shadow-sm shadow-slate-500"
            />
          </div>
          <div v-else class="text-center">
            {{ user.email }}
          </div>
        </div>

        <!-- Role -->
        <div class="col-span-1 text-left md:text-center flex flex-col md:flex-row md:justify-center items-start md:items-center">
          <span class="block text-xs font-semibold text-gray-500 md:hidden">Role:</span>
          <div v-if="user.isEditing" class="w-full">
            <input
              type="text"
              v-model="user.tempRole"
              class="border rounded p-2 w-full shadow-sm shadow-slate-500"
            />
          </div>
          <div v-else class="text-center">
            {{ user.role }}
          </div>
        </div>

        <!-- Status -->
        <div class="col-span-1 text-left md:text-center flex flex-col md:flex-row md:justify-center items-start md:items-center">
          <span class="block text-xs font-semibold text-gray-500 md:hidden">Status:</span>
          <p class="text-center">{{ user.status }}</p>
        </div>

        <!-- Action Buttons -->
        <div class="col-span-1 text-right flex justify-end items-center space-x-4">
          <!-- Approve Button (if not approved) -->
          <button
            v-if="user.status !== 'approved' && !user.isEditing"
            @click="approveUser(user.id)"
            class="text-blue-500 rounded p-1 text-center "
          >
            Approve
          </button>

          <!-- Edit/Confirm/Cancel/Delete Buttons -->
          <div v-if="user.isEditing" class="flex gap-4">
            <button
              @click="confirmEdit(user)"
              class="text-green-500"
            >
              <font-awesome-icon icon="fa-solid fa-check" />
            </button>
            <button
              @click="cancelEdit(user)"
              class="text-red-500"
            >
              <font-awesome-icon icon="fa-solid fa-x" />
            </button>
          </div>
          <div v-else class="flex gap-4">
            <button
              @click="editUser(user)"
              class="text-blue-500"
            >
              <font-awesome-icon icon="fa-solid fa-pen" />
            </button>
            <button
              @click="deleteUser(user.id)"
              class="text-red-500"
            >
              <font-awesome-icon icon="fa-solid fa-trash-can" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- No Users Found -->
    <div v-else>
      <p>No users found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Sample user data
const users = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'pending' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'approved' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'User', status: 'pending' },
]);

// Search functionality
const searchTerm = ref('');
const filteredUsers = computed(() => {
  if (!searchTerm.value) return users.value;
  return users.value.filter((user) =>
    Object.values(user)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.value.toLowerCase())
  );
});

// Edit user functionality
const editUser = (user) => {
  user.isEditing = true;
  user.tempName = user.name;
  user.tempEmail = user.email;
  user.tempRole = user.role;
};

// Confirm edit
const confirmEdit = (user) => {
  user.name = user.tempName;
  user.email = user.tempEmail;
  user.role = user.tempRole;
  user.isEditing = false;
};

// Cancel edit
const cancelEdit = (user) => {
  user.isEditing = false;
};

// Delete user functionality
const deleteUser = (id) => {
  users.value = users.value.filter((user) => user.id !== id);
};

// Approve user
const approveUser = (id) => {
  const user = users.value.find((user) => user.id === id);
  if (user) {
    user.status = 'approved';
  }
};
</script>

<template>
  <div class="w-full h-full">
    <!-- Search Input -->
    <input
      v-model="searchTerm"
      type="text"
      placeholder="Search users..."
      class="mb-4 p-2 border border-gray-300 rounded w-full"
    />

    <div v-if="filteredUsers.length > 0" class="w-full flex flex-col justify-start items-center">
      <div
        v-for="user in filteredUsers"
        :key="user.id"
        class="w-full flex flex-col justify-center gap-4 md:flex md:justify-between md:items-start md:flex-row mb-4 p-4 border rounded shadow-sm shadow-slate-500"
      >
        <!-- Name -->
        <div class="flex-1 text-left">
          <div v-if="user.isEditing">
            <input
              type="text"
              v-model="user.tempName"
              class="border rounded p-2 w-full shadow-sm shadow-slate-500 text-left"
            />
          </div>
          <div v-else>
            <h2 class="text-xl font-bold text-left">{{ user.name }}</h2>
          </div>
        </div>

        <!-- Email -->
        <div class="flex-1 text-left">
          <div v-if="user.isEditing">
            <input
              type="email"
              v-model="user.tempEmail"
              class="border rounded p-2 w-full shadow-sm shadow-slate-500 text-left"
            />
          </div>
          <div v-else>
            <p class="text-left">{{ user.email }}</p>
          </div>
        </div>

        <!-- Role -->
        <div class="flex-1 text-left">
          <div v-if="user.isEditing">
            <input
              type="text"
              v-model="user.tempRole"
              class="border rounded p-2 w-full shadow-sm shadow-slate-500 text-left"
            />
          </div>
          <div v-else>
            <p class="text-left">{{ user.role }}</p>
          </div>
        </div>

        <!-- Status -->
        <div class="flex-1 text-left">
          <p class="text-left">{{ user.status }}</p>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-start md:justify-end space-x-4">
          <!-- Approve Button (if not approved) -->
          <button
            v-if="user.status !== 'approved' && !user.isEditing"
            @click="approveUser(user.id)"
            class="text-blue-500"
          >
            Approve
          </button>

          <!-- Edit/Confirm/Cancel/Delete Buttons -->
          <div v-if="user.isEditing">
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
          <div v-else>
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

    <div v-else>
      <p>No users found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const users = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'pending' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'approved' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'User', status: 'pending' },
]);

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

const editUser = (user) => {
  user.isEditing = true;
  user.tempName = user.name;
  user.tempEmail = user.email;
  user.tempRole = user.role;
};

const confirmEdit = (user) => {
  user.name = user.tempName;
  user.email = user.tempEmail;
  user.role = user.tempRole;
  user.isEditing = false;
};

const cancelEdit = (user) => {
  user.isEditing = false;
};

const deleteUser = (id) => {
  users.value = users.value.filter((user) => user.id !== id);
};

const approveUser = (id) => {
  const user = users.value.find((user) => user.id === id);
  if (user) {
    user.status = 'approved';
  }
};
</script>
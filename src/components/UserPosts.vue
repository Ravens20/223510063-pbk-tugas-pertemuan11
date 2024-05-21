<template>
  <div class="container">
    <h1>Users</h1>
    <select v-model="selectedUser">
      <option v-for="user in users" :key="user.id" :value="user.id">
        {{ user.name }}
      </option>
    </select>
    <div v-if="isLoading" class="loading">Loading posts...</div>
    <div v-else>
      <h2>Posts</h2>
      <ul>
        <li v-for="post in posts" :key="post.id">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, watch, defineEmits } from 'vue';

const selectedUser = ref(null);
const isLoading = ref(false);
const users = ref([]);
const posts = ref([]);

const emits = defineEmits(['user-selected', 'posts-fetched']);

const props = defineProps({
  users: {
    type: Array,
    required: true,
  },
});

const getUsers = async () => {
  const resource = "https://jsonplaceholder.typicode.com/users";
  const response = await fetch(resource);
  users.value = await response.json();
};

const getPosts = async () => {
  if (selectedUser.value !== null) {
    isLoading.value = true;
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.value}`);
    posts.value = await response.json();
    isLoading.value = false;
    emits('posts-fetched', posts.value); // Emit event ketika posts telah di-fetch
  }
};

getUsers();

watch(selectedUser, () => {
  getPosts();
  emits('user-selected', selectedUser.value); // Emit event ketika user dipilih
});
</script>

  
  <style scoped>
  .container {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    margin-top: 170px;
    padding: 20px;
    background-color: #f7f9fc;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    color: #333;
    font-size: 2em;
    margin-bottom: 20px;
  }
  
  select {
    display: block;
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .loading {
    text-align: center;
    font-size: 18px;
    color: #999;
  }
  
  h2 {
    margin-top: 20px;
    color: #555;
    font-size: 1.5em;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    padding: 15px;
    margin-bottom: 10px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 6px;
    transition: background-color 0.3s;
  }
  
  li:hover {
    background-color: #f1f1f1;
  }
  
  h3 {
    margin: 0;
    font-size: 1.2em;
    color: #333;
  }
  
  p {
    margin: 10px 0 0;
    color: #666;
    line-height: 1.5;
  }
  </style>
  
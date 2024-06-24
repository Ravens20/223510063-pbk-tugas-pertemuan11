<!-- src/components/UserPosts.vue -->
<template>
  <div class="container">
    <h1>Posts</h1>
    <select v-model="selectedUser">
      <option v-for="user in users" :key="user.id" :value="user.id">
        {{ user.name }}
      </option>
    </select>
    <div v-if="isLoading" class="loading">Loading posts...</div>
    <div v-else-if="selectedUser !== null">
      <h2>Posts from User: {{ selectedUserName }}</h2>
      <div v-if="isLoadingPosts" class="loading">Loading posts...</div>
      <div v-else>
        <div class="posts-list">
          <div v-for="post in filteredPosts" :key="post.id" class="post-item">
            <h3>{{ post.title }}</h3>
            <p>{{ post.body }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePostStore } from '../pinia/post.js';
import { ref, onMounted, watch, computed } from 'vue';

const store = usePostStore();

onMounted(() => {
  store.getUsers();
});

const selectedUser = ref(null);

const selectedUserName = computed(() => {
  const user = store.users.find(user => user.id === selectedUser.value);
  return user ? user.name : '';
});

const isLoading = computed(() => store.isLoading);
const isLoadingPosts = computed(() => store.isLoadingPosts);
const users = computed(() => store.users);
const posts = computed(() => store.posts);

const filteredPosts = computed(() => {
  return posts.value.filter(post => post.userId === selectedUser.value);
});

watch(selectedUser, (newUserId) => {
  if (newUserId !== null) {
    store.setSelectedUser(newUserId);
  }
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

h1, h2 {
  text-align: center;
  color: #333;
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

.posts-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.post-item {
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h3 {
  margin: 0 0 10px;
  color: #333;
}

p {
  margin: 0;
  color: #666;
}
</style>

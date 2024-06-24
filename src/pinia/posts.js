// src/store.js atau src/store.ts
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    selectedUser: null,
    isLoading: false,
    posts: [],
  }),

  actions: {
    async getUsers() {
      this.isLoading = true;
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      this.users = await response.json();
      this.isLoading = false;
    },

    async getPosts(userId) {
      this.isLoading = true;
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      this.posts = await response.json();
      this.isLoading = false;
    },

    selectUser(userId) {
      this.selectedUser = userId;
      this.getPosts(userId);
    },
  },
});

import { defineStore } from 'pinia';
import axios from 'axios';

export const usePostStore = defineStore('post', {
  state: () => ({
    users: [],
    posts: [],
    selectedUser: null,
    isLoading: false,
    isLoadingPosts: false,
  }),
  getters: {
    selectedUserName: (state) => {
      const user = state.users.find(user => user.id === state.selectedUser);
      return user ? user.name : '';
    }
  },
  actions: {
    async getUsers() {
      this.isLoading = true;
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        this.users = response.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async setSelectedUser(userId) {
      this.selectedUser = userId;
      this.getPostsByUser(userId);
    },
    async getPostsByUser(userId) {
      this.isLoadingPosts = true;
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        this.posts = response.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoadingPosts = false;
      }
    }
  }
});

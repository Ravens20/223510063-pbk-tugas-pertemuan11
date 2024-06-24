// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import RegistrationForm from '../pages/RegistrationForm.vue';
import UserPosts from '../pages/UserPosts.vue';
import Album from '../pages/Album.vue';
import AlbumDetail from '../pages/AlbumDetail.vue';

const routes = [
  {
    path: '/registration',
    name: 'Registration',
    component: RegistrationForm,
  },
  {
    path: '/posts',
    name: 'Posts',
    component: UserPosts,
  },
  {
    path: '/albums',
    name: 'Albums',
    component: Album,
  },
  {
    path: '/',
    redirect: '/registration',
  },
  {
    path: '/albums/:id',
    name: 'AlbumDetail',
    component: AlbumDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

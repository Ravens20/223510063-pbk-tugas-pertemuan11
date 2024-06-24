<template>
    <nav>
      <ul>
        <li :class="{ active: $route.path === '/registration' }" @click="$router.push('/registration')">Todos</li>
        <li :class="{ active: $route.path === '/posts' }" @click="$router.push('/posts')">Posts</li>
        <li :class="{ active: $route.path === '/albums' }" @click="$router.push('/albums')">Albums</li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    props: {
      selectedMenu: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  nav {
    background-color: #fff;
    padding: 10px;
    border-bottom: 2px solid #eee;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
  }
  
  li {
    margin: 0 20px;
    padding: 10px 20px;
    cursor: pointer;
    font-weight: bold;
    color: #555;
    transition: color 0.3s, background-color 0.3s;
  }
  
  li:hover {
    color: #007bff;
  }
  
  .active {
    color: #fff;
    background-color: #007bff;
    border-radius: 4px;
  }
  </style>
  
<template>
    <footer>
      <div class="container">
        <p>&copy; 2024 Dindra Desvantio. All rights reserved.</p>
      </div>
    </footer>
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
  footer {
    background-color: #fff;
    padding: 10px;
    border-top: 2px solid #eee;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1); 
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1000;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .container p {
    margin: 0;
    color: #555;
    text-align: center;
  }
  
  </style>
  
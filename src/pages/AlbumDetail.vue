<template>
    <div class="container">
      <h2>Foto Dari Album: {{ selectedAlbumTitle }}</h2>
      <div v-if="isLoadingPhotos" class="loading">Memuat Foto...</div>
      <div v-else>
        <div class="photos-grid">
          <div v-for="photo in filteredPhotos" :key="photo.id" class="photo-item">
            <img :src="photo.thumbnailUrl" :alt="photo.title" @click="showFullSizePhoto(photo.url)" />
            <p>{{ photo.title }}</p>
          </div>
        </div>
      </div>
  
      <div v-if="showFullSizeModal" class="full-size-photo-modal" @click="hideFullSizePhoto">
        <div class="modal-content">
          <span class="close-button" @click="hideFullSizePhoto">&times;</span>
          <img :src="selectedPhotoUrl" :alt="selectedPhotoTitle" />
          <p>{{ selectedPhotoTitle }}</p>
        </div>
      </div>
    </div>
  </template>
      
    <script setup>
    import { useAlbumStore } from '../pinia/album.js';
    import { ref, computed, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    
    const store = useAlbumStore();
    const router = useRouter();
    
    const selectedAlbum = ref(null);
    const showFullSizeModal = ref(false);
    const selectedPhotoUrl = ref(null);
    const selectedPhotoTitle = ref('');
    
    onMounted(() => {
      if (router.currentRoute.value.params.id) {
        selectedAlbum.value = parseInt(router.currentRoute.value.params.id);
        store.selectAlbum(selectedAlbum.value);
      }
    });
    
    const isLoadingPhotos = computed(() => store.isLoadingPhotos);
    const selectedAlbumTitle = computed(() => store.selectedAlbumTitle);
    const filteredPhotos = computed(() => store.photos.filter(photo => photo.albumId === selectedAlbum.value));
    
    const showFullSizePhoto = (url) => {
      selectedPhotoUrl.value = url;
      selectedPhotoTitle.value = filteredPhotos.value.find(photo => photo.url === url)?.title || '';
      showFullSizeModal.value = true;
    };
    
    const hideFullSizePhoto = () => {
      showFullSizeModal.value = false;
      selectedPhotoUrl.value = null;
      selectedPhotoTitle.value = '';
    };
    </script>
    
    <style scoped>
    .container {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      margin-top: 50px;
      padding: 20px;
      background-color: #f7f9fc;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    h2 {
      text-align: center;
      color: #333;
      margin-bottom: 20px;
    }
    
    .loading {
      text-align: center;
      font-size: 18px;
      color: #999;
    }
    
    .photos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 10px;
    }
    
    .photo-item {
      text-align: center;
      cursor: pointer;
    }
    
    .photo-item img {
      width: 100%;
      height: auto;
      border-radius: 4px;
    }
    
    .full-size-photo-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      z-index: 1000;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .modal-content {
      background-color: #fefefe;
      padding: 20px;
      border-radius: 8px;
      position: relative;
      text-align: center;
    }
    
    .close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 24px;
      cursor: pointer;
      color: #aaa;
    }
    
    .close-button:hover {
      color: #333;
    }
    
    .modal-content img {
      max-width: 100%;
      max-height: 80vh;
      border-radius: 8px;
    }
    
    .modal-content p {
      margin-top: 10px;
      color: #666;
    }
    </style>
    
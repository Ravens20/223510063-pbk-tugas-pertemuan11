<template>
  <div class="container">
    <h1>Albums</h1>
    <select v-model="selectedAlbum" @change="navigateToAlbumDetail">
      <option value="">Pilih Album..</option>
      <option v-for="album in albums" :key="album.id" :value="album.id">
        {{ album.title }}
      </option>
    </select>

    <div v-if="isLoading" class="loading">Memuat Albums...</div>
    <div v-else-if="selectedAlbum !== null && selectedAlbum !== ''">
      <h2>Photos from Album: {{ selectedAlbumTitle }}</h2>
      <div v-if="isLoadingPhotos" class="loading">Memuat Foto...</div>
      <div v-else>
        <div class="photos-grid">
          <div v-for="photo in filteredPhotos" :key="photo.id" class="photo-item">
            <img :src="photo.thumbnailUrl" :alt="photo.title" />
            <p>{{ photo.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAlbumStore } from '../pinia/album.js';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const store = useAlbumStore();
const router = useRouter();

const selectedAlbum = ref(null);

onMounted(() => {
  store.getAlbums();
});

const navigateToAlbumDetail = () => {
  if (selectedAlbum.value !== null && selectedAlbum.value !== '') {
    router.push({ name: 'AlbumDetail', params: { id: selectedAlbum.value } });
  }
};

const isLoading = computed(() => store.isLoading);
const isLoadingPhotos = computed(() => store.isLoadingPhotos);
const albums = computed(() => store.albums);
const photos = computed(() => store.photos);
const selectedAlbumTitle = computed(() => store.selectedAlbumTitle);

const filteredPhotos = computed(() => {
  return photos.value.filter(photo => photo.albumId === selectedAlbum.value);
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

.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
}

.photo-item {
  text-align: center;
}

.photo-item img {
  width: 100%;
  height: auto;
  border-radius: 4px;
}

p {
  margin: 5px 0;
  color: #666;
}
</style>

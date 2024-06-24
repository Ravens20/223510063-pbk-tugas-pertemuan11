import { defineStore } from 'pinia';

export const useAlbumStore = defineStore('album', {
  state: () => ({
    albums: [],
    photos: [],
    selectedAlbum: null,
    selectedAlbumTitle: '',
    isLoading: false,
    isLoadingPhotos: false,
  }),

  actions: {
    async getAlbums() {
      this.isLoading = true;
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums');
        this.albums = await response.json();
      } catch (error) {
        console.error('Error fetching albums:', error);
      } finally {
        this.isLoading = false;
      }
    },

    async getPhotos(albumId) {
      this.isLoadingPhotos = true;
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
        this.photos = await response.json();
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        this.isLoadingPhotos = false;
      }
    },

    selectAlbum(albumId) {
      this.selectedAlbum = albumId;
      this.selectedAlbumTitle = this.albums.find(album => album.id === albumId)?.title || '';
      this.getPhotos(albumId);
    },
  },
});

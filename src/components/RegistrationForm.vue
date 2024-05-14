<template>
    <div class="form-container">
      <h2 class="form-title">Form Pendaftaran Kegiatan</h2>
      <div class="form-group">
        <label class="form-label" for="activity">Kegiatan:</label>
        <input class="form-input" type="text" id="activity" v-model="newActivity">
      </div>
      <div class="form-group">
        <label class="form-label" for="date">Tanggal:</label>
        <input class="form-input" type="date" id="date" v-model="newDate">
      </div>
      <button class="form-button" @click="addActivity">Daftar</button>
  
      <h2 v-if="activities.length > 0" class="activity-list-title">Daftar Kegiatan</h2>
      <table v-if="activities.length > 0" class="activity-table">
        <tr v-for="(activity, index) in activities" :key="index">
          <td>
            <input class="activity-checkbox" type="checkbox" v-model="activity.completed" @change="toggleCompletion(activity)">
          </td>
          <td :class="{ 'completed': activity.completed }" class="activity-name">{{ activity.name }}</td>
          <td class="activity-date">{{ activity.date }}</td>
          <td><button class="activity-cancel-button" @click="cancelActivity(index)">Batalkan</button></td>
        </tr>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newActivity: '',
        newDate: '',
        activities: []
      };
    },
    methods: {
      addActivity() {
        if (this.newActivity && this.newDate) {
          this.activities.push({
            name: this.newActivity,
            date: this.newDate,
            completed: false
          });
          this.newActivity = '';
          this.newDate = '';
        }
      },
      cancelActivity(index) {
        this.activities.splice(index, 1);
      },
      toggleCompletion(activity) {
        if (activity.completed) {
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .form-container {
    max-width: 600px;
    margin: 50px auto;
    padding: 30px;
    margin-top: 170px;
    background-color: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .form-title,
  .activity-list-title {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
    font-size: 28px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-label {
    display: block;
    margin-bottom: 5px;
    color: #555;
  }
  
  .form-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    transition: border-color 0.3s;
  }
  
  .form-input:focus {
    border-color: #007bff;
    outline: none;
  }
  
  .form-button {
    width: 100%;
    padding: 12px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }
  
  .form-button:hover {
    background-color: #0056b3;
  }
  
  .activity-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .activity-checkbox {
    margin-right: 10px;
  }
  
  .activity-name {
    font-weight: bold;
    color: #333;
  }
  
  .activity-date {
    min-width: 120px;
    color: #555;
  }
  
  .completed {
    text-decoration: line-through;
  }
  
  .activity-cancel-button {
    background-color: #dc3545;
    color: #fff;
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;
  }
  
  .activity-cancel-button:hover {
    background-color: #c82333;
  }
  </style>
  
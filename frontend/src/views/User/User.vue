<template>
    <div>
      <h2>Защищённая страница</h2>
      <button @click="fetchProtectedData">Получить защищённые данные</button>
      <button @click="logout">Выйти</button>
      <div v-if="message">
        <p>{{ message }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        message: ''
      };
    },
    methods: {
      async fetchProtectedData() {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Пожалуйста, войдите');
          this.$router.push('/login');
          return;
        }
  
        try {
          const response = await axios.get('http://localhost:5000/api/protected', {
            headers: { Authorization: token }
          });
          this.message = response.data.message;
        } catch (error) {
          alert(error.response?.data?.message || 'Ошибка получения данных');
        }
      },
      logout() {
        localStorage.removeItem('token');
        this.$router.push('/authorization');
      }
    }
  }
  </script>
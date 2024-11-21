<template>
    <section class="authorization">
        <div class="container">
            
            <div class="authorization__inner">
                <h2 class="title">Авторизация</h2>
                <form @submit.prevent = "login()">
                    <label>Имя<input type="text" placeholder="Введите ваше имя" v-model = "username"/></label>
                    <label>Пароль<input type="password" placeholder="Введите ваш пароль" v-model = "password"/></label>
                    <span class="error" v-if="this.errorMessage !== ''">{{this.errorMessage}}</span>
                    <Button :content = "'Войти'" :type="'submit'" style="max-width: 100%;"/>
                </form>
            </div>
        </div>
    </section>
  </template>
  
  <script>
  import Button from "/src/components/Button/Button.vue"
 import { mapMutations } from 'vuex'
  import axios from 'axios'
  export default {
    components:{
         Button
    },
    data(){
        return{
            username: '',
            password: '',
            errorMessage: ''
        }
    },

    methods:{
    ...mapMutations([
      'unAuthorize',
      'authorize',
      'setUserName'
    ]),
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          username: this.username,
          password: this.password,
          
        });
        localStorage.setItem('token', response.data.token);
        this.authorize();
        this.setUserName(this.username) 
        alert('Вы успешно авторизовались!')
        this.$router.push('/');
       // 
      } catch (error) {
        if(error.response && error.response.data && error.response.data.error){
          this.errorMessage = error.response.data.error;
        }else{
          alert('Ошибка авторизации')
        }
      }
    }
  },
 
 }
    
  
  </script>
<template>
    <section class="registration">
        <div class="container">
            
            <div class="registration__inner">
                <h2 class="title">Регистрация</h2>
                <form >
                    <label for="Имя">Имя</label>
                    <input type="text " placeholder="Ваше имя" name="Имя" v-model = "username">
                    <label for="Пароль">Пароль</label>
                    <input type="password " placeholder="Ваш пароль" name="Пароль" v-model="password">
                    <div class="registration__privacy">
                        <input type="checkbox" style="padding: 0;">
                        <p>Даю свое согласие на <a href="/src/assets/images/privacy.pdf" download="" style="color: red;">Обработку персональных данных</a></p>
                    </div>
                    <Button :content = "'Зарегистрироваться'" :type="'submit'" style="max-width: 100%;"/>
                </form>
            </div>
        </div>
    </section>
  </template>
  
  <script>
  import Button from "/src/components/Button/Button.vue";
  import axios from 'axios'
  export default {
    components:{
         Button
    },
    data(){
        return{
            username: '',
            password: '',
        }
    },
   
    
  }
  </script>
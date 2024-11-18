<template>
    <header :key="headerKey">
      <div class="container">
        <div class="header__inner">
          

          <div class="search">
            <img src="/src/assets/images/search.svg" alt="">
            <input type = "text" placeholder = "Поиск автобуса по названию" v-model = "searchString" @input="searchProducts"/>
            <div class="search__products" v-if="searchString.length !== 0">
              <div v-for = "(searchProduct, key) in searchProductsList" :key = "index">
                <RouterLink :to = "`/product/${searchProduct.id}`" class="product__list-link" >
                {{searchProduct.name}}
                </RouterLink>
              </div>
            
            </div>
          </div>
          <RouterLink class="header__logo" to = "/"><img :src="Logo" alt=""></RouterLink>
          <div class="header__row">
           <div class="user__data" v-if="username.trim() !== ''">
              <span>Имя пользователя: &nbsp {{this.username}}</span>
             <button @click="logout">Выйти из аккаунта</button>
           </div>
            <div class="header__user" v-if="username.trim() === ''">
            
              <RouterLink to="/authorization"><article>Войти</article></RouterLink>
              <span>/</span>
              <RouterLink to="/registration"><article>Регистрация</article></RouterLink>
              <span>/</span>
              <RouterLink to="/comment"><article>Оставить отзыв</article></RouterLink>
            </div>
          </div>
        </div>
        <nav>
          <RouterLink to = "/"><span>Главная</span></RouterLink>
          <RouterLink to = "/products"><span>Автобусы</span></RouterLink>
          <RouterLink to = "/contact"><span>Контакты</span></RouterLink>
          <RouterLink to = "/schedule"><span>Расписание</span></RouterLink>
        </nav>
        
      </div>
    </header>
  </template>

  <script>
    import Logo from "/src/assets/images/logo.svg"
    import Button from '/src/components/Button/Button.vue'
    import Input from '/src/components/Input.vue'
    import axios from 'axios'
    export default {
      components:{
        Button,
        Input
      },
        data(){
          return{
            Logo: Logo,
            products:[],
            searchString: '',
            searchProductsList:[],
            username: '',
          }
        },
        methods:{
          searchProducts(){
            this.searchProductsList = this.products.filter((product) => {
            
             return  String(product.name.trim().toLowerCase()).indexOf(String(this.searchString.trim().toLowerCase())) !== -1;
            })
          
          },
          async getBuses(){
            const response = await axios.get("http://localhost:3000/buses");
            this.products = response.data;
          },
          logout(){
          const token = localStorage.getItem('token');
          if(token){
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.setItem('isAuthorized', false);
            this.username = '';
            this.$router.push('/authorization');
            setTimeout(() => {
          window.location.reload(); // Даем время Vue Router обработать переход
        }, 100); 
          }
          },
          setUserName(){
            this.username = localStorage.getItem('username');
          },
        },
       
        beforeMount(){
          this.getBuses();
      },
       mounted(){
        this.setUserName();
       }
    }  
  </script>
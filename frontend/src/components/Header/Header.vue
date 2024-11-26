<template>
  <header :key="headerKey">
    <div class="container">
      <div class="header__inner">
        <div class="search">
          <img src="/src/assets/images/search.svg" alt="" />
          <input
            type="text"
            placeholder="Поиск автобуса по названию"
            v-model="searchString"
            @input="searchProducts"
          />
          <div class="search__products" v-if="searchString.length !== 0">
            <div
              v-for="(searchProduct, key) in searchProductsList"
              :key="index"
            >
              <RouterLink
                :to="`/product/${searchProduct.id}`"
                class="product__list-link"
              >
                {{ searchProduct.name }}
              </RouterLink>
            </div>
          </div>
        </div>
        <RouterLink class="header__logo" to="/"
          ><img :src="Logo" alt=""
        /></RouterLink>

        <div class="header__user">
          <div class="user__data" v-if="ISAUTHORIZED">
            <div style="margin-right: 20px">
              <img src="/src/assets/images/header_logos/user.svg" alt="" />
              <span>{{ USERNAME }}</span>
            </div>
            <RouterLink
              class="cart_link"
              v-if="ISAUTHORIZED"
              :to="`/cart/${USERID}`"
            >
              <div class="cart__icon">
                <i>{{CARTSIZE}}</i>
                <img src="/src/assets/images/header_logos/cart.svg" alt="" />
              </div>
            </RouterLink>
            <div class="logout" @click="logout" style="cursor: pointer">
              <img src="/src/assets/images/header_logos/logout.svg" alt="" />
            </div>
          </div>
          <RouterLink to="/authorization" v-if="!ISAUTHORIZED">
            <article>Войти</article>
          </RouterLink>

          <RouterLink to="/registration" v-if="!ISAUTHORIZED"
            ><article>Регистрация</article></RouterLink
          >

          <RouterLink
            to="/comment"
            :style="ISAUTHORIZED ? 'min-width:200px' : ''"
          >
            <article>Оставить отзыв</article>
          </RouterLink>
        </div>
      </div>
      <nav>
        <RouterLink to="/"><span>Главная</span></RouterLink>
        <RouterLink to="/products"><span>Автобусы</span></RouterLink>
        <RouterLink to="/contact"><span>Контакты</span></RouterLink>
        <RouterLink to="/schedule"><span>Расписание</span></RouterLink>
      </nav>
    </div>
  </header>
</template>

<script>
import Logo from "/src/assets/images/logo.svg";
import Button from "/src/components/Button/Button.vue";
import Input from "/src/components/Input.vue";
import axios from "axios";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
export default {
  components: {
    Button,
    Input,
  },
  computed: {
    ...mapGetters(["ISAUTHORIZED", "USERNAME", "USERID", "CARTSIZE"]),
  },
  data() {
    return {
      Logo: Logo,
      products: [],
      searchString: "",
      searchProductsList: [],
      username: "",
    };
  },
  methods: {
    ...mapMutations(["unAuthorize", "setCart"]),
    searchProducts() {
      this.searchProductsList = this.products.filter((product) => {
        return (
          String(product.name.trim().toLowerCase()).indexOf(
            String(this.searchString.trim().toLowerCase())
          ) !== -1
        );
      });
    },

    logout() {
      this.unAuthorize();
      this.$router.push("/authorization");
    },
    async getBuses(){
            const response = await axios.get("http://localhost:3000/buses");
            this.products = response.data;
          },
  },
  mounted(){
          this.getBuses();
      },

};
</script>

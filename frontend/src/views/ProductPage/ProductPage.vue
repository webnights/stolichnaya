<template>
  <section class="product__page">
    <div class="container">
      <div class="product__inner">
        <div class="product__info">
          <img :src="product().image" alt="" />
          <div class="product__content">
            <label
              >Название автобуса
              <h2>{{ product().name }}</h2>
            </label>
            <label
              >Тип автобуса
              <h4>{{ product().type }}</h4>
            </label>
            <label
              >Краткое описание
              <p>{{ product().description }}</p>
            </label>
            <label>
              Характеристики

              <table>
                <thead>
                  <tr>
                    <td>Название характеристики</td>
                    <td>Значение характеристики</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(param, index) in product().params" :key="index">
                    <td>{{ param.param }}</td>
                    <td>{{ param.value }}</td>
                  </tr>
                </tbody>
              </table>
            </label>
            <div class="cart_info">
              <label
                >Стоимость
                <h2 class="price">
                  {{ " " + product().price + " " + "₽" }}
                </h2></label
              >
              <label 
              v-if = "ISAUTHORIZED" >Количество:
                <input
                  type="number"
                  min="1"
                  class="quantity"
                  v-model="quantity"
                  @input = "validate($event)"
                 
              /></label>
              <button @click="addToCart" class="button" v-if="ISAUTHORIZED">
                Добавить в корзину
              </button>
              <span v-if="!ISAUTHORIZED" class="please_login">Зарегистрируйтесь, чтобы добавить товар в корзину</span>
            </div>
          </div>
        </div>
        <label>
          Подробное описание
          <p>{{ product().fulldescription }}</p>
        </label>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";

export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      products: [],
      quantity: 1,
    };
  },
  methods: {
    ...mapMutations([
        'setCartSize'
    ]),
    async getBuses() {
      const response = await axios.get("http://localhost:3000/buses");
      this.products = response.data;
    },
    product() {
      const result = this.products.find((product) => product.id == this.id);
      return result;
    },
    async addToCart() {
      const body = {
        user_id: this.USERID,
        cart_id: this.USERID,
        product_id: this.id,
        quantity: this.quantity,
      };
      try {
        const response = await axios.post("http://localhost:3000/cart", body);
        this.updateTotalQuantity();
        alert(response.data.message);

      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          alert(error.response.data.error);
        } else {
          alert("Ошибка");
        }
      }
    },
    async updateTotalQuantity(){
        const userId = this.USERID;
        const response  = await axios.get(`http://localhost:3000/cart/${userId}`);
        const total = response.data.reduce((acc, item) => {
            return acc + item.product_quantity;
        },0)
        this.setCartSize(total);
    },
    validate($event){
        if($event.target.value < 1){
            $event.target.value = 1;
        }
    }
  },
  computed: {
    ...mapGetters(["USERID", "ISAUTHORIZED"]),
  },
  beforeMount() {
    this.getBuses();
  },
};
</script>

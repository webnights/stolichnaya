<template>
    <section class="product__page">
        <div class="container">
            <div class="product__inner">
                <div class="product__info">
                    <img :src="product().image " alt="">
                    <div class="product__content">
                        <label>Название автобуса
                            <h2>{{product().name}}</h2>
                        </label>
                        <label>Тип автобуса
                            <h4>{{product().type}}</h4>
                        </label>
                        <label>Краткое описание
                            <p>{{product().description}}</p>
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
                                       <td>{{param.param}}</td>
                                       <td>{{param.value}}</td>
                                    </tr>
                                 </tbody>
                              </table>
                               
                        </label>
                    </div>
                </div>
                <label>
                    Подробное описание
                    <p>{{product().fulldescription}}</p>
                </label>
            </div>
        </div>
    </section>
</template>
<script>

import axios from 'axios';

export default {
   props: {
       id: {
           type: Number, 
           required: true,
       },
   },
   data(){
      return{
         products: [],
         
      }
   },
   methods:{
      async getBuses(){
         const response = await axios.get('http://localhost:3000/buses');
         this.products = response.data;
         console.log(products)
      },
      product(){
         const result = this.products.find((product) => product.id == this.id);
         return result;
      }
   },
   beforeMount(){
      this.getBuses();
   }
 
};
</script>

<template>
   <section class="product__page">
       <div class="container">
           <div class="product__inner">
               <div class="product__info">
                  <img :src="product().image " alt="">
                  <div class="product__content">
                     <label>Название автобуса<h2>{{product().name}}</h2></label>
                     <label>Тип автобуса<h4>{{product().type}}</h4></label>
                     <label>Краткое описание<p>{{product().description}}</p></label>
                     <label>
                        Характеристики
                        <ul class="product__parameters">
                           <li v-for="(param, index) in product().params" :key="index">{{param}}</li>
                        </ul>
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

import dataJson from '/src/assets/data/Data.json';

export default {
   props: {
       id: {
           type: Number, 
           required: true,
       },
   },
   data(){
      return{
         products: dataJson.products,
         
      }
   },
   methods:{
      product(){
         const result = this.products.find((product) => product.id == this.id);
         console.log(result)
         return result;
      }
   }
 
};
</script>

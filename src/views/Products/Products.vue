<template>
   <section class="products"  ref="busesSection">

       <div class="container">
        <h2 class="title">Наши автобусы</h2>
            <ul class="products__list">
                <Product v-for="(product, index) in products" :key = "index" :product="product"/>
            </ul>
       </div>
   </section>
</template>
<script>

    import axios from 'axios';
    import Product from "/src/components/Product/Product.vue"
    export default{
        components: {Product},
        data(){
            return{
                products: []
            }
        },
        methods:{
            async getBuses(){
                const response = await axios.get('http://localhost:3000/buses');
                this.products = response.data;
                console.log(products)
            }
        },
        mounted(){
            this.getBuses();
        }
    }
</script>

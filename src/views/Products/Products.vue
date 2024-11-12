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

    import jsonData from "/src/assets/data/Data.json"
    import Product from "/src/components/Product/Product.vue"
    export default{
        components: {Product},
        data(){
            return{
                products: jsonData.products
            }
        }
    }
</script>

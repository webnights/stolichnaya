<template>

    <div class="product">
        <RouterLink :to="{ name: 'product', params: { id: product.id}}"> 
            <div class="product__bg" :style="productBackgroundStyle"></div>
            <h6>{{product.name}}</h6>
            <p>{{product.description}}</p>
        </RouterLink>
    </div>
</template>
<script>

    export default{
      props:{
        product:{
            type: Object,
            required: true
        }
      },
      computed: {
        productBackgroundStyle() {
            return {
                'background': `url(${this.product.image}) 0 0 / cover no-repeat`,
                'height': '300px',
                'width': '100%',
                
            };
        }
    }

    }
</script>

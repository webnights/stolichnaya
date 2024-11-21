<template>

    <Hero/>
    <Advantages/>
    <Carousel :buses = "carouselBases"/>

</template>
<script>
    import Hero from '/src/components/Hero/Hero.vue';
    import Advantages from '/src/components/Advantages/Advantages.vue';
    import Carousel from '/src/components/Carousel/Carousel.vue';

    export default{
        components:{Hero,Advantages,Carousel},
        data(){
            return{
                carouselBases:[
                    {id: 1, image: '/src/assets/images/buses_carousel/1.jpg'},
                    {id: 2, image: '/src/assets/images/buses_carousel/2.jpg'},
                    {id: 3, image: '/src/assets/images/buses_carousel/3.jpg'},
                    {id: 4, image: '/src/assets/images/buses_carousel/4.jpg'},
                ]
            }
        }
    }
</script>

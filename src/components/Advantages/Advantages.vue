<template>
    <section class="advantages">
        <div class="container">
            <div class="advantages__inner">
                <ul class="advantages__cards">
                    <AdvantageCard v-for="(item, index) in info" :key="index" :info = "item"/>
                </ul>
            </div>
        </div>
    </section>
</template>
<script>
   import AdvantageCard from "/src/components/AdvantageCard/AdvantageCard.vue"
   import dataJson from "/src/assets/data/Data.json"
    export default{
        components:{
            AdvantageCard
        },
        data(){
            return{
                info: dataJson.advantages
            }
        }
       
    }
</script>

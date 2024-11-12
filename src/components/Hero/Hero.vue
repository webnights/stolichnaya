<template>
    <section class="hero">
       <div class="container">
           <div class="hero__inner">
                <div class="hero__content">
                    <h1>Автобусная компания <span>Столичная</span></h1>
                    <p>
                        Автобусная Компания «СТОЛИЧНАЯ» была образована 30 апреля 2004 года. Основной вид деятельности — оказание транспортных услуг по перевозке пассажиров на комфортабельных автобусах по России и Европе. Мы предлагаем пассажирам безупречный сервис, комфорт и абсолютную безопасность в пути. <br><br> С 2009 года Автобусная Компания «СТОЛИЧНАЯ» входит в «Единую Транспортную Систему «Российские Автобусные Линии». Ежегодно услугами компании пользуются десятки тысяч человек. Ведь сегодня АК «СТОЛИЧНАЯ» — одна из лидирующих компаний в сфере междугородних пассажирских перевозок.
                        <br><br>
                        В настоящий момент АК «СТОЛИЧНАЯ» может конкурировать лишь с самолетами и железной дорогой. Здесь главные преимущества автобусов АК «СТОЛИЧНАЯ»: недорогие автобусные билеты, гибкие системы скидок и наличие прямых маршрутов из Москвы в Южную Столицу и города Черноморского побережья.
                    </p>
                    <RouterLink to = "/products"><Button :content="'Наши автобусы'" :type = "'button'"/></RouterLink>
                </div>
                <div class="hero__image">
                    <img src="/src/assets/images/bus.avif">
                </div>
           </div>
       </div>
    </section>
</template>
<script>
    import Button from '/src/components/Button/Button.vue' 
    export default{
        components: {Button},
        methods: {
        scrollToBuses() {
        const busesSection = document.querySelector('.products')
        if (busesSection) {
            busesSection.scrollIntoView({ behavior: 'smooth', alignToTop: true });
        }
        }
    }
    }
</script>

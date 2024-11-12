<template>
    <section class="schedule">
        <div class="container">
            <div class="schedule__inner">
                <h2 class="title">Расписание маршрутов</h2>
                <table>
                    <thead>
                        <tr>
                            <td style="text-align: center;">Маршрут</td>
                            <td colspan="2" >Отправление</td>
                            <td colspan="2">Прибытие</td>
                            <td>Стоимость</td>
                        </tr>
                    </thead>
                    <tbody>
                        <ScheduleItem v-for="(ticket, index) in schedule" :key = "index" :ticket="ticket"/>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
  </template>
  
  <script>
    import ScheduleItem from '/src/components/ScheduleItem/ScheduleItem.vue'
    import dataJson from '/src/assets/data/Data.json'
  export default {
    components:{
        ScheduleItem
    },
    data(){
        return{
            schedule: dataJson.schedule,
        }
    }
    
  }
  </script>
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
    import axios from 'axios'
    import ScheduleItem from '/src/components/ScheduleItem/ScheduleItem.vue'
  export default {
    components:{
        ScheduleItem
    },
    data(){
        return{
            schedule: []
        }
    },
    methods:{
        async getSchedules(){
            try{
                const response  = await axios.get("http://localhost:3000/schedules");
                this.schedule = response.data;
                console.log(this.schedule)
            }catch(error){
                console.log(error, "Произошла ошибка при попытке взятия данных из таблицы Расписания");
            }
        }
    },
    mounted(){
        this.getSchedules();
    }

    
  }
  </script>
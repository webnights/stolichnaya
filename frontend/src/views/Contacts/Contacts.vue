<template>
    <section class="contacts">
        <div class="container">
            <div class="contacts__inner">
                <h2 class="title">Контакты</h2>
                <ul>
                    <ContactItem v-for = "(contact, index) in contacts" :key = "index" :contact = "contact"/>
                </ul>
                <div class="contacts__map">
                    <h5>Мы на карте</h5>
                    <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Ad40ddd757f5fb05946fadc9cd8191741705e87f078e5fb50ac1fac0679e49e24&amp;source=constructor" width="800px" height="400px" frameborder="0"></iframe>
                </div>
            </div>
        </div>
    </section>
 </template>
 <script>
    import axios from 'axios'
    import ContactItem from "/src/components/ContactItem/ContactItem.vue"
    export default{
        components:{
            ContactItem
        },
        data(){
            return{
                contacts: []
            }
        },
        methods:{
            async getContacts(){
                try{
                    const response = await axios.get("http://localhost:3000/contacts");
                    this.contacts = response.data;
                }
                catch(error)
                {
                    console.log(error, "Произошла ошибка при взятии данных из таблицы Контакты")
                }
            }
        }, 
        mounted(){
            this.getContacts();
        }
    }
 </script>
 
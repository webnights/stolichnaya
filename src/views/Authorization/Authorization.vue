<template>
    <section class="authorization">
        <div class="container">
            
            <div class="authorization__inner">
                <h2 class="title">Авторизация</h2>
                <form>
                    <label>Телефон<Input :type="'tel'" :placeholder="'Введите ваш номер телефона'"/></label>
                    <label>Пароль<Input :type="'password'" :placeholder="'Введите ваш пароль'"/></label>
                    <Button :content = "'Войти'" :type="'submit'" style="max-width: 100%;"/>
                </form>
            </div>
        </div>
    </section>
  </template>
  
  <script>
  import Input from "/src/components/Input.vue"
  import Button from "/src/components/Button/Button.vue"
  export default {
    components:{
        Input, Button
    }
    
  }
  </script>
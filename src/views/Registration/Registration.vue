<template>
    <section class="registration">
        <div class="container">
            
            <div class="registration__inner">
                <h2 class="title">Регистрация</h2>
                <form>
                    <label>Имя<Input :type="'text'" :placeholder="'Введите ваше имя'"/></label>
                    <label>Телефон<Input :type="'tel'" :placeholder="'Введите ваш номер телефона'"/></label>
                    <label>Пароль<Input :type="'password'" :placeholder="'Введите желаемый пароль'"/></label>
                    <label>Подтверждение пароля<Input :type="'password'" :placeholder="'Повторите пароль'"/></label>
                    <div class="registration__privacy">
                        <input type="checkbox">
                        <p>Даю свое согласие на <a href="/src/assets/images/privacy.pdf" download="" style="color: red;">Обработку персональных данных</a></p>
                    </div>
                    <Button :content = "'Зарегистрироваться'" :type="'submit'" style="max-width: 100%;"/>
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
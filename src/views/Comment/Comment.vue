<template>
    <section class="comment">
        <div class="container">
            
            <div class="comment__inner">
                <h2 class="title">Мы будем рады, если вы дадите нам обратную связь. Здесь вы можете оставить свой отзыв!</h2>
                <form>
                    <div class="estimation">
                        <h5>Как вы нас оцениваете?</h5>
                        <label >Плохо<Input :type = "'radio'" name="radioButton"/></label>
                        <label >Хорошо<Input :type = "'radio'" name="radioButton"/></label>
                        <label >Отлично<Input :type = "'radio'" name="radioButton"/></label>
                        <label >Превосходно!<Input :type = "'radio'" name="radioButton"/></label>
                    </div>
                    <label>Ваш отзыв <textarea placeholder="Напишите ваш отзыв"></textarea></label>
                    <label>Имя<Input :type="'text'" :placeholder="'Введите ваше имя'"/></label>
                    <label>Телефон<Input :type="'tel'" :placeholder="'Введите ваш номер телефона'"/></label>

                    <div class="comment__privacy">
                        <input type="checkbox">
                        <p>Даю свое согласие на <a href="/src/assets/images/privacy.pdf" download="" style="color: red;">Обработку персональных данных</a></p>
                    </div>
                    <Button :content = "'Оставить отзыв'" :type="'submit'" style="max-width: 100%;"/>
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
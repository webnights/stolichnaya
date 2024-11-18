<template>
    <tr class="schedule__row">
        <td>{{ticket.route}}</td>
        <td style="text-align: center;">{{ticket.start}}</td>
        <td style="text-align: center;"><img :src="Logo" style="max-width: 100px;" alt=""></td>
        <td style="text-align: center;">{{ticket.end}}</td>
        <td style="text-align: center;">{{ticket.day}}</td>
        <td style="text-align: center;">{{ticket.price + '₽.'}}</td>
    </tr>
  </template>
  
  <script>

    import Logo from "/src/assets/images/logo.svg"

  export default {
    props:{
        ticket:{
            type: Object,
            required: true,
        }
    },
    data(){
        return{
            Logo: Logo,
        }
    }
  }
  </script>
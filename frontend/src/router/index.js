  import { createWebHistory, createRouter } from 'vue-router'

  import Home from '../views/Home/Home.vue'
  import Contacts from '../views/Contacts/Contacts.vue'
  import ProductPage from '../views/ProductPage/ProductPage.vue'
  import Registration from '../views/Registration/Registration.vue'
  import Authorization from '../views/Authorization/Authorization.vue'
  import Products from '../views/Products/Products.vue'
  import Schedule from '../views/Schedule/Schedule.vue'
  import Comment from '../views/Comment/Comment.vue'
  import User from '../views/User/User.vue'
  import Cart from '../components/Cart/Cart.vue'

  const routes = [
    { path: '/', component: Home },
    { path: '/contact', component: Contacts},
    {
      path: '/product/:id', // :id - динамический параметр маршрута
      name: 'product',
      component: ProductPage,
      props: true // Передавать параметры маршрута как props
    },
    { path: '/registration', component: Registration},
    { path: '/authorization', component: Authorization},
    { path: '/products', component: Products},
    { path: '/schedule', component: Schedule},
    { path: '/comment', component: Comment},
    { path: '/protected', component: User },
    {path: '/cart/:userId', component: Cart},
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes
  })

  export default router;
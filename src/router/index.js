import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import TasksPage from '../views/TasksPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: LoginPage
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: TasksPage
  }
]

const router = new VueRouter({
  routes
})

export default router

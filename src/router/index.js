import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import About from '@/views/About';
import Contact from '@/views/Contact';
import Login from '@/views/Login';
import Policies from '@/views/Policies';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Home,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/policies',
      name: 'Policies',
      component: Policies,
    },
  ],
});

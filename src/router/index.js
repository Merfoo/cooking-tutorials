import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import About from '@/views/About';
import Contact from '@/views/Contact';
import Login from '@/views/Login';
import Policies from '@/views/Policies';
import Account from '@/views/Account';
import Create from '@/views/Create';
import Recipe from '@/views/Recipe';
import store from '@/store/index';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
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
    {
      path: '/account',
      name: 'Account',
      component: Account,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/create',
      name: 'Create',
      component: Create,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/recipe/:id',
      name: 'Recipe',
      component: Recipe,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !store.getters.user) {
    next({
      name: 'Login',
      query: {
        redirect: to.fullPath,
      },
    });
  } else {
    next();
  }
});

export default router;

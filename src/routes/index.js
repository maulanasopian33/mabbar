import { createRouter, createWebHistory } from 'vue-router';
import login from '../pages/login.vue';
import SplashScreen from '../pages/splashScreen.vue';
import home from '../pages/home.vue';
import listBelajar from '../pages/listBelajar.vue';
import materi from '../pages/materi.vue';
import Skornilai from '../pages/Skornilai.vue';
import Setoran from '../pages/Setoran.vue';
const routes = [
  {
    path: '/',
    name: 'SplashScreen',
    component: SplashScreen 
  },
  {
    path: '/login',
    name: 'Login',
    component: login,
  },
  {
    path: '/home',
    name: 'Home',
    component: home
  },
  {
    path: '/belajar',
    name: 'ListBelajar',
    component: listBelajar
  },
  {
    path: '/materi',
    name: 'Materi',
    component: materi
  },
  {
    path: '/skornilai',
    name: 'Skor Nilai',
    component: Skornilai
  },
{
  path: '/setoran',
  name: 'Setoran',
  component: Setoran
}
//   { path: "/:pathMatch(.*)*", component: Notfound, name: 'NotFound',}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
// Menerapkan middleware sebelum setiap navigasi rute
router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = to.meta.middleware;
    const context = {
      next,
      router
    };
    return middleware[0]({
      ...context
    });
  }
  return next();
});
export default router;
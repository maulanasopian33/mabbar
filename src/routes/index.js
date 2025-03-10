import { createRouter, createWebHistory } from 'vue-router';
import login from '../pages/login.vue';
import SplashScreen from '../pages/splashScreen.vue';
import home from '../pages/home.vue';
import listBelajar from '../pages/listBelajar.vue';
import materi from '../pages/materi.vue';
import Skornilai from '../pages/Skornilai.vue';
import Setoran from '../pages/Setoran.vue';
import ItemSetoranSiswa from '../pages/item-setoran.vue';
import ListLatihan from '../pages/listLatihan.vue';
import latihanTest from '../pages/latihan-test.vue';

import guruAuth from '../middleware/guruAuth';
import siswaAuth from '../middleware/siswaAuth';
// guru
import loginGuru from '../pages/guru/login.vue';
import registerGuru from '../pages/guru/register.vue';
import dashboardGuru from '../pages/guru/dashboard.vue';
import materiGuru from '../pages/guru/materi.vue';
import tambahmateri from '../pages/guru/tambahmateri.vue';
import Editmateri from '../pages/guru/editmateri.vue';
import Siswa from '../pages/guru/siswa.vue';
import ListMateri from '../pages/listMateri.vue';
import listSetoran from '../pages/guru/setoran.vue';
import ItemSetoran from '../pages/guru/itemSetoran.vue';
import guruLatihan from '../pages/guru/latihan.vue';
import guruSoalPG from '../pages/guru/soal-pg.vue';
import guruSoalPGAdd from '../pages/guru/soal-pgAdd.vue';
import guruPenilaianLatihan from '../pages/guru/listPenilaian.vue';
import guruPenilaianSetoran from '../pages/guru/listPenilaian-Setoran.vue';
import gurunilaiPenilaianLatihan from '../pages/guru/nilaiPenilaian-latihan.vue';
import gurunilaiPenilaianSetoran from '../pages/guru/penilaian-setoran.vue';

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
    component: home,
    meta: {
      middleware: [siswaAuth]
    }
  },
  {
    path: '/belajar',
    name: 'ListBelajar',
    component: listBelajar,
    meta: {
      middleware: [siswaAuth]
    }
  },
  {
    path: '/belajar/:id',
    name: 'ListMateri',
    component: ListMateri,
    meta: {
      middleware: [siswaAuth]
    }
  },
  {
    path: '/materi/:id',
    name: 'Materi',
    component: materi,
    meta: {
      middleware: [siswaAuth]
    }
  },
  {
    path: '/skornilai',
    name: 'SkorNilai',
    component: Skornilai,
    meta: {
      middleware: [siswaAuth]
    }
  },
  {
    path: '/setoran',
    name: 'Setoran',
    component: Setoran,
    meta: {
      middleware: [siswaAuth]
    }
  },
  {
    path: '/latihan',
    name: 'Latihan',
    component: ListLatihan,
    meta: {
      middleware: [siswaAuth]
    }
  },
  {
    path: '/latihan/:id',
    name: 'LatihanTest',
    component: latihanTest,
    meta: {
      middleware: [siswaAuth]
    }
  },
  {
    path: '/setoran/:id',
    name: 'itemSetoran',
    component: ItemSetoranSiswa,
    meta: {
      middleware: [siswaAuth]
    }
  },
  // guru
  {
    path: '/guru',
    name: 'Guru',
    redirect: '/guru/dashboard'
  },
  {
    path: '/guru/login',
    name: 'Login Guru',
    component: loginGuru,
  },
  {
    path: '/guru/register',
    name: 'register Guru',
    component: registerGuru,
  },
  {
    path: '/guru/dashboard',
    name: 'dashboard Guru',
    component: dashboardGuru,
    meta: {
      middleware: [guruAuth]
    }
  },
  {
    path: '/guru/materi/:id',
    name: 'input Materi',
    component: materiGuru,
    meta: {
      middleware: [guruAuth]
    }
  },
  {
    path: '/guru/materi/:id/tambah',
    name: 'tambah Materi',
    component: tambahmateri,
    meta: {
      middleware: [guruAuth]
    }
  },
  {
    path: '/guru/materi/edit/:id',
    name: 'edit Materi',
    component: Editmateri,
    meta: {
      middleware: [guruAuth]
    }
  },
  {
    path: '/guru/siswa',
    name: 'siswa',
    component: Siswa,
    meta: {
      middleware: [guruAuth]
    }
  },
  {
    path: '/guru/setoran',
    name: 'setoran',
    component: listSetoran,
    meta: {
      middleware: [guruAuth]
    }
  },
  {
    path: '/guru/setoran/:id',
    name: 'item setoran',
    component: ItemSetoran,
    meta: {
      middleware: [guruAuth]
    }
  },
  {
    path: '/guru/latihan',
    name: 'guruLatihan',
    component: guruLatihan,
    meta: {
      middleware: [guruAuth]
    }
  },
  {
    path: '/guru/latihan/pilihan-ganda/:id',
    name: 'guruSoalPG',
    component: guruSoalPG,
    meta: {
      middleware: [guruAuth]
    }
  },
  {
    path: '/guru/latihan/pilihan-ganda/add/:id',
    name: 'guruSoalPGAdd',
    component: guruSoalPGAdd,
    meta: {
      middleware: [guruAuth]
    }
  },
  {
    path: '/guru/penilaian/latihan',
    name: 'penilaianLatihan',
    component: guruPenilaianLatihan,
    meta: {
      middleware: [guruAuth]
    }
  },
  {
    path: '/guru/penilaian/latihan/:id',
    name: 'nilaipenilaianLatihan',
    component: gurunilaiPenilaianLatihan,
    meta: {
      middleware: [guruAuth]
    }
  },
  {
    path: '/guru/penilaian/setoran',
    name: 'penilaianSetoran',
    component: guruPenilaianSetoran,
    meta: {
      middleware: [guruAuth]
    }
  },
  {
    path: '/guru/penilaian/setoran/:id',
    name: 'nilaipenilaianSetoran',
    component: gurunilaiPenilaianSetoran,
    meta: {
      middleware: [guruAuth]
    }
  },
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
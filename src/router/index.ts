import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { store } from '@/store/';
import Home from '../views/Home.vue';
import Favorite from '@/views/Favorite.vue';
import { MoviesInterface } from "@/interfaces/Movies.interface";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: 'mainLayout',
      auth: true,
      title: {
        'en-US': 'Home',
        'ru-RU': 'Главная',
      },
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Sign-in.vue'),
    meta: {
      layout: 'registerLayout',
      auth: false,
      title: {
        'en-US': 'Authorization',
        'ru-RU': 'Авторизация',
      },
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Sign-up.vue'),
    meta: {
      layout: 'registerLayout',
      auth: false,
      title: {
        'en-US': 'Registration',
        'ru-RU': 'Регистрация',
      },
    },
  },
  {
    path: '/404',
    name: 'notFound',
    component: () => import('@/views/404.vue'),
    meta: {
      layout: 'registerLayout',
      auth: false,
      title: {
        'en-US': '404',
        'ru-RU': '404',
      },
    },
  },
  {
    path: '/movie-detail/:id',
    name: 'movie-detail',
    component: () => import('@/views/Movie-detail.vue'),
    meta: {
      layout: 'mainLayout',
      auth: true,
    },
  },
  {
    path: '/category-search',
    name: 'category-search',
    component: () => import('@/views/Category-search.vue'),
    meta: {
      layout: 'mainLayout',
      auth: true,
      title: {
        'en-US': 'Movie Search',
        'ru-RU': 'Поиск по фильмам',
      },
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/Profile.vue'),
    meta: {
      layout: 'mainLayout',
      auth: true,
      title: {
        'en-US': 'Profile',
        'ru-RU': 'Профиль',
      },
    },
  },
  {
    path: '/category-movies',
    name: 'category-detail',
    component: () => import('@/views/Category-movies.vue'),
    children: [
      {
        path: 'premier',
        component: () => import('@/views/Category-movies.vue'),
        meta: {
          categoryId: MoviesInterface.CategoryId.Premier,
          title: {
            'en-US': 'Premier',
            'ru-RU': 'Премьеры',
          },
        },
      },
      {
        path: 'tv-series',
        component: () => import('@/views/Category-movies.vue'),
        meta: {
          categoryId: MoviesInterface.CategoryId.TvSerie,
          title: {
            'en-US': 'tv-series',
            'ru-RU': 'Сериалы',
          },
        },
      },
      {
        path: 'anime',
        component: () => import('@/views/Category-movies.vue'),
        meta: {
          categoryId: MoviesInterface.CategoryId.Anime,
          title: {
            'en-US': 'Anime',
            'ru-RU': 'Аниме',
          },
        },
      },
      {
        path: 'cartoon',
        component: () => import('@/views/Category-movies.vue'),
        meta: {
          categoryId: MoviesInterface.CategoryId.Cartoon,
          title: {
            'en-US': 'Cartoon',
            'ru-RU': 'Мультфильмы',
          },
        },
      },
    ],
    meta: {
      layout: 'mainLayout',
      auth: true,
    },
  },
  {
    path: '/favorite',
    name: 'favorite',
    component: Favorite,
    meta: {
      layout: 'mainLayout',
      auth: true,
      title: {
        'en-US': 'Favorite',
        'ru-RU': 'Избранное',
      },
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((to:any, from, next) => {
  const requireAuth = to.meta.auth;
  const lang: string = navigator.language;

  if (to.meta.title) {
    const currentTitle = `${to.meta.title[lang]}`;
    document.title = currentTitle;
    let setTitleTimer: any = null;

    window.onblur = function () {
      setTitleTimer = window.setTimeout(() => {
        document.title = 'ВЕРНИТЕСЬ! 😭';
      }, 2000);
    };
    window.onfocus = function () {
      document.title = currentTitle;
      clearTimeout(setTitleTimer);
    };
  }

  if (requireAuth && store.getters['auth/isAuthenticated']) {
    next();
  } else if (requireAuth && !store.getters['auth/isAuthenticated']) {
    next('/login?message=auth');
  } else {
    next();
  }
});

export default router;

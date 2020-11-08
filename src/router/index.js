import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/admin.vue'),
    children: [{
      path: '',
      name: 'Home',
      component: () => import('../views/HelloWorld.vue')
    },
    {
      path: 'about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/About.vue')
    },
    {
      path: 'articles',
      name: 'Articles',
      component: () => import('../views/Articles.vue')
    },
    {
      path: 'membres',
      name: 'Membres',
      component: () => import('../views/Membres.vue')
    },
    {
      path: 'spectacles',
      name: 'Spectacles',
      component: () => import('../views/Spectacles.vue')
    },
    {
      path: 'reservations',
      name: 'Reservations',
      component: () => import('../views/Reservations.vue')
    },
    {
      path: 'article/:id',
      name: 'Article',
      component: () => import('../views/Article.vue')
    },
    {
      path: 'pieces',
      name: 'Pieces',
      component: () => import('../views/Pieces.vue')
    },
    {
      path: 'roles',
      name: 'Roles',
      component: () => import('../views/Roles.vue')
    },
    {
      path: 'membre/:id',
      name: 'Membre',
      component: () => import('../views/Membre.vue')
    },
    {
      path: 'piece/:id',
      name: 'Piece',
      component: () => import('../views/Piece.vue')
    },
    {
      path: 'spectacle/:id',
      name: 'Spectacle',
      component: () => import('../views/Spectacle.vue')
    },
    {
      path: 'reservation/:id',
      name: 'Reservation',
      component: () => import('../views/Reservation.vue')
    },
    {
      path: 'messages',
      name: 'Messages',
      component: () => import('../views/Messages.vue')
    },
    {
      path: 'message/:id',
      name: 'Message',
      component: () => import('../views/Message.vue')
    },
    {
      path: 'login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    }
    ]
  },
  {
    path: '/welcome',
    name: 'Acceuil',
    component: () => import('../views/Client.vue'),
    children: [{
      path: '',
      name: 'default',
      component: () => import('../views/Welcome.vue')
    },
    {
      path: 'articles',
      name: 'ArticleClient',
      component: () => import('../views/ArticlesClient.vue')
    },
    {
      path: 'membres',
      name: 'MembresClient',
      component: () => import('../views/MembresClient.vue')
    },
    {
      path: 'spectacles',
      name: 'SpectaclesClient',
      component: () => import('../views/SpectacleClient.vue')
    },
    {
      path: 'message',
      name: 'MessageClient',
      component: () => import('../views/MessageClient.vue')
    },
    {
      path: 'article/:id',
      name: 'AticleClientId',
      component: () => import('../views/ArticleClient.vue')
    },
    {
      path: 'membre/:id',
      name: 'MembreClientId',
      component: () => import('../views/MembreClient.vue')
    }
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router

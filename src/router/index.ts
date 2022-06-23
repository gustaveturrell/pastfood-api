import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import {authGuard} from '../helpers/auth-gard'

const routes=[
        {
            path:'/', name:'Home',
            component: Home,
        },
        {
            path:'/Register', name:'Login',
            component:() => import('../views/logins/Register.vue'),
        },
        {
            path:'/Compte', name:'Compte',
            component:() => import('../views/logins/Compte.vue'),
            // beforeEnter: redirectToHomeOnLoggedIn,
            beforeEnter: authGuard,
            
        },
        {
            path:'/Creation', name:'Nouveau',
            component:()=> import('../views/logins/AccountCreate.vue'),
            // beforeEnter: redirectToHomeOnLoggedIn,
            beforeEnter: authGuard,
           
        },
        {
            path:'/Recettes', name:'Recettes',
            component:()=> import('../views/Recettes.vue'),
            meta:{
                requiresAuth: true
            }
        },
        {
            path:'/About', name:'Team',
            component:()=> import('../views/About.vue')
        },
        {
            path: '/admin',
            name: 'admin',
            component:()=> import('../views/admin/Layout.vue'),    
            children: [
              { path: 'PageAdmin', name: 'pagAdmin', component:()=> import('../views/admin/PageAdmin.vue') },
              { path: 'edition/UserIndex', name: 'userList', component:()=> import('../views/admin/edition/UserIndex.vue') },
              { path: 'edition/UserEdit/:id(\\d+)?', name: 'userEdit', component:()=> import('../views/admin/edition/UserEdit.vue'),props:true },
              { path: 'edition/UserAdd', name: 'userAdd',component:()=> import('../views/admin/edition/UserAdd.vue') },
              { path: '/:pathMatch(.*)*', redirect: '/admin/PagaAdmin' }
            ]
          },
        {
            path: "/:pathMatch(.*)*",
            component: () => import("../views/404.vue"),
          },
    ]

const router = createRouter({
    history:createWebHistory(),
    routes
})

router.beforeEach((to,from,next)=>{
    if(to.matched[0].name == 'admin'){
        authGuard()
      }
    next()
})

export default router


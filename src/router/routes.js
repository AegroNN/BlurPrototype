export const routes = [
    {
        path: '/',
        name: 'home',
        component: ()=> import('@/views/Home/HomeView.vue')
    
    },
    {
        path:'/login',
        name:'login',
        component: ()=> import('@/views/Login-SignUp/LoginView.vue')
    },
    {
        path:'/signup',
        name:'signup',
        component: ()=> import('@/views/Login-SignUp/SignupView.vue')
    },
    {
        path:'/admin',
        name:'admin',
        component: ()=> import('@/views/Admin/AdminView.vue')
    },
]
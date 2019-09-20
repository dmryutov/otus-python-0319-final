const Login = () => import(/* webpackChunkName: "auth" */ '@/pages/auth/login.vue');
const Logout = () => import(/* webpackChunkName: "auth" */ '@/pages/auth/logout.vue');


export default [
    {
        path: '/auth/login',
        component: Login,
        name: 'login',
        meta: {
            title: 'Authentication',
        },
    },
    {
        path: '/auth/logout',
        component: Logout,
        name: 'logout',
    },
];

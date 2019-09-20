import auth from '@/middleware/auth';

const CA = () => import(/* webpackChunkName: "ca" */ '@/pages/ca');


export default [
    {
        path: '/ca',
        component: CA,
        name: 'ca',
        meta: {
            title: 'Correspondence Analysis',
            middleware: [auth],
        },
        alias: '/',
    },
];

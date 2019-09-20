import auth from '@/middleware/auth';

const STL = () => import(/* webpackChunkName: "stl" */ '@/pages/stl');


export default [
    {
        path: '/stl',
        component: STL,
        name: 'stl',
        meta: {
            title: 'Time Series Decomposition',
            middleware: [auth],
        },
    },
];

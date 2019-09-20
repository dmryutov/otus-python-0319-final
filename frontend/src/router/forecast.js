import auth from '@/middleware/auth';

const Forecast = () => import(/* webpackChunkName: "forecast" */ '@/pages/forecast');


export default [
    {
        path: '/forecast',
        component: Forecast,
        name: 'forecast',
        meta: {
            title: 'Time Series Forecasting',
            middleware: [auth],
        },
    },
];

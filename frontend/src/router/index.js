import NProgress from 'nprogress';
import VueRouter from 'vue-router';

import {HOME_PAGE, SERVICE_TITLE} from '@/consts/system';
import Home from '@/layouts/home';

import auth from './auth';
import ca from './ca';
import forecast from './forecast';
import stl from './stl';


// Create main router
const router = new VueRouter({
    mode: 'history',
    routes: [
        ...auth,
        {
            path: '/',
            component: Home,
            children: [
                ...ca,
                ...forecast,
                ...stl,
            ],
        },
        {
            path: '*',
            redirect: {name: HOME_PAGE},
        },
    ],

});


/**
 * Add interceptor before each vue-router request
 */
export const beforeEachRequest = (to, from, next) => {
    // Start page loading progress bar
    NProgress.start();
    // Set dynamic page title
    const {middleware, title} = to.meta;
    document.title = `${title} | ${SERVICE_TITLE}`;
    // Invoke middleware
    if (middleware) {
        (Array.isArray(middleware) ? middleware : [middleware]).forEach((func) => {
            func({to, from, next});
        });
    }
    next();
};


router.beforeEach(beforeEachRequest);
router.afterEach(() => {
    NProgress.done();
});

export default router;

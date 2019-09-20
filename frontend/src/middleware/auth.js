import VueCookies from 'vue-cookies';

import {TOKEN_ACCESS} from '@/consts/user';


export default ({next}) => {
    if (!VueCookies.get(TOKEN_ACCESS)) {
        next({name: 'login'});
    }
};

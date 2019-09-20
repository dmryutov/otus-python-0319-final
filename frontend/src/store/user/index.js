import VueCookies from 'vue-cookies';

import {HOME_PAGE} from '@/consts/system';
import {
    TOKEN_ACCESS, TOKEN_REFRESH, TOKEN_CONFIG,
} from '@/consts/user';
import axios from '@/plugins/axios';
import router from '@/router';
import {parseUserToken} from '@/utils/user';
import * as types from './types';


export const state = {
    /**
     * Current user instance
     */
    currentUser: null,
    /**
     * User profile data
     */
    userData: {},
    /**
     * True if something went wrong
     */
    error: false,
};


export const getters = {
    /**
     * Current user instance
     */
    currentUser: (state) =>
        state.currentUser || parseUserToken(VueCookies.get(TOKEN_ACCESS)),
    /**
     * User profile data
     */
    userData: (state) => state.userData,
    /**
     * True if something went wrong while login
     */
    loginError: (state) => state.error,
};


export const mutations = {
    /**
     * Save information about user after successful sign in
     */
    [types.LOGIN](state, payload) {
        VueCookies.set(TOKEN_ACCESS, payload.access, ...TOKEN_CONFIG);
        if (payload.refresh) {
            VueCookies.set(TOKEN_REFRESH, payload.refresh, ...TOKEN_CONFIG);
        }
        state.currentUser = parseUserToken(payload.access);
        state.error = false;
    },
    /**
     * Update error status if any error occurred while sign in
     */
    [types.LOGIN_ERROR](state) {
        state.error = true;
    },
    /**
     * Clear information about user after sign out
     */
    [types.LOGOUT]() {
        VueCookies.remove(TOKEN_ACCESS);
        VueCookies.remove(TOKEN_REFRESH);
        state.currentUser = null;
        router.push({name: 'login'});
    },
};


export const actions = {
    /**
     * Perform authorization
     */
    [types.LOGIN]({commit}, payload) {
        return axios.post('user/token/', {
            username: payload.username,
            password: payload.password,
        }).then((response) => {
            commit(types.LOGIN, response.data);
            router.push({name: HOME_PAGE});
        }).catch(() => {
            commit(types.LOGIN_ERROR);
        });
    },
    /**
     * Refresh user auth token
     */
    [types.REFRESH_TOKEN]({commit}) {
        return axios.post('user/token/refresh/', {
            refresh: VueCookies.get(TOKEN_REFRESH),
        }).then((response) => {
            commit(types.LOGIN, response.data);
        });
    },
};


export default {
    state,
    getters,
    mutations,
    actions,
};

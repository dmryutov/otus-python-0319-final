import VueCookies from 'vue-cookies';

import {TOKEN_ACCESS, TOKEN_REFRESH} from '@/consts/user';
import axios from '@/plugins/axios';  // eslint-disable-line
import router from '@/router/index';  // eslint-disable-line
import {mutations} from '@/store/user';
import * as types from '@/store/user/types';


describe('store/user/mutations', () => {
    const token = '.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTY1NTUyOTMwLCJqdGkiOiIyNzRlNDJlZmFmMWU0Y2NjYjVhYWEwODAzNjg2YTNlNSIsImlkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiYXZhdGFyIjoiaHR0cDovLzEyNy4wLjAuMTo4MDgwL21lZGlhZmlsZXMvdXNlci9uby1hdmF0YXIucG5nIiwiZGFya19tb2RlIjpmYWxzZSwicGVybWlzc2lvbnMiOltdfQ.';
    const currentUser = {
        token,
        token_type: 'access',
        exp: 1565552930,
        jti: '274e42efaf1e4cccb5aaa0803686a3e5',
        id: 1,
        username: 'admin',
        avatar: 'http://127.0.0.1:8080/mediafiles/user/no-avatar.png',
        dark_mode: false,
        permissions: [],
    };
    const userData = {
        first_name: 'Dmitry',
        last_name: 'Ryutov',
        email: 'admin@mail.ru',
        gender: 'm',
        birthday: '1990-01-01',
        phone: '111-222-333',
        dark_mode: false,
    };
    const state = {
        currentUser: null,
        userData: {},
        error: false,
    };

    it('LOGIN', () => {
        const payload = {
            access: token,
            refresh: token,
        };

        mutations[types.LOGIN](state, payload);
        // expect(VueCookies.get(TOKEN_ACCESS)).toBe(token);
        // expect(VueCookies.get(TOKEN_REFRESH)).toBe(token);
        expect(state.currentUser).toEqual(currentUser);
        expect(state.error).toBe(false);
    });

    it('LOGIN_ERROR', () => {
        mutations[types.LOGIN_ERROR](state);
        expect(state.error).toBe(true);
    });

    it('LOGOUT', () => {
        router.push = jest.fn();
        VueCookies.set(TOKEN_ACCESS, 'token');
        VueCookies.set(TOKEN_REFRESH, 'token');

        mutations[types.LOGOUT](state);
        expect(VueCookies.get(TOKEN_ACCESS)).toBeNull();
        expect(VueCookies.get(TOKEN_REFRESH)).toBeNull();
        // expect(state.currentUser).toBeNull();
        expect(router.push).toHaveBeenCalledWith({name: 'login'});
    });
});

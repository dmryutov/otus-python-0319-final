import axios from '@/plugins/axios';  // eslint-disable-line
import router from '@/router/index';  // eslint-disable-line
import {getters} from '@/store/user';


describe('store/user/getters', () => {
    const currentUser = {
        token: 'token',
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
        currentUser,
        userData,
        error: false,
    };

    it('currentUser', () => {
        const value = getters.currentUser(state);
        expect(value).toEqual(currentUser);
    });

    it('userData', () => {
        const value = getters.userData(state);
        expect(value).toEqual(userData);
    });

    it('loginError', () => {
        const value = getters.loginError(state);
        expect(value).toBe(false);
    });
});

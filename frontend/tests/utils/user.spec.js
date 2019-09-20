import VueCookies from 'vue-cookies';

import {TOKEN_ACCESS} from '@/consts/user';
import {jwtToken, parseUserToken} from '@/utils/user';


describe('utils/user/jwtToken', () => {
    it('get token', () => {
        const token = 'token';

        VueCookies.set(TOKEN_ACCESS, token);
        expect(jwtToken()).toBe('JWT token');
    });
});


describe('utils/user/parseUserToken', () => {
    const token = '.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTY1NTUyOTMwLCJqdGkiOiIyNzRlNDJlZmFmMWU0Y2NjYjVhYWEwODAzNjg2YTNlNSIsImlkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiYXZhdGFyIjoiaHR0cDovLzEyNy4wLjAuMTo4MDgwL21lZGlhZmlsZXMvdXNlci9uby1hdmF0YXIucG5nIiwiZGFya19tb2RlIjpmYWxzZSwicGVybWlzc2lvbnMiOltdfQ.';

    it('parse', () => {
        const userInfo = parseUserToken(token);
        expect(userInfo).toEqual({
            token,
            token_type: 'access',
            exp: 1565552930,
            jti: '274e42efaf1e4cccb5aaa0803686a3e5',
            id: 1,
            username: 'admin',
            avatar: 'http://127.0.0.1:8080/mediafiles/user/no-avatar.png',
            dark_mode: false,
            permissions: [],
        });
    });
});



import VueCookies from 'vue-cookies';

import {TOKEN_ACCESS} from '@/consts/user';
import auth from '@/middleware/auth';


describe('middleware/auth', () => {
    const next = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('no token', () => {
        const to = {
            fullPath: 'new_route',
        };

        auth({to, next});
        expect(next).toHaveBeenCalledWith({
            name: 'login',
        });
    });

    it('has token', () => {
        const to = {};
        VueCookies.set(TOKEN_ACCESS, 'token');

        auth({to, next});
        expect(next).not.toHaveBeenCalled();
    });
});

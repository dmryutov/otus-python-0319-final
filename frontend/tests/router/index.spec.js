import * as auth from '@/middleware/auth';
import {beforeEachRequest} from '@/router/index';


describe('router/index', () => {
    const from = {};
    const next = jest.fn();

    beforeEach(() => {
        auth.auth = jest.fn();
    });


    it('no middleware', () => {
        const to = {
            meta: {
                title: 'title',
            },
        };

        beforeEachRequest(to, from, next);
        expect(auth.auth).not.toHaveBeenCalled();
    });

    it('has middleware', () => {
        const to = {
            meta: {
                middleware: auth.auth,
            },
            fullPath: 'new_route',
        };

        beforeEachRequest(to, from, next);
        expect(auth.auth).toHaveBeenCalled();
    });
});

import MockAdapter from 'axios-mock-adapter';

import axios from '@/plugins/axios';
import store from '@/store';


describe('plugins/axios', () => {
    let mock;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });
    afterEach(() => {
        mock.restore();
    });


    it('request, ok', () => {
        mock.onGet().replyOnce(200, {});

        return axios.get('/').then(() => {});
    });

    it('response, 401', () => {
        store.commit = jest.fn();
        mock.onGet().replyOnce(401, {});

        return axios.get('/').then(() => {}).catch(() => {
            expect(store.commit).toHaveBeenCalled();
        });
    });

    it('response, other error', () => {
        store.commit = jest.fn();
        mock.onGet().replyOnce(500, {});

        return axios.get('/').then(() => {}).catch(() => {
            expect(store.commit).not.toHaveBeenCalled();
        });
    });
});

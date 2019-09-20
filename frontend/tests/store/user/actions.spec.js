import MockAdapter from 'axios-mock-adapter';

import axios from '@/plugins/axios';
import router from '@/router/index';  // eslint-disable-line
import {actions} from '@/store/user';
import * as types from '@/store/user/types';
import * as uiUtils from '@/utils/ui';


describe('store/user/actions/LOGIN', () => {
    let mock;
    let context;
    const response = {
        access: 'token',
        refresh: 'token',
    };

    beforeEach(() => {
        uiUtils.requestErrorNotification = jest.fn();
        mock = new MockAdapter(axios);
        context = {
            commit: jest.fn(),
        };
    });
    afterEach(() => {
        mock.restore();
    });

    it('success', () => {
        const payload = {
            username: 'admin',
            password: 'pass1',
        };
        mock.onPost('user/token/').replyOnce(200, response);
        router.push = jest.fn();

        return actions[types.LOGIN](context, payload).then(() => {
            expect(router.push).toHaveBeenCalledWith({name: 'ca'});
        });
    });

    it('with error', () => {
        const payload = {
            username: 'admin',
            password: 'pass1',
        };
        mock.onPost('user/obtain_token/').replyOnce(500);

        return actions[types.LOGIN](context, payload).then(() => {
            expect(context.commit).toHaveBeenCalledWith(types.LOGIN_ERROR);
        });
    });
});


describe('store/user/actions/REFRESH_TOKEN', () => {
    let mock;
    let context;
    const response = {
        access: 'token',
    };

    beforeEach(() => {
        uiUtils.requestErrorNotification = jest.fn();
        mock = new MockAdapter(axios);
        context = {
            commit: jest.fn(),
        };
    });
    afterEach(() => {
        mock.restore();
    });


    it('success', () => {
        mock.onPost('user/token/refresh/').replyOnce(200, response);

        return actions[types.REFRESH_TOKEN](context).then(() => {
            expect(context.commit).toHaveBeenCalledWith(types.LOGIN, response);
        });
    });
});

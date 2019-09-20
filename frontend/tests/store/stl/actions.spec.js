import MockAdapter from 'axios-mock-adapter';

import {STL_MODEL_MULTIPLICATIVE} from '@/consts/stl';
import axios from '@/plugins/axios';
import router from '@/router/index';  // eslint-disable-line
import {actions} from '@/store/stl';
import * as types from '@/store/stl/types';
import * as networkUtils from '@/utils/network';
import * as uiUtils from '@/utils/ui';


describe('store/stl/actions/STL_CALCULATE', () => {
    let mock;
    let context;
    const payload = {
        data: [112, 118, 132, 129, 121, 135, 148, 148, 136, 119],
        model: STL_MODEL_MULTIPLICATIVE,
        frequency: 2,
    };
    const response = {
        trend: [
            0, 120.0, 127.75, 127.75, 126.5,
            134.75, 144.75, 145, 134.75, 0,
        ],
        seasonal: [
            1.00073, 0.99927, 1.00073, 0.99927, 1.00073,
            0.99927, 1.00073, 0.99927, 1.00073, 0.99927,
        ],
        resid: [
            0, 0.98405, 1.03252, 1.01052, 0.95583,
            1.00259, 1.02171, 1.02143, 1.00854, 0,
        ],
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
        mock.onPost('stl/calculate/').replyOnce(200, response);

        return actions[types.STL_CALCULATE](context, payload).then(() => {
            expect(context.commit).toHaveBeenCalledWith(types.STL_CALCULATE, response);
            expect(uiUtils.requestErrorNotification).not.toHaveBeenCalled();
        });
    });

    it('with error', () => {
        mock.onPost('stl/calculate/').replyOnce(500);

        return actions[types.STL_CALCULATE](context, payload).then(() => {
            expect(context.commit).not.toHaveBeenCalled();
            expect(uiUtils.requestErrorNotification).toHaveBeenCalled();
        });
    });
});


describe('store/stl/actions/STL_EXPORT', () => {
    let mock;
    let context;
    const payload = {
        data: [112, 118, 132, 129, 121, 135, 148, 148, 136, 119],
        result: {
            trend: [
                0, 120.0, 127.75, 127.75, 126.5,
                134.75, 144.75, 145, 134.75, 0,
            ],
            seasonal: [
                1.00073, 0.99927, 1.00073, 0.99927, 1.00073,
                0.99927, 1.00073, 0.99927, 1.00073, 0.99927,
            ],
            resid: [
                0, 0.98405, 1.03252, 1.01052, 0.95583,
                1.00259, 1.02171, 1.02143, 1.00854, 0,
            ],
        },
    };

    beforeEach(() => {
        networkUtils.downloadFile = jest.fn();
        uiUtils.requestErrorNotification = jest.fn();
        mock = new MockAdapter(axios);
        context = {};
    });
    afterEach(() => {
        mock.restore();
    });


    it('success', () => {
        mock.onPost('export/stl/').replyOnce(200, {});

        return actions[types.STL_EXPORT](context, payload).then(() => {
            expect(networkUtils.downloadFile).toHaveBeenCalledWith('STL.xlsx', {});
            expect(uiUtils.requestErrorNotification).not.toHaveBeenCalled();
        });
    });

    it('with error', () => {
        mock.onPost('export/stl/').replyOnce(500);

        return actions[types.STL_EXPORT](context, payload).then(() => {
            expect(networkUtils.downloadFile).not.toHaveBeenCalled();
            expect(uiUtils.requestErrorNotification).toHaveBeenCalled();
        });
    });
});

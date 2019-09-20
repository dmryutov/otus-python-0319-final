import MockAdapter from 'axios-mock-adapter';

import axios from '@/plugins/axios';
import router from '@/router/index';  // eslint-disable-line
import {actions} from '@/store/ca';
import * as types from '@/store/ca/types';
import * as uiUtils from '@/utils/ui';


describe('store/ca/actions/CA_CALCULATE', () => {
    let mock;
    let context;
    const payload = {
        data: [
            [0.3004, 0.6864, 0.4975],
            [0.0198, 0.4604, 0.2151],
            [0.01114, 0.4111, 0.1904],
        ],
        sup_rows: [1],
        sup_cols: [],
    };
    const response = {
        rows: [
            [0.149214530795001, 0.000003179842600434945],
            [-0.16129007512289778, -0.0001295195463716402],
            [-0.1784639246965078, 0.00013929077471438789],
        ],
        cols: [
            [0.4075402952671701, -0.00008532903338284776],
            [-0.09883663196569777, -0.000058551829350146544],
            [0.020978059253086136, 0.000132326486010993],
        ],
        rows_quality: [1, 1, 1],
        cols_quality: [1, 1, 1],
        explained: [99.9951905622692, 0.0048094377308231665],
        eigenvalues: [0.08618492853498014, 0.000004145209832530023],
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
        mock.onPost('ca/calculate/').replyOnce(200, response);

        return actions[types.CA_CALCULATE](context, payload).then(() => {
            expect(context.commit).toHaveBeenCalledWith(types.CA_CALCULATE, response);
            expect(uiUtils.requestErrorNotification).not.toHaveBeenCalled();
        });
    });

    it('with error', () => {
        mock.onPost('ca/calculate/').replyOnce(500);

        return actions[types.CA_CALCULATE](context, payload).then(() => {
            expect(context.commit).not.toHaveBeenCalled();
            expect(uiUtils.requestErrorNotification).toHaveBeenCalled();
        });
    });
});

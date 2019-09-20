import {FORECAST_PERIOD_WEEK} from '@/consts/forecast';
import MockAdapter from 'axios-mock-adapter';

import {STL_MODEL_ADDITIVE} from '@/consts/stl';
import axios from '@/plugins/axios';
import router from '@/router/index';  // eslint-disable-line
import {actions} from '@/store/forecast';
import * as types from '@/store/forecast/types';
import * as networkUtils from '@/utils/network';
import * as uiUtils from '@/utils/ui';


describe('store/forecast/actions/FORECAST_CALCULATE', () => {
    let mock;
    let context;
    const payload = {
        data: [112, 118, 132, 129, 121, 135, 148, 148, 136, 119],
        model: STL_MODEL_ADDITIVE,
        date_start: '2018-01-01',
        period_type: FORECAST_PERIOD_WEEK,
        period_count: 5,
    };
    const response = {
        forecast: [
            120.59698, 122.64263, 124.68828, 126.73394, 128.77959,
            130.82524, 132.87089, 134.91451, 136.95812, 139.00173,
            141.04534, 143.08896, 145.13257, 147.17618, 149.21979,
        ],
        lower: [
            106.83672, 109.81826, 111.86811, 114.4237, 116.63616,
            117.47645, 120.31813, 121.79939, 123.5122, 125.32647,
            127.90822, 130.71439, 132.67517, 133.71598, 136.67513,
        ],
        upper: [
            132.31378, 135.3595, 137.18298, 140.20894, 142.51492,
            143.40091, 146.96642, 148.68516, 149.75802, 152.04478,
            154.12774, 156.17414, 157.98322, 160.46118, 162.30627,
        ],
        changepoints: [],
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
        mock.onPost('forecast/calculate/').replyOnce(200, response);

        return actions[types.FORECAST_CALCULATE](context, payload).then(() => {
            expect(context.commit).toHaveBeenCalledWith(types.FORECAST_CALCULATE, response);
            expect(uiUtils.requestErrorNotification).not.toHaveBeenCalled();
        });
    });

    it('with error', () => {
        mock.onPost('forecast/calculate/').replyOnce(500);

        return actions[types.FORECAST_CALCULATE](context, payload).then(() => {
            expect(context.commit).not.toHaveBeenCalled();
            expect(uiUtils.requestErrorNotification).toHaveBeenCalled();
        });
    });
});


describe('store/forecast/actions/FORECAST_EXPORT', () => {
    let mock;
    let context;
    const payload = {
        data: [112, 118, 132, 129, 121, 135, 148, 148, 136, 119],
        result: {
            forecast: [
                120.59698, 122.64263, 124.68828, 126.73394, 128.77959,
                130.82524, 132.87089, 134.91451, 136.95812, 139.00173,
                141.04534, 143.08896, 145.13257, 147.17618, 149.21979,
            ],
            lower: [
                106.83672, 109.81826, 111.86811, 114.4237, 116.63616,
                117.47645, 120.31813, 121.79939, 123.5122, 125.32647,
                127.90822, 130.71439, 132.67517, 133.71598, 136.67513,
            ],
            upper: [
                132.31378, 135.3595, 137.18298, 140.20894, 142.51492,
                143.40091, 146.96642, 148.68516, 149.75802, 152.04478,
                154.12774, 156.17414, 157.98322, 160.46118, 162.30627,
            ],
            changepoints: [],
        },
        date_start: '2018-01-01',
        period_type: FORECAST_PERIOD_WEEK,
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
        mock.onPost('export/forecast/').replyOnce(200, {});

        return actions[types.FORECAST_EXPORT](context, payload).then(() => {
            expect(networkUtils.downloadFile).toHaveBeenCalledWith('Forecast.xlsx', {});
            expect(uiUtils.requestErrorNotification).not.toHaveBeenCalled();
        });
    });

    it('with error', () => {
        mock.onPost('export/forecast/').replyOnce(500);

        return actions[types.FORECAST_EXPORT](context, payload).then(() => {
            expect(networkUtils.downloadFile).not.toHaveBeenCalled();
            expect(uiUtils.requestErrorNotification).toHaveBeenCalled();
        });
    });
});

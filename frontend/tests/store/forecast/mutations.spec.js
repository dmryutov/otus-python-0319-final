import {FORECAST_CHANGEPOINT_METHOD_AUTO, FORECAST_PERIOD_WEEK} from '@/consts/forecast';
import {STL_MODEL_ADDITIVE} from '@/consts/stl';
import axios from '@/plugins/axios';  // eslint-disable-line
import router from '@/router/index';  // eslint-disable-line
import {mutations} from '@/store/forecast';
import * as types from '@/store/forecast/types';


describe('store/forecast/mutations', () => {
    const state = {
        forecastConfig: {
            changepointMethod: FORECAST_CHANGEPOINT_METHOD_AUTO,
            changepointDates: [],
            changepointScale: 0.05,
            dateStart: '2018-01-01',
            model: STL_MODEL_ADDITIVE,
            periodType: FORECAST_PERIOD_WEEK,
            periodCount: 5,
        },
        forecastData: [],
        forecastResult: null,
    };

    it('FORECAST_RESIZE_DATA', () => {
        const payload = {
            rows: 5,
        };

        mutations[types.FORECAST_RESIZE_DATA](state, payload);
        expect(state.forecastData).toEqual(Array(5).fill(null));
    });

    it('FORECAST_UPDATE_DATA', () => {
        const payload = {
            row: 3,
            value: 100,
        };
        state.caResult = {};

        mutations[types.FORECAST_UPDATE_DATA](state, payload);
        expect(state.forecastData[3]).toBe(100);
        expect(state.forecastResult).toBe(null);
    });

    it('FORECAST_CLEAR_DATA', () => {
        state.caResult = {};

        mutations[types.FORECAST_CLEAR_DATA](state);
        expect(state.forecastData).toEqual([]);
        expect(state.forecastResult).toBe(null);
    });

    it('FORECAST_CALCULATE', () => {
        const payload = {
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

        mutations[types.FORECAST_CALCULATE](state, payload);
        expect(state.forecastResult).toEqual(payload);
    });
});

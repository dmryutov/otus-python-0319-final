import {FORECAST_CHANGEPOINT_METHOD_AUTO, FORECAST_PERIOD_WEEK} from '@/consts/forecast';
import {STL_MODEL_ADDITIVE} from '@/consts/stl';
import axios from '@/plugins/axios';  // eslint-disable-line
import router from '@/router/index';  // eslint-disable-line
import {getters} from '@/store/forecast';


describe('store/forecast/getters', () => {
    const forecastConfig = {
        changepointMethod: FORECAST_CHANGEPOINT_METHOD_AUTO,
        changepointDates: [],
        changepointScale: 0.05,
        dateStart: '2018-01-01',
        model: STL_MODEL_ADDITIVE,
        periodType: FORECAST_PERIOD_WEEK,
        periodCount: 5,
    };
    const forecastData = [112, 118, 132, 129, 121, 135, 148, 148, 136, 119];
    const forecastResult = {
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
    const state = {
        forecastConfig,
        forecastData,
        forecastResult,
    };

    it('forecastConfig', () => {
        const value = getters.forecastConfig(state);
        expect(value).toEqual(forecastConfig);
    });

    it('forecastData', () => {
        const value = getters.forecastData(state);
        expect(value).toEqual(forecastData);
    });

    it('forecastResult', () => {
        const value = getters.forecastResult(state);
        expect(value).toEqual(forecastResult);
    });
});

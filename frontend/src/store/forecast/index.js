import {FORECAST_PERIOD_WEEK, FORECAST_CHANGEPOINT_METHOD_AUTO} from '@/consts/forecast';
import {STL_MODEL_ADDITIVE} from '@/consts/stl';
import axios from '@/plugins/axios';
import {resizeArray} from '@/utils/containers';
import {downloadFile} from '@/utils/network';
import {requestErrorNotification} from '@/utils/ui';
import * as types from './types';


const state = {
    /**
     * Page configuration
     */
    forecastConfig: {
        changepointMethod: FORECAST_CHANGEPOINT_METHOD_AUTO,
        changepointDates: [],
        changepointScale: 0.05,
        dateStart: '2018-01-01',
        model: STL_MODEL_ADDITIVE,
        periodType: FORECAST_PERIOD_WEEK,
        periodCount: 5,
    },
    /**
     * Input table data
     */
    forecastData: [],
    /**
     * Time series forecasting results
     */
    forecastResult: null,
};


export const getters = {
    /**
     * Page configuration
     */
    forecastConfig: (state) => state.forecastConfig,
    /**
     * Input table data
     */
    forecastData: (state) => state.forecastData,
    /**
     * Time series forecasting results
     */
    forecastResult: (state) => state.forecastResult,
};


export const mutations = {
    /**
     * Resize input table data matrix
     */
    [types.FORECAST_RESIZE_DATA](state, payload) {
        state.forecastData = resizeArray(state.forecastData, payload.rows, null);
    },
    /**
     * Update input table data
     */
    [types.FORECAST_UPDATE_DATA](state, payload) {
        state.forecastData.splice(payload.row, 1, payload.value);
        state.forecastResult = null;
    },
    /**
     * Clear all data
     */
    [types.FORECAST_CLEAR_DATA](state) {
        state.forecastData = [];
        state.forecastResult = null;
    },
    /**
     * Save time series forecasting results
     */
    [types.FORECAST_CALCULATE](state, payload) {
        state.forecastResult = payload;
    },
};


export const actions = {
    /**
     * Calculate time series forecast
     */
    [types.FORECAST_CALCULATE]({commit}, payload) {
        return axios.post('forecast/calculate/', payload)
            .then((response) => {
                commit(types.FORECAST_CALCULATE, response.data);
            }).catch((response) => {
                requestErrorNotification(response, 'calculating forecast');
            });
    },
    /**
     * Export time series forecasting results to Excel file
     */
    [types.FORECAST_EXPORT](__, payload) {
        return axios({
            url: 'export/forecast/',
            method: 'POST',
            responseType: 'blob',
            data: payload,
        }).then((response) => {
            downloadFile('Forecast.xlsx', response.data);
        }).catch((response) => {
            requestErrorNotification(response, 'exporting forecast');
        });
    },
};


export default {
    state,
    getters,
    mutations,
    actions,
};

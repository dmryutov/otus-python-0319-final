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
    stlConfig: {
        frequency: 2,
        model: STL_MODEL_ADDITIVE,
    },
    /**
     * Input table data
     */
    stlData: [],
    /**
     * Time series decomposition results
     */
    stlResult: null,
};


export const getters = {
    /**
     * Page configuration
     */
    stlConfig: (state) => state.stlConfig,
    /**
     * Input table data
     */
    stlData: (state) => state.stlData,
    /**
     * Time series decomposition results
     */
    stlResult: (state) => state.stlResult,
};


export const mutations = {
    /**
     * Resize input table data matrix
     */
    [types.STL_RESIZE_DATA](state, payload) {
        state.stlData = resizeArray(state.stlData, payload.rows, null);
    },
    /**
     * Update input table data
     */
    [types.STL_UPDATE_DATA](state, payload) {
        state.stlData.splice(payload.row, 1, payload.value);
        state.stlResult = null;
    },
    /**
     * Clear all data
     */
    [types.STL_CLEAR_DATA](state) {
        state.stlData = [];
        state.stlResult = null;
    },
    /**
     * Save time series decomposition results
     */
    [types.STL_CALCULATE](state, payload) {
        state.stlResult = payload;
    },
};


export const actions = {
    /**
     * Calculate time series decomposition (STL)
     */
    [types.STL_CALCULATE]({commit}, payload) {
        return axios.post('stl/calculate/', payload)
            .then((response) => {
                commit(types.STL_CALCULATE, response.data);
            }).catch((response) => {
                requestErrorNotification(response, 'calculating STL');
            });
    },
    /**
     * Export time series decomposition results to Excel file
     */
    [types.STL_EXPORT](__, payload) {
        return axios({
            url: 'export/stl/',
            method: 'POST',
            responseType: 'blob',
            data: payload,
        }).then((response) => {
            downloadFile('STL.xlsx', response.data);
        }).catch((response) => {
            requestErrorNotification(response, 'exporting STL');
        });
    },
};


export default {
    state,
    getters,
    mutations,
    actions,
};

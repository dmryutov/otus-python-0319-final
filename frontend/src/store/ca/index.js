import _ from 'lodash';

import {CA_SCALING_SYMMETRIC, CA_STATUS_OFF} from '@/consts/ca';
import axios from '@/plugins/axios';
import {resizeArray} from '@/utils/containers';
import {requestErrorNotification} from '@/utils/ui';
import * as types from './types';


const DEFAULT_DATA = () => [['Paste here...', null], [null, null]];


const state = {
    /**
     * Page configuration
     */
    caConfig: {
        angles: [],
        scaling: CA_SCALING_SYMMETRIC,
        showAxisTitle: true,
        showAxisLabel: true,
        showGrid: true,
        showLegend: false,
        showTitle: true,
        showTooltip: false,
        title: 'CA',
    },
    /**
     * Input table data
     */
    caData: DEFAULT_DATA(),
    /**
     * Chart point label positions
     */
    caLabelPositions: {
        rows: [],
        cols: [],
    },
    /**
     * Factor point selected on chart
     */
    caSelectedPoint: {
        series: null,
        index: null,
    },
    /**
     * Correspondence analysis results
     */
    caResult: null,
};


export const getters = {
    /**
     * Page configuration
     */
    caConfig: (state) => state.caConfig,
    /**
     * Input table data
     */
    caData: (state) => state.caData,
    /**
     * Table meta data about input table rows and columns
     */
    caDataMeta: (state) => ({
        rows: state.caData.slice(2)
            .map((row) => ({
                on: row[1] !== CA_STATUS_OFF,
                zero: row.slice(2).every((x) => x === 0),
            })),
        cols: _.zip(...state.caData).slice(2)
            .map((col) => ({
                on: col[1] !== CA_STATUS_OFF,
                zero: col.slice(2).every((x) => x === 0),
            })),
    }),
    /**
     * Input table data (only turned on factors)
     */
    caIncludedData: (state, getters) => state.caData
        .filter((__, index) => {
            const {on, zero} = getters.caDataMeta.rows[index - 2] || {};
            return index < 2 || (on && !zero);
        }).map((row) => row.filter((__, index) => {
            const {on, zero} = getters.caDataMeta.cols[index - 2] || {};
            return index < 2 || (on && !zero);
        })),
    /**
     * Chart point label positions (only turned on factors)
     */
    caLabelPositions: (state, getters) => ({
        rows: state.caLabelPositions.rows
            .map((position, index) => ({position, index}))
            .filter((__, index) => {
                const {on, zero} = getters.caDataMeta.rows[index];
                return on && !zero;
            }),
        cols: state.caLabelPositions.cols
            .map((position, index) => ({position, index}))
            .filter((__, index) => {
                const {on, zero} = getters.caDataMeta.cols[index];
                return on && !zero;
            }),
    }),
    /**
     * Factor point selected on chart
     */
    caSelectedPoint: (state) => state.caSelectedPoint,
    /**
     * Correspondence analysis results
     */
    caResult: (state) => state.caResult,
};


export const mutations = {
    /**
     * Resize input table data matrix
     */
    [types.CA_RESIZE_DATA](state, payload) {
        state.caData = resizeArray(state.caData, payload.rows)
            .map((row) => resizeArray(row, payload.cols, null));
        state.caLabelPositions.rows = resizeArray(state.caLabelPositions.rows,
            payload.rows - 2, 'Top');
        state.caLabelPositions.cols = resizeArray(state.caLabelPositions.cols,
            payload.cols - 2, 'Top');
    },
    /**
     * Update input table data
     */
    [types.CA_UPDATE_DATA](state, payload) {
        let {value, row, col} = payload; // eslint-disable-line prefer-const
        if (row === 0 || col === 0) {
            value = value.replace(/[\n\r]/g, '').replace(/ +/g, ' ').trim();
        }
        state.caData[row].splice(col, 1, value);
        state.caResult = null;
        state.caSelectedPoint.series = null;
        state.caSelectedPoint.index = null;
    },
    /**
     * Update chart point label position
     */
    [types.CA_UPDATE_LABEL_POSITION](state, payload) {
        state.caLabelPositions[payload.direction].splice(payload.index, 1, payload.value);
    },
    /**
     * Update coordinates of point selected on chart
     */
    [types.CA_UPDATE_SELECTED_POINT](state, payload) {
        state.caSelectedPoint.series = payload.series;
        state.caSelectedPoint.index = payload.index;
    },
    /**
     * Clear all data
     */
    [types.CA_CLEAR_DATA](state) {
        state.caData = DEFAULT_DATA();
        state.caResult = null;
        state.caSelectedPoint.series = null;
        state.caSelectedPoint.index = null;
    },
    /**
     * Save correspondence analysis (CA) results
     */
    [types.CA_CALCULATE](state, payload) {
        state.caResult = payload;
    },
};


export const actions = {
    /**
     * Calculate correspondence analysis (CA)
     */
    [types.CA_CALCULATE]({commit}, payload) {
        return axios.post('ca/calculate/', payload)
            .then((response) => {
                commit(types.CA_CALCULATE, response.data);
            }).catch((response) => {
                requestErrorNotification(response, 'calculating CA');
            });
    },
};


export default {
    state,
    getters,
    mutations,
    actions,
};

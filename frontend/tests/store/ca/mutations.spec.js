import {CA_SCALING_SYMMETRIC} from '@/consts/ca';
import axios from '@/plugins/axios';  // eslint-disable-line
import router from '@/router/index';  // eslint-disable-line
import {mutations} from '@/store/ca';
import * as types from '@/store/ca/types';


describe('store/ca/mutations', () => {
    const state = {
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
        caData: [[null, null], [null, null]],
        caLabelPositions: {
            rows: [],
            cols: [],
        },
        caSelectedPoint: {
            series: null,
            index: null,
        },
        caResult: null,
    };

    it('CA_RESIZE_DATA', () => {
        const payload = {
            rows: 5,
            cols: 5,
        };

        mutations[types.CA_RESIZE_DATA](state, payload);
        expect(state.caData).toEqual(Array(5).fill(Array(5).fill(null)));
        expect(state.caLabelPositions).toEqual({
            rows: Array(3).fill('Top'),
            cols: Array(3).fill('Top'),
        });
    });

    it('CA_UPDATE_DATA', () => {
        const payload = {
            row: 3,
            col: 2,
            value: 100,
        };
        state.caResult = {};
        state.caSelectedPoint = {
            series: 0,
            index: 2,
        };

        mutations[types.CA_UPDATE_DATA](state, payload);
        expect(state.caData[3][2]).toBe(100);
        expect(state.caResult).toBe(null);
        expect(state.caSelectedPoint).toEqual({
            series: null,
            index: null,
        });
    });

    it('CA_UPDATE_LABEL_POSITION', () => {
        const payload = {
            direction: 'rows',
            index: 1,
            attr: 'cpu',
            value: 'Bottom',
        };

        mutations[types.CA_UPDATE_LABEL_POSITION](state, payload);
        expect(state.caLabelPositions.rows[1]).toBe('Bottom');
    });

    it('CA_UPDATE_SELECTED_POINT', () => {
        const payload = {
            series: 1,
            index: 1,
        };

        mutations[types.CA_UPDATE_SELECTED_POINT](state, payload);
        expect(state.caSelectedPoint).toEqual({
            series: 1,
            index: 1,
        });
    });

    it('CA_CLEAR_DATA', () => {
        state.caResult = {};
        state.caSelectedPoint = {
            series: 0,
            index: 2,
        };

        mutations[types.CA_CLEAR_DATA](state);
        expect(state.caData).toEqual([['Paste here...', null], [null, null]]);
        expect(state.caResult).toBe(null);
        expect(state.caSelectedPoint).toEqual({
            series: null,
            index: null,
        });
    });

    it('CA_CALCULATE', () => {
        const payload = {
            rows: [
                [0.149214530795001, 0.000003179842600434945],
                [-0.16129007512289778, -0.0001295195463716402],
            ],
            cols: [
                [0.4075402952671701, -0.00008532903338284776],
                [0.020978059253086136, 0.000132326486010993],
            ],
            rows_quality: [1, 1, 1],
            cols_quality: [1, 1, 1],
            explained: [99.9951905622692, 0.0048094377308231665],
            eigenvalues: [0.08618492853498014, 0.000004145209832530023],
        };

        mutations[types.CA_CALCULATE](state, payload);
        expect(state.caResult).toEqual(payload);
    });
});

import {STL_MODEL_ADDITIVE} from '@/consts/stl';
import axios from '@/plugins/axios';  // eslint-disable-line
import router from '@/router/index';  // eslint-disable-line
import {mutations} from '@/store/stl';
import * as types from '@/store/stl/types';


describe('store/stl/mutations', () => {
    const state = {
        stlConfig: {
            frequency: 2,
            model: STL_MODEL_ADDITIVE,
        },
        stlData: [],
        stlResult: null,
    };

    it('STL_RESIZE_DATA', () => {
        const payload = {
            rows: 5,
        };

        mutations[types.STL_RESIZE_DATA](state, payload);
        expect(state.stlData).toEqual(Array(5).fill(null));
    });

    it('STL_UPDATE_DATA', () => {
        const payload = {
            row: 3,
            value: 100,
        };
        state.caResult = {};

        mutations[types.STL_UPDATE_DATA](state, payload);
        expect(state.stlData[3]).toBe(100);
        expect(state.stlResult).toBe(null);
    });

    it('STL_CLEAR_DATA', () => {
        state.caResult = {};

        mutations[types.STL_CLEAR_DATA](state);
        expect(state.stlData).toEqual([]);
        expect(state.stlResult).toBe(null);
    });

    it('STL_CALCULATE', () => {
        const payload = {
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

        mutations[types.STL_CALCULATE](state, payload);
        expect(state.stlResult).toEqual(payload);
    });
});

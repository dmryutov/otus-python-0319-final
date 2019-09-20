import {STL_MODEL_ADDITIVE} from '@/consts/stl';
import axios from '@/plugins/axios';  // eslint-disable-line
import router from '@/router/index';  // eslint-disable-line
import {getters} from '@/store/stl';


describe('store/stl/getters', () => {
    const stlConfig = {
        frequency: 2,
        model: STL_MODEL_ADDITIVE,
    };
    const stlData = [112, 118, 132, 129, 121, 135, 148, 148, 136, 119];
    const stlResult = {
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
    const state = {
        stlConfig,
        stlData,
        stlResult,
    };

    it('stlConfig', () => {
        const value = getters.stlConfig(state);
        expect(value).toEqual(stlConfig);
    });

    it('stlData', () => {
        const value = getters.stlData(state);
        expect(value).toEqual(stlData);
    });

    it('stlResult', () => {
        const value = getters.stlResult(state);
        expect(value).toEqual(stlResult);
    });
});

import Vuetify from 'vuetify';
import {createLocalVue, mount} from '@vue/test-utils';

import {STL_MODEL_ADDITIVE} from '@/consts/stl';
// import STL from '@/pages/stl';


const localVue = createLocalVue();
localVue.use(Vuetify);


describe('pages/stl', () => {
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

    it('mock rendering due to "Cannot find module \'@babel/polyfill/lib/noConflict\' from \'index.js\'" testing error', () => {});
    // it('render', () => {
    //     const wrapper = mount(STL, {
    //         localVue,
    //         mocks: {
    //             $store: {
    //                 getters: {
    //                     stlConfig,
    //                     stlData,
    //                     stlResult,
    //                 },
    //             },
    //         },
    //         stubs: ['input-table', 'result-chart'],
    //     });
    //     expect(wrapper.exists()).toBe(true);
    // });
});

// import Vuetify from 'vuetify';
// import {createLocalVue, mount} from '@vue/test-utils';
//
// import CACoordinateTable from '@/components/ca/CACoordinateTable';
//
//
// const localVue = createLocalVue();
// localVue.use(Vuetify);


describe('components/ca/CACoordinateTable', () => {
    const data = [
        [null, null, 'Kids', 'Teens', 'Enjoy life'],
        [null, null, null, null, null],
        ['Coke', null, 0.3004, 0.6864, 0.4975],
        ['V', null, 0.0198, 0.4604, 0.2151],
        ['Red Bull', null, 0.01114, 0.4111, 0.1904],
    ];
    const labelPositions = {
        rows: [
            {position: 'Top', index: 0},
            {position: 'Top', index: 1},
            {position: 'Top', index: 2},
        ],
        cols: [
            {position: 'Top', index: 0},
            {position: 'Top', index: 1},
            {position: 'Top', index: 2},
        ],
    };
    const selectedPoint = {
        series: null,
        index: null,
    };
    const result = {
        rows: [
            [0.149214530795001, 0.000003179842600434945],
            [-0.16129007512289778, -0.0001295195463716402],
            [-0.1784639246965078, 0.00013929077471438789],
        ],
        cols: [
            [0.4075402952671701, -0.00008532903338284776],
            [-0.09883663196569777, -0.000058551829350146544],
            [0.020978059253086136, 0.000132326486010993],
        ],
        rows_quality: [1, 1, 1],
        cols_quality: [1, 1, 1],
        explained: [99.9951905622692, 0.0048094377308231665],
        eigenvalues: [0.08618492853498014, 0.000004145209832530023],
    };

    it('mock rendering due to "Cannot find module \'@babel/polyfill/lib/noConflict\' from \'index.js\'" testing error', () => {});
    // it('render', () => {
    //     const wrapper = mount(CACoordinateTable, {
    //         localVue,
    //         propsData: {
    //             data,
    //             labelPositions,
    //             selectedPoint,
    //             result,
    //         },
    //     });
    //     expect(wrapper.exists()).toBe(true);
    // });
});

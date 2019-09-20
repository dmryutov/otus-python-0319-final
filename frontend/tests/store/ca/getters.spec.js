import {CA_SCALING_SYMMETRIC} from '@/consts/ca';
import axios from '@/plugins/axios';  // eslint-disable-line
import router from '@/router/index';  // eslint-disable-line
import {getters} from '@/store/ca';


describe('store/ca/getters', () => {
    const caConfig = {
        angles: [],
        scaling: CA_SCALING_SYMMETRIC,
        showAxisTitle: true,
        showAxisLabel: true,
        showGrid: true,
        showLegend: false,
        showTitle: true,
        showTooltip: false,
        title: 'CA',
    };
    const caData = [
        [null, null, 'Kids', 'Teens', 'Enjoy life'],
        [null, null, null, 'Off', null],
        ['Coke', null, 0, 0.6864, 0.4975],
        ['V', null, 0, 0, 0],
        ['Red Bull', 'Off', 0, 0.4111, 0.1904],
    ];
    const caLabelPositions = {
        rows: ['Top', 'Bottom', 'Top'],
        cols: ['Top', 'Left', 'Top'],
    };
    const caSelectedPoint = {
        series: null,
        index: null,
    };
    const caResult = {
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
    const state = {
        caConfig,
        caData,
        caLabelPositions,
        caSelectedPoint,
        caResult,
    };

    it('caConfig', () => {
        const value = getters.caConfig(state);
        expect(value).toEqual(caConfig);
    });

    it('caData', () => {
        const value = getters.caData(state);
        expect(value).toEqual(caData);
    });

    it('caDataMeta', () => {
        const value = getters.caDataMeta(state);
        expect(value).toEqual({
            rows: [
                {on: true, zero: false},
                {on: true, zero: true},
                {on: false, zero: false},
            ],
            cols: [
                {on: true, zero: true},
                {on: false, zero: false},
                {on: true, zero: false},
            ],
        });
    });

    it('caIncludedData', () => {
        const mockGetters = {
            caDataMeta: getters.caDataMeta(state),
        };
        const value = getters.caIncludedData(state, mockGetters);
        expect(value).toEqual([
            [null, null, 'Enjoy life'],
            [null, null, null],
            ['Coke', null, 0.4975],
        ]);
    });

    it('caLabelPositions', () => {
        const mockGetters = {
            caDataMeta: getters.caDataMeta(state),
        };
        const value = getters.caLabelPositions(state, mockGetters);
        expect(value).toEqual({
            rows: [
                {position: 'Top', index: 0},
            ],
            cols: [
                {position: 'Top', index: 2},
            ],
        });
    });

    it('caSelectedPoint', () => {
        const value = getters.caSelectedPoint(state);
        expect(value).toEqual(caSelectedPoint);
    });

    it('caResult', () => {
        const value = getters.caResult(state);
        expect(value).toEqual(caResult);
    });
});

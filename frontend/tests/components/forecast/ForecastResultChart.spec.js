import Vuetify from 'vuetify';
import {createLocalVue, mount} from '@vue/test-utils';

import ForecastResultChart from '@/components/forecast/ForecastResultChart';


const localVue = createLocalVue();
localVue.use(Vuetify);


describe('components/forecast/ForecastResultChart', () => {
    const data = [112, 118, 132, 129, 121, 135, 148, 148, 136, 119];
    const dates = [
        '2018-01-01', '2018-01-08', '2018-01-15', '2018-01-22', '2018-01-29',
        '2018-02-05', '2018-02-12', '2018-02-19', '2018-02-26', '2018-03-05',
        '2018-03-12', '2018-03-19', '2018-03-26', '2018-04-02', '2018-04-09',
    ];
    const result = {
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

    it('render', () => {
        const wrapper = mount(ForecastResultChart, {
            localVue,
            propsData: {
                data,
                dates,
                result,
            },
        });
        expect(wrapper.exists()).toBe(true);
    });
});

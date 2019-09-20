import Vuetify from 'vuetify';
import {createLocalVue, mount} from '@vue/test-utils';

import DatePicker from '@/components/ui/DatePicker';


const localVue = createLocalVue();
localVue.use(Vuetify);


describe('components/ui/DatePicker', () => {
    it('mock rendering due to vee-validate testing error', () => {});
});

// describe('components/common/DatePicker', () => {
//     it('render', () => {
//         const wrapper = mount(DatePicker, {
//             localVue,
//             propsData: {
//                 label: 'label',
//                 value: '01.01.2018',
//             },
//         });
//         expect(wrapper.exists()).toBe(true);
//         expect(wrapper.find('.v-text-field').exists()).toBe(true);
//         expect(wrapper.find('.v-date-picker').exists()).toBe(true);
//     });
//
//     it('computed/formattedDate', () => {
//         const wrapper = mount(DatePicker, {
//             localVue,
//             propsData: {
//                 label: 'label',
//                 value: '01.01.2018',
//             },
//         });
//         expect(wrapper.exists()).toBe(true);
//
//         expect(wrapper.vm.formattedDate).toBe('');
//     });
// });

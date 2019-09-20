import Vuetify from 'vuetify';
import {createLocalVue, mount} from '@vue/test-utils';

import Tooltip from '@/components/ui/Tooltip';


const localVue = createLocalVue();
localVue.use(Vuetify);


describe('components/ui/Tooltip', () => {
    it('render', () => {
        const wrapper = mount(Tooltip, {
            localVue,
            propsData: {
                text: 'text',
            },
        });
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find('.v-tooltip span').exists()).toBe(true);
    });
});

import Vuetify from 'vuetify';
import {createLocalVue, mount} from '@vue/test-utils';

import Spinner from '@/components/ui/Spinner';


const localVue = createLocalVue();
localVue.use(Vuetify);


describe('components/ui/Spinner', () => {
    it('render', () => {
        const wrapper = mount(Spinner, {
            localVue,
        });
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find('.v-progress-circular').exists()).toBe(true);
    });
});

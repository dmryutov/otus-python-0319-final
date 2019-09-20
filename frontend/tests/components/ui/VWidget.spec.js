import Vuetify from 'vuetify';
import {createLocalVue, mount} from '@vue/test-utils';

import VWidget from '@/components/ui/VWidget';


const localVue = createLocalVue();
localVue.use(Vuetify);


describe('components/ui/VWidget', () => {
    it('render, with title', () => {
        const wrapper = mount(VWidget, {
            localVue,
            propsData: {
                text: 'text',
                title: 'title',
            },
        });
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find('.v-card').exists()).toBe(true);
        expect(wrapper.find('.v-toolbar').exists()).toBe(true);
    });

    it('render, no title', () => {
        const wrapper = mount(VWidget, {
            localVue,
            propsData: {
                text: 'text',
            },
        });
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find('.v-card').exists()).toBe(true);
        expect(wrapper.find('.v-toolbar').exists()).toBe(false);
    });
});

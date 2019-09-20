import Vuetify from 'vuetify';
import {createLocalVue, mount} from '@vue/test-utils';

import SidebarLink from '@/components/home/SidebarLink';


const localVue = createLocalVue();
localVue.use(Vuetify);


describe('components/common/SidebarLink', () => {
    it('render', () => {
        const wrapper = mount(SidebarLink, {
            localVue,
            propsData: {
                icon: 'icon',
                text: 'text',
                to: {name: 'project_list'},
            },
            stubs: ['router-link'],
        });
        expect(wrapper.exists()).toBe(true);

        // Child components
        expect(wrapper.find('.v-list__tile').exists()).toBe(true);
        expect(wrapper.find('.v-icon').exists()).toBe(true);
        expect(wrapper.find('.v-list__tile__title').exists()).toBe(true);
    });
});

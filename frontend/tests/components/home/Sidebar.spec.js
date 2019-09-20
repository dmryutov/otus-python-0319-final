import Vuetify from 'vuetify';
import {createLocalVue, mount} from '@vue/test-utils';

import Sidebar from '@/components/home/Sidebar';
import * as types from '@/store/home/types';


const localVue = createLocalVue();
localVue.use(Vuetify);


describe('components/home/Sidebar', () => {
    it('render', () => {
        const wrapper = mount(Sidebar, {
            localVue,
            mocks: {
                $store: {
                    getters: {
                        showSidebar: false,
                        currentUser: {},
                    },
                },
            },
            stubs: ['sidebar-link'],
        });
        expect(wrapper.exists()).toBe(true);

        // Child components
        expect(wrapper.findAll('sidebar-link-stub').length).toBe(3);
    });

    it('computed/showSidebar', () => {
        const commit = jest.fn();
        const wrapper = mount(Sidebar, {
            localVue,
            mocks: {
                $store: {
                    getters: {
                        showSidebar: false,
                        currentUser: {},
                    },
                    commit,
                },
            },
            stubs: ['sidebar-link'],
        });
        expect(wrapper.exists()).toBe(true);

        expect(wrapper.vm.showSidebar).toBe(false);
        wrapper.vm.showSidebar = true;
        expect(commit).toHaveBeenCalledWith(types.TOGGLE_SIDEBAR, true);
    });
});

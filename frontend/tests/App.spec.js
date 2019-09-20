import {shallowMount} from '@vue/test-utils';

import App from '@/App';


describe('App', () => {
    it('render', () => {
        const wrapper = shallowMount(App, {
            stubs: ['router-view'],
        });
        expect(wrapper.exists()).toBe(true);
    });
});

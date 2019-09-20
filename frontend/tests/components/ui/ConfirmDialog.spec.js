import Vuetify from 'vuetify';
import {createLocalVue, mount} from '@vue/test-utils';

import ConfirmDialog from '@/components/ui/ConfirmDialog';


const localVue = createLocalVue();
localVue.use(Vuetify);


describe('components/ui/ConfirmDialog', () => {
    it('render', () => {
        const wrapper = mount(ConfirmDialog, {
            localVue,
        });
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find('.v-dialog').exists()).toBe(true);
        expect(wrapper.find('.v-toolbar').exists()).toBe(false);
    });

    it('methods/open', () => {
        const wrapper = mount(ConfirmDialog, {
            localVue,
        });
        expect(wrapper.exists()).toBe(true);

        // Default title
        const message = 'mess';
        wrapper.vm.open(message);
        expect(wrapper.vm.$data.visible).toBe(true);
        expect(wrapper.vm.$data.title).toBe(null);
        expect(wrapper.vm.$data.message).toBe(message);
        expect(wrapper.find('.v-toolbar').exists()).toBe(false);

        // Custom title
        const title = 'title';
        wrapper.vm.open(message, title);
        expect(wrapper.vm.$data.visible).toBe(true);
        expect(wrapper.vm.$data.title).toBe(title);
        expect(wrapper.vm.$data.message).toBe(message);
    });

    it('methods/onConfirm', () => {
        const wrapper = mount(ConfirmDialog, {
            localVue,
        });
        expect(wrapper.exists()).toBe(true);

        const message = 'mess';
        wrapper.vm.open(message);
        expect(wrapper.vm.$data.visible).toBe(true);

        wrapper.vm.onConfirm();
        expect(wrapper.vm.$data.visible).toBe(false);
    });

    it('methods/onCancel', () => {
        const wrapper = mount(ConfirmDialog, {
            localVue,
        });
        expect(wrapper.exists()).toBe(true);

        const message = 'mess';
        wrapper.vm.open(message);
        expect(wrapper.vm.$data.visible).toBe(true);

        wrapper.vm.onCancel();
        expect(wrapper.vm.$data.visible).toBe(false);
    });
});

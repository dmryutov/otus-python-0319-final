import {shallowMount} from '@vue/test-utils';

import DragDropUpload from '@/components/ui/DragDropUpload';


describe('components/ui/DragDropUpload', () => {
    it('render', () => {
        const wrapper = shallowMount(DragDropUpload, {
            propsData: {
                form: '',
                fieldName: 'field_name',
                sendFile: () => jest.fn(),
            },
        });
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.contains('.dropzone')).toBe(true);

        // Emit beforeDestroy
        wrapper.destroy();
    });

    it('methods/onDragEnter', () => {
        const wrapper = shallowMount(DragDropUpload, {
            propsData: {
                form: '',
                fieldName: 'field_name',
                sendFile: () => jest.fn(),
            },
        });

        // Simulate onDragEnter
        const preventDefault = jest.fn();
        wrapper.vm.onDragEnter({preventDefault});
        expect(preventDefault).toHaveBeenCalled();
        expect(wrapper.vm.$data.isDragging).toBe(true);
    });

    it('methods/onDrop ie11', () => {
        const sendFile = jest.fn();
        const wrapper = shallowMount(DragDropUpload, {
            propsData: {
                form: document.createElement('form'),
                fieldName: 'field_name',
                sendFile,
            },
        });

        const clearData = jest.fn();
        wrapper.vm.onDrop({
            dataTransfer: {
                files: {
                    file1: {
                        name: 'name1',
                        type: 'type',
                    },
                    file2: {
                        name: 'name2',
                    },
                },
                clearData,
            },
        });
        expect(sendFile).toHaveBeenCalled();
        expect(clearData).toHaveBeenCalled();
    });

    it('methods/onDrop other browsers', () => {
        const sendFile = jest.fn();
        const wrapper = shallowMount(DragDropUpload, {
            propsData: {
                form: document.createElement('form'),
                fieldName: 'field_name',
                sendFile,
            },
        });

        const getAsFile = jest.fn();
        const clear = jest.fn();
        wrapper.vm.onDrop({
            dataTransfer: {
                items: {
                    file1: {
                        kind: 'file',
                        type: 'type',
                        getAsFile,
                    },
                    file2: {
                        kind: 'file',
                        getAsFile,
                    },
                    clear,
                },
            },
        });
        expect(getAsFile).toHaveBeenCalled();
        expect(sendFile).toHaveBeenCalled();
        expect(clear).toHaveBeenCalled();
    });
});

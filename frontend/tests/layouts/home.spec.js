import Vuetify from 'vuetify';
import {createLocalVue, mount} from '@vue/test-utils';

import Home from '@/layouts/home';


const localVue = createLocalVue();
localVue.use(Vuetify);


describe('layouts/home', () => {
    let dateNow;

    beforeAll(() => {
        dateNow = jest.spyOn(Date, 'now').mockImplementation(() => 1514764800000); // 01.01.2018
    });
    afterAll(() => {
        dateNow.mockRestore();
    });


    it('render', () => {
        const commit = jest.fn();
        const dispatch = jest.fn(() => new Promise((resolve) => {
            resolve();
        }));
        const wrapper = mount(Home, {
            localVue,
            mocks: {
                $store: {
                    getters: {
                        isLoading: true,
                        appVersion: '1.0.0',
                        currentUser: {
                            id: 1,
                        },
                    },
                    commit,
                    dispatch,
                },
                $route: {
                    meta: {
                        title: 'title',
                    },
                },
            },
            stubs: ['router-link', 'router-view', 'app-header', 'app-sidebar', 'app-spinner'],
        });
        expect(wrapper.exists()).toBe(true);

        // Child components
        expect(wrapper.contains('app-header-stub')).toBe(true);
        expect(wrapper.contains('app-sidebar-stub')).toBe(true);
        expect(wrapper.contains('app-spinner-stub')).toBe(true);
    });

    it('computed/currentYear', () => {
        const commit = jest.fn();
        const dispatch = jest.fn(() => new Promise((resolve) => {
            resolve();
        }));
        const wrapper = mount(Home, {
            localVue,
            mocks: {
                $store: {
                    getters: {
                        isLoading: false,
                        appVersion: '1.0.0',
                        currentUser: {},
                    },
                    commit,
                    dispatch,
                },
                $route: {
                    meta: {
                        title: 'title',
                    },
                },
            },
            stubs: ['router-link', 'router-view', 'app-header', 'app-sidebar', 'app-spinner'],
        });

        // Test footer year
        const currentYear = new Date().getFullYear();
        expect(wrapper.vm.currentYear).toBe(currentYear);
    });

    it('computed/breadcrumbs, has parent', () => {
        const commit = jest.fn();
        const dispatch = jest.fn(() => new Promise((resolve) => {
            resolve();
        }));
        const wrapper = mount(Home, {
            localVue,
            mocks: {
                $store: {
                    getters: {
                        isLoading: false,
                        appVersion: '1.0.0',
                        currentUser: {},
                    },
                    commit,
                    dispatch,
                },
                $route: {
                    meta: {
                        title: 'title',
                        parent: {
                            title: 'Parent',
                            to: 'project_list',
                        },
                    },
                },
            },
            stubs: ['router-link', 'router-view', 'app-header', 'app-sidebar', 'app-spinner'],
        });

        expect(wrapper.vm.breadcrumbs).toEqual([
            {
                icon: 'mdi-home',
                disabled: true,
            },
            {
                text: 'Parent',
                to: {name: 'project_list'},
                exact: true,
            },
            {
                text: 'title',
                disabled: true,
            },
        ]);
    });

    it('computed/breadcrumbs, no parent', () => {
        const commit = jest.fn();
        const dispatch = jest.fn(() => new Promise((resolve) => {
            resolve();
        }));
        const wrapper = mount(Home, {
            localVue,
            mocks: {
                $store: {
                    getters: {
                        isLoading: false,
                        appVersion: '1.0.0',
                        currentUser: {},
                    },
                    commit,
                    dispatch,
                },
                $route: {
                    meta: {
                        title: 'title',
                    },
                },
            },
            stubs: ['router-link', 'router-view', 'app-header', 'app-sidebar', 'app-spinner'],
        });

        expect(wrapper.vm.breadcrumbs).toEqual([
            {
                icon: 'mdi-home',
                disabled: true,
            },
            {
                text: 'title',
                disabled: true,
            },
        ]);
    });

    it('methods/onScroll', () => {
        const commit = jest.fn();
        const dispatch = jest.fn(() => new Promise((resolve) => {
            resolve();
        }));
        const wrapper = mount(Home, {
            localVue,
            mocks: {
                $store: {
                    getters: {
                        isLoading: false,
                        appVersion: '1.0.0',
                        currentUser: {},
                    },
                    commit,
                    dispatch,
                },
                $route: {
                    meta: {
                        title: 'title',
                    },
                },
            },
            stubs: ['router-link', 'router-view', 'app-header', 'app-sidebar', 'app-spinner'],
        });

        wrapper.vm.onScroll();
        expect(wrapper.vm.$data.showToTop).toBe(false);
    });

    it('methods/toTop', () => {
        const commit = jest.fn();
        const dispatch = jest.fn(() => new Promise((resolve) => {
            resolve();
        }));
        const wrapper = mount(Home, {
            localVue,
            mocks: {
                $store: {
                    getters: {
                        isLoading: false,
                        appVersion: '1.0.0',
                        currentUser: {},
                    },
                    commit,
                    dispatch,
                },
                $route: {
                    meta: {
                        title: 'title',
                    },
                },
            },
            stubs: ['router-link', 'router-view', 'app-header', 'app-sidebar', 'app-spinner'],
        });

        wrapper.vm.$vuetify.goTo = jest.fn();
        wrapper.vm.toTop();
        expect(wrapper.vm.$vuetify.goTo).toHaveBeenCalledWith(0);
    });
});

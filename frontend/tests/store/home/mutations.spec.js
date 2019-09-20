import axios from '@/plugins/axios';  // eslint-disable-line
import router from '@/router/index';  // eslint-disable-line
import {mutations} from '@/store/home';
import * as types from '@/store/home/types';


describe('store/home/mutations', () => {
    const state = {
        isLoading: false,
        showMobileSidebar: false,
        showRefresh: false,
    };

    it('START_LOADING', () => {
        mutations[types.START_LOADING](state);
        expect(state.isLoading).toBe(true);
    });

    it('STOP_LOADING', () => {
        mutations[types.STOP_LOADING](state);
        expect(state.isLoading).toBe(false);
    });

    it('TOGGLE_SIDEBAR', () => {
        mutations[types.TOGGLE_SIDEBAR](state);
        expect(state.showSidebar).toBe(true);

        mutations[types.TOGGLE_SIDEBAR](state);
        expect(state.showSidebar).toBe(false);

        mutations[types.TOGGLE_SIDEBAR](state, false);
        expect(state.showSidebar).toBe(false);

        mutations[types.TOGGLE_SIDEBAR](state, true);
        expect(state.showSidebar).toBe(true);
    });
});

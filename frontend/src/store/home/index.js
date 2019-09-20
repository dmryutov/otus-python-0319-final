import * as types from './types';


export const state = {
    /**
     * Defines whether to show loading indicator
     */
    isLoading: false,
    /**
     * Defines whether to show sidebar
     */
    showSidebar: true,
};


export const getters = {
    /**
     * Application version
     */
    appVersion: () => process.env.APP_VERSION || '0.0.0',
    /**
     * Defines whether to show loading indicator
     */
    isLoading: (state) => state.isLoading,
    /**
     * Defines whether to show sidebar
     */
    showSidebar: (state) => state.showSidebar,
};


export const mutations = {
    /**
     * Show loader animation
     */
    [types.START_LOADING](state) {
        state.isLoading = true;
    },
    /**
     * Hide loader animation
     */
    [types.STOP_LOADING](state) {
        state.isLoading = false;
    },
    /**
     * Hide / show mobile version sidebar
     */
    [types.TOGGLE_SIDEBAR](state, payload = null) {
        state.showSidebar = payload === null ? !state.showSidebar : payload;
    },
};


export default {
    state,
    getters,
    mutations,
};

import axios from '@/plugins/axios';  // eslint-disable-line
import router from '@/router/index';  // eslint-disable-line
import {getters} from '@/store/home';


describe('store/home/getters', () => {
    const state = {
        isLoading: false,
        showSidebar: false,
    };

    it('isLoading', () => {
        const value = getters.isLoading(state);
        expect(value).toBe(false);
    });

    it('showSidebar', () => {
        const value = getters.showSidebar(state);
        expect(value).toBe(false);
    });
});

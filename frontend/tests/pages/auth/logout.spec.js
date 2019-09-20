import {shallowMount} from '@vue/test-utils';

import Logout from '@/pages/auth/logout';
import * as types from '@/store/user/types';


describe('pages/auth/logout', () => {
    it('render', () => {
        const commit = jest.fn();
        const wrapper = shallowMount(Logout, {
            mocks: {
                $store: {
                    commit,
                },
            },
        });
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.text()).toBe('Log out...');

        expect(commit).toHaveBeenCalledWith(types.LOGOUT);
    });
});

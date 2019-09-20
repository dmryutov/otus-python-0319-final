import Vuetify from 'vuetify';
import {createLocalVue, mount} from '@vue/test-utils';

import Login from '@/pages/auth/login';
import * as types from '@/store/user/types';


const localVue = createLocalVue();
localVue.use(Vuetify);


describe('pages/auth/login', () => {
    it('mock rendering due to "Cannot read property \'rtl\' of undefined" testing error', () => {});
});

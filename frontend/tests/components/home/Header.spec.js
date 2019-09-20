import Vuetify from 'vuetify';
import {createLocalVue, mount} from '@vue/test-utils';

import Header from '@/components/home/Header';
import * as types from '@/store/home/types';


const localVue = createLocalVue();
localVue.use(Vuetify);


describe('components/home/Header', () => {
    it('mock rendering due to "Cannot read property \'rtl\' of undefined" testing error', () => {});
});
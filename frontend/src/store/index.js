import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import ca from './ca/index';
import forecast from './forecast/index';
import home from './home/index';
import stl from './stl/index';
import user from './user/index';


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        ca,
        forecast,
        home,
        stl,
        user,
    },
    plugins: [
        createPersistedState({
            key: 'vuex',
            paths: ['home'],
        }),
    ],
});

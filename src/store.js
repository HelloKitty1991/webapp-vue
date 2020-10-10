import Vue from 'vue';
import Vuex from 'vuex';

import { dsGetDeviceData, isInApp } from '@/utils/dsBridge';

Vue.use(Vuex);

const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./modules', true, /[/|\\]store[/|\\]index.js$/);

const modules = {};

requireAll(req).map(md => {
    modules[md.default.name] = md.default;
});

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    state: {
        $deviceData: isInApp() ? dsGetDeviceData() : {},
        history: [],
        slideDirection: 'left'
    },
    mutations: {
        addHistory(state, path) {
            state.history.push(path);
        },
        popHistory(state) {
            state.history.pop();
        },
        changeSlideDirection(state, direction) {
            state.slideDirection = direction;
        }
    },
    modules,
    strict: debug
});
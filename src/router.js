import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

let routes = [];

const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./modules', true, /[/|\\]router[/|\\]index.js$/);
requireAll(req).map(md => {
    routes = routes.concat(md.default);
});

export default new VueRouter({
    routes
});

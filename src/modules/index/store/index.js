export default {
    name: 'index',
    namespaced: true,
    state: {
    },
    getters: {
        animationName(state, getters, root) {
            return root.slideDirection === 'left' ? 'pageEnter' : 'pageLeave';
        }
    },
    mutations: {

    }
}
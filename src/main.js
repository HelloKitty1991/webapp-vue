import Vue from 'vue';
import {Icon} from 'vant';
import 'vant/lib/index.css';

import store from './store';
import router from './router';

import Header from './components/Header';
import App from './modules/index';

Vue.use(Icon);
Vue.component('Header', Header);
Vue.mixin({
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if(vm.$store.state.history.length === 0) {
        vm.$store.commit('addHistory', to.path);
      }
    });
  },
  beforeRouteLeave(to, from, next) {
    const { history } = this.$store.state;
    const index = history.length - 2;
    if(index >= 0 && history[index] === to.path) {
      this.$store.commit('changeSlideDirection', 'right');
      this.$store.commit('popHistory');
    } else {
      this.$store.commit('changeSlideDirection', 'left');
      this.$store.commit('addHistory', to.path);
    }
    next();
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

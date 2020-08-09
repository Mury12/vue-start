import Vue from './prototype'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap-vue/dist/bootstrap-vue.css'
import PageTitle from './components/PageTitle/PageTitle';
import DetailCard from './components/DetailCard/DetailCard';
import Overlayer from './components/Overlayer/Overlayer';

library.add(fas)
Vue.component('fas', FontAwesomeIcon)
Vue.component('PageTitle', PageTitle)
Vue.component('DetailCard', DetailCard)
Vue.component('Overlayer', Overlayer)

import router from './router.js';

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

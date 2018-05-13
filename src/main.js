import Vue from 'vue'
import App from './App.vue'
import VueBarousel from './lib/index'
Vue.use(VueBarousel)
new Vue({
  el: '#app',
  render: h => h(App)
})

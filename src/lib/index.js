import Barousel from './Barousel.vue'
const VueBarousel  = {
  install: function (Vue) {
    Vue.component('barousel', Barousel)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueBarousel)
}

export default VueBarousel

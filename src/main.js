import Vue from 'vue'
import App from './App.vue'
import { LMap, LTileLayer, LMarker,LCircle } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import "leaflet-geosearch/dist/geosearch.css";
Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-circle',LCircle)
Vue.config.productionTip = false
import { Icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

new Vue({
  render: h => h(App),
}).$mount('#app')

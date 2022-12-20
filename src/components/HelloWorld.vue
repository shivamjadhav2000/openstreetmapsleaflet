<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  <div v-if="Type=='geofence'">
    <l-map style="height: 600px" :zoom="zoom" :center="[
      userLocation.lat || defaultLocation.lat,
      userLocation.lng || defaultLocation.lng
    ]">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-marker :lat-lng="markerLatLng"></l-marker>
    <l-circle
      :lat-lng="circle.center"
      :radius="circle.radius"
      :color="circle.color"
    />
  </l-map>
  </div>
  <div v-else>
    <div>
      <p>current location {{ userLocation }}</p>
      <p>entered location {{ position }}</p>
      <p>entered address {{ address }}</p>
    </div>
    <l-map  ref="map" style="height: 600px"  :zoom="zoom" :center="[
      userLocation.lat || defaultLocation.lat,
      userLocation.lng || defaultLocation.lng
    ]">
    <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
    <v-geosearch :options="geosearchOptions" ></v-geosearch>
    <l-marker :lat-lng="markerLatLng"></l-marker>
  </l-map>
  </div>
  </div>

</template>

<script>
import {OpenStreetMapProvider } from 'leaflet-geosearch';
import VGeosearch from 'vue2-leaflet-geosearch';
// const provider = new OpenStreetMapProvider();

// search
// const results = await provider.search({ query: input.value });
// console.log("results=",results)
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    Type:String
  },
  components:{
    'v-geosearch':VGeosearch
  },
  data () {
    return {
      type:'geosearch',
      address:'',
      markerLatLng: [51.504, -0.159],
      geosearchOptions: {
        provider: new OpenStreetMapProvider(),
        showMarker: true,
        autoClose: true
      },

      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 10,
      defaultLocation: {
        lat: 8.9806,
        lng: 38.7578
      },
      userLocation:{},
      position:{},
      // markerLatLng: [51.504, -0.159],
      circle: {
        center: [17.3822115, 78.4060513],
        radius: 4500,
        color: 'red'
      }
    };
  },
  watch: {
    position: {
      deep: true,
      async handler(value) {
        this.address = await this.getAddress();
        console.log("address==",value)
        // this.$emit("input", { position: value, address: this.address });
      }
    }
  },
  mounted() {
  this.getUserPosition();
  this.$refs.map.mapObject.on("geosearch/showlocation", this.onSearch);
},
  methods:{
    async getUserPosition() {
      // check if API is supported
      if (navigator.geolocation) {
        // get  geolocation
        navigator.geolocation.getCurrentPosition(pos => {
          // set user location
          this.userLocation = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          };
          this.markerLatLng=[pos.coords.latitude,pos.coords.longitude]
        });
      }
    },
    async getAddress() {
      this.loading = true;
      let address = "Unresolved address";
      try {
        const { lat, lng } = this.position;
        const result = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        );
        if (result.status === 200) {
          const body = await result.json();
          address = body.display_name;
        }
      } catch (e) {
        console.error("Reverse Geocode Error->", e);
      }
      this.loading = false;
      return address;
    },
    onSearch(value) {
      console.log("value=",value)
      const loc = value.location;
      this.position = { lat: loc.y, lng: loc.x };
      this.markerLatLng=[loc.y,loc.x]
    },
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

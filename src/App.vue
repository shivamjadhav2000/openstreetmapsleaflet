<template>
  <div id="app">
    <div class="buttonGroup">
      <button @click="handletype('geosearch')"  :class="type!='geosearch' || 'highlight' ">search</button>
      <button @click="handletype('geofence')" :class="type!='geofence' || 'highlight'">geoFence</button>
    </div>
    <HelloWorld msg="Open Street Maps Integration using LeafLet Plugin." :Type="type"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data(){
    return {
      type:'geosearch',
    }
  },
  methods:{
  handletype(value){
    this.type=value
  }
}

}

</script>

<style>
.highlight{
background-color: rgba(55, 168, 55, 0.767);
}
button {
  width:80px;
  height:30px;
  border:none;
  text-decoration: none;

}
.buttonGroup{
  width:200px;
  display:flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

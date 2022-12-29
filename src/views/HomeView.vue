<template>
  <div>
    <GmapMap
    :center="{lat: coordinates.lat, lng:coordinates.lng}"
    :zoom="16"
    style="width:100%; height:400px; border-bottom: 2px solid #8f8f8f;"
    :options="{
      disableDefaultUI: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    }"
    >
    <CustomMarker
    :marker="{lat: coordinates.lat, lng:coordinates.lng}"
    alignment="top"
    >
    <v-icon
    x-large
    color="red"
    >
      mdi-map-marker-star
    </v-icon>
    </CustomMarker>
    <CustomMarker
      v-for="place in places"
      :key="place.name"
      :marker="{lat:place.konumu.lat, lng:place.konumu.lng}"
      alignment="top"
    >
    <v-icon
    x-large
    color="red"
    >mdi-map-marker-radius-outline
    </v-icon>
    </CustomMarker>
    </GmapMap>

    <h2>En Yakındaki İşletmeler</h2>
    <v-container class="d-flex flex-row w-100 justify-space-between pa-0">
      <v-card
      class="d-flex flex-row ma-25 m-50"
      v-for="place in places"
      :key="place.name"
      color="#ffffff"
      max-width="275"
      outlined
      elevation="2"
      >
        <v-img
        height="100%"
        src="https://imaj.emlakjet.com//listing/12082417/4DBEB30A423BEF4CAD87DFA81E2BEDA611185324.jpg"
        width="40%"
        ></v-img>
        <div
        class="d-flex flex-column justify-space-end">
          <v-card-title
          class="text-break"
          >{{ place.name}}</v-card-title>
          <v-btn
          color="red"
          @click="goToDirection(place.konumu.lat,place.konumu.lng)"
          >Git</v-btn>
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import GmapCustomMarker from 'vue2-gmap-custom-marker'
  /* eslint-disable */
  export default {
    name: 'HomeView',
    components:{
      'CustomMarker':GmapCustomMarker
    },
    data(){
      return{
        coordinates:{
          lat:0,
          lng:0
        },
        places:[
          {name:"Furkan Terzi", konumu:{lat:38.381441,lng:26.915511}, mesligi:"Terzi",},
          {name:"Ahmet Bakkal", konumu:{lat:38.382071,lng:26.918204}, mesligi:"Bakkal",},
          {name:"Mert Züccaciye", konumu:{lat:38.379725,lng:26.915318}, mesligi:"Züccaciye"},
          {name:"Kayra Kahvehanesi", konumu:{lat:38.382021,lng:26.920017}, mesligi:"Kahvehane"},
        ]
      }
    },
    async created(){
      await this.$getLocation({})
      .then(coordinates =>{
        this.coordinates= coordinates
      })
      .catch(error=> alert("Konum bilgisi okunamadı!!!"))
    },
    methods:{
      goToDirection(lat,lng){
        console.log('girdi')
        window.open("https://google.com/maps/dir/"+this.coordinates.lat+","+this.coordinates.lng+"/"+lat+","+lng+"/@"+this.coordinates.lat+","+this.coordinates.lng+"z")
      },
    },
  }
</script>

<style>
h2{
  font-family: 'Lexend Deca';
  padding: 15px;
  font-weight: bolder;
  text-decoration-line: underline;
}
</style>

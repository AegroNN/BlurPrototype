<template>
<div>
  <v-skeleton-loader
  class="ma-4"
  height="100%"
  width="100%"
  type="image, card-heading, list-item-three-line, card-heading, list-item-three-line"
  v-if="!isReady"/>
  <div
  v-show="isReady">
    <GmapMap
    v-if="isReady"
    :center="{lat: coordinates.lat, lng:coordinates.lng}"
    ref="mapRef"
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
      <GmapMarker
        :key="index"
        v-for="(place, index) in places"
        :position="{lat:place.location.latitude, lng:place.location.longitude}"
        :clickable="true"
        :draggable="false"
        @click="showPlaceDetails(place)"
      >
        <v-card
        v-if="place.show">
        basıldı!!
        </v-card>
      </GmapMarker>
    </GmapMap>
    <div>
    <h2> İşletme tipleri</h2>
    <v-container class="d-flex flex-row w-100 pa-0 align-flex-start justify-flex-start overflow-auto">
      <v-card
      class="profession d-flex flex-row ma-25 m-50 align-center"
      v-for="(profession, index) in professions"
      :key="index"
      color="#fefefe"
      min-width="150"
      min-height="150"
      outlined
      elevation="1"
      @click="sortByProfession(profession)"
      >
        <v-card-title>
          {{profession.nameOfProfession}}
        </v-card-title>
      </v-card>
    </v-container>
  </div>
  <div>
    <h2>{{ selectedProfession }}</h2>
    <v-container class="d-flex flex-row w-100 pa-0 align-flex-start justify-flex-start overflow-auto"
    v-if="!showProfession"
    >
      <v-card
      class="place d-flex flex-column justify-center align-center"
      v-for="(place, index) in places"
      :key="index"
      color="#fefefe"
      min-width="200"
      min-height="350"
      outlined
      elevation="1"
      >
        <v-card-title>
          {{place.name}}
        </v-card-title>
        <v-card-subtitle>
          {{ place.professionName }}
        </v-card-subtitle>
        <v-card-actions>
          <v-btn
          color="red"
          outlined
          @click="showPlaceDetails(place)">
            Göster
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
    <v-container class="d-flex flex-row w-100 pa-0 align-flex-start justify-flex-start overflow-auto"
    v-if="showProfession"
    >
      <v-card
      class="place d-flex flex-column justify-center align-center"
      v-for="(place, index) in places.filter((place)=>place.professionName==selectedProfession)"
      :key="index"
      color="#fefefe"
      min-width="200"
      min-height="350"
      outlined
      elevation="1"
      >
        <v-card-title>
          {{place.name}}
        </v-card-title>
        <v-card-subtitle>
          {{ place.professionName }}
        </v-card-subtitle>
        <v-card-actions>
          <v-btn
          color="red"
          outlined
          @click="showPlaceDetails(place)">
            Göster
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
  <v-dialog
  v-model="showDetails"
  fullscreen
  hide-overlay
  transition="dialog-bottom-transition"
  >
    <v-card>
        <v-toolbar
          dark
          color=#22BD98
        >
          <v-btn
            icon
            dark
            @click="showDetails = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-toolbar-title>BLUR</v-toolbar-title>
        </v-toolbar>
        <v-container class="detail d-flex flex-column w-100 h-100 pa-0 ma-0 justify-center">
          <GmapMap
          :center="{lat: selectedPlace.location.latitude, lng:selectedPlace.location.longitude}"
          :zoom="12"
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
            :marker="{lat: selectedPlace.location.latitude, lng:selectedPlace.location.longitude}"
            alignment="top"
            >
              <v-icon
              x-large
              color="red"
              >
                mdi-map-marker-star
              </v-icon>
            </CustomMarker>
          </GmapMap>
          <div
          class="d-flex flex-column justify-center">
            <v-card-title
            class="justify-center">
              {{ selectedPlace.name }} {{ selectedPlace.professionName }}
            </v-card-title>
            <v-card-actions
            class="mw-100 w-100 justify-center">
              <v-btn
              class="goBtn"
              color="green"
              outlined
              @click="goToDirection(selectedPlace.location.latitude,selectedPlace.location.longitude)">
                Git
              </v-btn>
            </v-card-actions>
          </div>
        </v-container>
      </v-card>
  </v-dialog>
  </div>
</div>
</template>

<script>
import GmapCustomMarker from 'vue2-gmap-custom-marker'
import homeServices from '@/services/home.js'
//import details from '@/components/detailsCard.vue'

  /* eslint-disable */
  export default {
    name: 'HomeView',
    components:{
      'CustomMarker':GmapCustomMarker,
      //details
    },
    data(){
      return{
        map: null,
        isReady:false,
        showDetails:false,
        showProfession:false,
        coordinates:{
          lat:0,
          lng:0
        },
        places:[{
          id:{},
          location:{
            latitude:0,
            longitude:0,
          },
          name:"",
          professionName:"",
        }
        ],
        professions:[],
        bounds:{},
        selectedProfession:"En Yakındakiler",
        selectedPlace:{
          id:{},
          location:{
            latitude:0,
            longitude:0,
          },
          name:"",
          professionName:"",
        },
      }
    },
    async created(){
      if(localStorage.account)
      {
        const account = JSON.parse(localStorage.account)
        if(account.userType === 0)
        {
          this.$router.push('/admin')
        }
      }
      await this.$getLocation({})
      .then(coordinates =>{
        this.coordinates= coordinates
      })
      .catch(error=> alert("Konum bilgisi okunamadı!!!"))
      await this.getWorkplaces();
      await this.getProfessionList();
      this.isReady = true
    },
    methods:{
      showPlaceDetails(place) {
        this.selectedPlace=place;
        this.showDetails= true;
      },
      sortByProfession(profession) {
        if(this.selectedProfession===profession.nameOfProfession) {
          this.selectedProfession= "En Yakındakiler"
          this.showProfession = false;
        }
        else {
          this.selectedProfession = profession.nameOfProfession;
          this.showProfession = true;
        }  
      },
      goToDirection(lat,lng){
        window.open("https://google.com/maps/dir/"+this.coordinates.lat+","+this.coordinates.lng+"/"+lat+","+lng+"/@"+this.coordinates.lat+","+this.coordinates.lng+"z")
      },
      goToAdmin() {
        this.getWorkplaces()
        this.$router.push('/admin');
      },
      async getProfessionList() {
        const res = await homeServices.getProfession();
        this.professions = res.data
      },
      async getWorkplaces() {
        const res = await homeServices.getAllWorkplaces();
        this.places = res.data;
        this.places.forEach(place => {
          place.location.latitude = place.location.latitude.replace(",",".")
          place.location.longitude = place.location.longitude.replace(",",".")
          place.location.latitude = + place.location.latitude
          place.location.longitude = + place.location.longitude
        });
      },
      async getWorkplacesByBounds(){
        const res = await homeServices.getWorkplacesByBounds(coordinates);
      }
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

.profession{
  margin: 10px;
}

.place{
  margin: 10px;
}

.goBtn{
  min-width: 120px;
}

.detail{
  max-width: 100%;
}
::v-deep .v-card-title{
  word-break: break-word !important;
}
</style>

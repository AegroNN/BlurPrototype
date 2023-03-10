<template>
    <div>
        <v-alert
        class="ma-3"
        v-bind="attr"
        shaped
        prominent
        dismissible
        width="100%"
        transition="fab"
        v-if="isDone"
        >{{ attr.value }}</v-alert>
        <div
        class="d-flex d-row">
        <v-skeleton-loader
        class="ma-5"
        height="100%"
        width="50%"
        type="date-picker"
        v-if="!isReady"
        />
        <v-skeleton-loader
        class="ma-5"
        height="100%"
        width="50%"
        type="card-heading, button"
        v-if="!isReady"
        />
        </div>
        <v-form
        v-show="isReady">
            <v-container>
            <v-row>
                <v-col
                class="d-flex flex-column align-center justify-center">
                <h2>İşletme Ekle</h2>
                    <v-text-field
                    v-model="workplace.name"
                    label="İşletme Adı"
                    filled
                    solo
                    required></v-text-field>

                    <v-autocomplete
                    v-model="workplace.professionName"
                    :items="professions"
                    item-text="nameOfProfession"
                    item-value="nameOfProfession"
                    filled
                    clearable
                    solo
                    required
                    placeholder="Meslek Seçiniz..."></v-autocomplete>

                    <div
                    class="d-flex flex-row mw-100 align-center justify-center">
                        <v-text-field
                        class="pa-4"
                        v-model="workplace.latitude"
                        label="Latitude"
                        solo
                        readonly
                        filled></v-text-field>
                        <v-text-field
                        v-model="workplace.longitude"
                        class="pa-4"
                        label="Longitude"
                        solo
                        readonly
                        filled></v-text-field>
                    </div>
                    <GmapMap
                    :center="{lat: workplace.latitude, lng:workplace.longitude}"
                    :zoom="16"
                    ref="mapRef"
                    @dragend="setCenterDetails"
                    style="width:70%; height:400px; border-bottom: 2px solid #8f8f8f;"
                    :options="{
                    disableDefaultUI: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    fullscreenControl: false,
                    }"
                    >
                    <GmapMarker
                    :position="{lat:workplace.latitude, lng:workplace.longitude}"
                    :draggable="false"
                    />
                    </GmapMap>
                    <v-btn
                    class="w-100 pa-5 ma-5"
                    outlined
                    rounded
                    :loading="isSaving"
                    @click="addWorkplace">
                    Ekle
                    </v-btn>
                </v-col>
                <v-col
                class="d-flex flex-column align-center">
                <h2>Meslek Ekle</h2>
                <div
                class="d-flex flex-row">
                    <v-text-field
                    class="w-100 ma-5"
                    v-model="profession.nameOfProfession"
                    label="Meslek Adı"
                    filled
                    solo></v-text-field>
                    <v-btn
                    class="w-100 pa-5 ma-5"
                    outlined
                    rounded
                    :loading="isSaving"
                    @click="addProfession">
                    Ekle
                    </v-btn>
                </div>
                </v-col>
            </v-row>
            </v-container>
        </v-form>
    </div>
</template>

<script>
import adminServices from '@/services/admin.js'
import homeServices from '@/services/home.js'

export default{
    /* eslint-disable */
    name:'AdminView',
    data(){
        return{
            isReady:false,
            map: null,
            isSaving: false,
            isDone:false,
            account:{},
            token:"",
            attr:{
                value:"",
                type:"",
            },
            workplace:{
                name:"",
                latitude:"",
                longitude:"",
                professionName:"",
            },
            professions:[],
            profession:{
                nameOfProfession:"",
            },
        }
    },
    async created(){
        if(!localStorage.account){
            this.$router.push('/');
        }
        else
        {
            this.account = JSON.parse(localStorage.account);
            if(this.account.userType!==0) this.$router.push('/');
        }
        this.token = this.account.token
        await this.$getLocation({})
        .then(coordinates =>{
            this.workplace.latitude = coordinates.lat;
            this.workplace.longitude = coordinates.lng;
        })
        .catch(error=> alert("Konum bilgisi okunamadı!!!"))
        
        const res = await homeServices.getProfession();
        this.professions = res.data
        this.isReady=true
    },
    mounted() {
        this.$refs.mapRef.$mapPromise.then(map => this.map = map);
    },
    methods:{
        setCenterDetails() {
            this.workplace.latitude = this.map.getCenter().lat()
            this.workplace.longitude = this.map.getCenter().lng()
        },
        async addWorkplace() {
            this.isDone=false
            this.isSaving=true
            if(!this.workplace.name) {
                this.attr.value="Lütfen İşletme Adını Giriniz!!!!"
                this.attr.type="error"
                this.isDone=true
            }
            else if(!this.workplace.professionName) {
                this.attr.value="Lütfen Meslek Seçimi Yapınız!!!!"
                this.attr.type="error"
                this.isDone=true
            }
            else{
                this.workplace.latitude = this.workplace.latitude.toString()
                this.workplace.longitude = this.workplace.longitude.toString()
            
                this.workplace.latitude = this.workplace.latitude.replace(".",",")
                this.workplace.longitude = this.workplace.longitude.replace(".",",")

                const res = await adminServices.createWorkplace(this.token,this.workplace)
                this.workplace.name=""
                this.workplace.professionName=""
                this.attr.value="İşleminiz Başarıyla Gerçekleştirilmiştir!!!"
                this.attr.type="success"
                this.isDone=true
            }
            this.isSaving=false
        },
        async addProfession() {
            this.isDone=false
            this.isSaving=true
            if(!this.profession.nameOfProfession){
                this.attr.value="Lütfen Meslek Adını Giriniz!!!!"
                this.attr.type="error"
                this.isDone=true
            }
            else{
            await adminServices.createSingleProffesion(this.token, this.profession)
            this.profession.nameOfProfession=""
            this.attr.value="İşleminiz Başarıyla Gerçekleştirilmiştir!!!"
            this.attr.type="success"
            this.isDone=true
            }
            this.isSaving=false
        },
    },
}
</script>

<style scoped>
#main{
    display: flex;
    min-width: 100%;
    height: 100%;
    margin-right: 0px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1px;
}


::v-deep .v-btn {
    min-width: 150px;
}
::v-deep .v-card{
    min-width: 100% !important;
}
::v-deep .v-input{
    min-width: 70% !important;
}
</style>
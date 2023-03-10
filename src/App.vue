<template>
  <v-app>
    <v-app-bar
      app
      color=#22BD98
      dark
    >
      <div class="d-flex align-center">
        <v-btn
        text
        @click="goToHome()">  
        <h1>BLUR</h1>
        <h4>Göremedikleriniz...</h4>
        </v-btn>
      </div>
      <v-spacer></v-spacer>
      <v-btn
      text
      v-if="displayAccount"
      @click="logOut()"
      >
      <v-icon>
        mdi-account
      </v-icon>
      <h4>{{ Params.name }} {{ Params.surname }}</h4>
      </v-btn>
      <v-btn
      outlined
      text
      v-if="displaySignup"
      @click="goToSignup()"
      >
      Kayıt Ol
      </v-btn>
      <v-btn
      text
      outlined
      v-if="displayLogin"
      @click="goToLogin()"
      >
      Giriş Yap
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import EventBus from './helpers/event-bus';

export default {
  /* eslint-disable */
  name: 'App',
  data(){
    return{
      displayAccount:false,
      displayLogin:true,
      displaySignup:true,
      Params:{}
    } 
  },
  created() {
    this.setDisplays();
  },
  mounted() {
      EventBus.$on('params', this.setParams)
  },
  watch:{
    Params() {
      this.setDisplays()
    }
  },
  methods:{
    setDisplays() {
      if(localStorage.account)
    {
      this.displayAccount=true;
      this.displayLogin=false;
      this.displaySignup=false;
    }
    else if( this.$route.name=="login"){
      this.displayAccount=false;
      this.displayLogin=false;
      this.displaySignup=true;
    }
    else if( this.$route.name=="signup"){
      this.displayAccount=false;
      this.displayLogin=true;
      this.displaySignup=false;
    }
    else{
      this.displayAccount=false;
      this.displayLogin=true;
      this.displaySignup=true;
    }
    },
    setParams(data) {
      this.Params = data;
    },
    goToLogin(){
      if(this.$router.name!=='login'){
      this.displayLogin=false
      this.displaySignup=true
      this.$router.push('/login');
      }
    },
    goToSignup(){
      if(this.$router.name!=='signup'){
      this.displaySignup=false
      this.displayLogin=true
      this.$router.push('/signup');
      }
    },
    goToHome(){
      if(this.$router.name!=='home'){
      this.setDisplays();
      this.$router.push('/');
      }
    },
    logOut(){
      localStorage.clear()
      this.Params = ""
      this.setDisplays();
      this.$router.push('/');
    }
  }
};
</script>

<style>
h1{
  font-family: 'Lexend Exa';
}
h4{
  font-family: 'Lexend Deca';
  padding-left: 5px;
  font-weight: bold;
}

@import url(https://fonts.googleapis.com/css2?family=Lexend+Exa:wght@500&display=swap);
@import url(https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@300&family=Lexend+Exa:wght@500&display=swap);
</style>
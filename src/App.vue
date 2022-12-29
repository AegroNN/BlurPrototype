<template>
  <v-app>
    <v-app-bar
      app
      color=#22BD98
      dark
    >
      <div class="d-flex align-center">
        <h1>BLUR</h1>
        <h4>Göremedikleriniz...</h4>
      </div>
      <v-spacer></v-spacer>
      <v-btn
        text
      >
        <v-icon
          large
        >
          mdi-account
        </v-icon>
        <div>
        <h5>Merhabalar,</h5>
        <h5>{{ Kullanıcı.ad}} {{ Kullanıcı.soyad}}</h5>
        </div>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  /* eslint-disable */
  name: 'App',
  data (){
    return{
      Kullanıcı:{
        ad:"Kayra",
        soyad:"Akbayramlar"
      }
    }
  },
};
</script>

<style>
h1{
  font-family: 'Lexend Exa';
}
h4{
  font-family: 'Lexend Exa';
  padding-left: 5px;
  padding-top: 9px;
  font-weight: normal;
}

@import url(https://fonts.googleapis.com/css2?family=Lexend+Exa:wght@500&display=swap);
@import url(https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@300&family=Lexend+Exa:wght@500&display=swap);
</style>
<template>
    <div id="main">
      <v-card class="d-flex flex-column align-center">
        <v-text-field
            v-model="newAccount.name"
            label="Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="newAccount.surname"
            label="Surname"
            required
          ></v-text-field>
        <v-text-field
            v-model="newAccount.email"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            v-model="newAccount.password"
            label="Password"
            required
          ></v-text-field>
          <v-text-field
            v-model="passwordAgain"
            label="Password Again"
            required
          ></v-text-field>
          <v-btn
          class="ma-5"
          @click="sendNewAccount()">
            Kayıt ol
          </v-btn>
          </v-card>
    </div>
</template>

<script>
import SignupServices from '@/services/signup.js'
import EventBus from '@/helpers/event-bus'

export default{
    

    name:'SignupView',
    data(){
        return{
            newAccount:{
                name:"",
                surname:"",
                email:"",
                password:"",
            },
            passwordAgain:"",
        }
    },
    methods:{
        sendNewAccount(){
            console.log(typeof this.newAccount)
            SignupServices.signup(this.newAccount)
            .then(response=>{
                localStorage.account = JSON.stringify(response.data);
                EventBus.$emit('params', response.data);
                this.$router.push('/');
            })
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

::v-deep .v-card{
    max-width: 70% !important;
    min-width: 70% !important;
}
::v-deep .v-input{
    max-width: 70% !important;
    min-width: 70% !important;
}
</style>
<template>
    <div id="main">
        <v-card class="d-flex flex-column align-center">
            <v-text-field
                v-model="account.email"
                label="E-mail"
                required
              ></v-text-field>
              <v-text-field
                v-model="account.password"
                label="Password"
                type="password"
                required
                @keyup.enter="sendRequest"
              ></v-text-field>
              <v-btn
              class="ma-5"
              @click="sendRequest">
                Giriş Yap
              </v-btn>
        </v-card>
    </div>
</template>

<script>
import LoginServices from '@/services/login.js'
import EventBus from '@/helpers/event-bus'

export default{
    /* eslint-disable */
    name:'LoginView',
    data(){
        return{
        account:{
            email:"",
            password:"",
        },
        Params:{},
        }
    },
    methods:{
        sendRequest(){
            LoginServices.login(this.account)
            .then(response=>{
                localStorage.account = JSON.stringify(response.data);
                EventBus.$emit('params', response.data);
                if(response.data.userType === 0) this.$router.push('/admin');
                else this.$router.push('/');
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
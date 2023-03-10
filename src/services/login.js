import { api } from './interceptor/api.js'


export default{
    login(account){
        return api.post('/home/login', account)
    },
    login2(stringAccount){
        return api.post('/home/login2', stringAccount)
    },
}
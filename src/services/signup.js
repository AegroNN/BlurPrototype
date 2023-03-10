import { api } from './interceptor/api.js'


export default{
    signup(newAccount){
        return api.post('/home/createAccount', newAccount)
    }
}
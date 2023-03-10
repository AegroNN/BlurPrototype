import { api } from './interceptor/api.js'


export default{
    createSingleProffesion(token,params) {
        return api.post('/admin/createsingleprofession', params, { headers: { Authorization: `Bearer ${token}` }});
    },
    createWorkplace(token, params) {
        return api.post('/admin/createworkplace', params, { headers: { Authorization: `Bearer ${token}` }});
    },
}
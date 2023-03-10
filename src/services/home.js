import { api } from './interceptor/api.js'


export default{
    getAllWorkplaces() {
        return api.get('/user/getallworkplaces');
    },
    getProfession() {
        return api.get('/user/getallprofessions');
    },
    getWorkplacesByBounds(params) {
        return api.post('/user/getnearestworkplaces/', params);
    }
}
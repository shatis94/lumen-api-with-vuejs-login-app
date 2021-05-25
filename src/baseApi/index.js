import axios from 'axios'
import cookies from '@/store/cookies/cookie';

let baseApi = axios.create({
    baseURL : 'http://localhost:8000/api'
});

const Api = function(){
    let token = cookies.getCookie("Access-Token");
    if(token){
        baseApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    return baseApi;
}

export default Api
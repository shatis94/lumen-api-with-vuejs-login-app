import baseApi from '@/baseApi'
import router from '@/router'
import store from '@/store'

const LOGIN_URL = '/login';
const LOGOUT_URL = '/logout';
const REG_URL = '/register';

import cookies from '@/store/cookies/cookie';

export default ({
    userDefault:{
        id:'',
        name:'',
        email:'',
        role:'',
    },
    LogIn: async (cred) => {
        try {
            const response = await baseApi().post(LOGIN_URL, cred);
            if( !response.data.error){
                const token = response.data.user.token.value;
                store.dispatch('SET_AUTH_USER', response.data.user.user);
                store.dispatch('SET_TOKEN', response.data.user.token);
                store.dispatch('SET_AUTH', true);
                localStorage.setItem('token', token);
                cookies.setCookie("Access-Token", token, 1);
            }
            return response.data;
        } catch(err) {
            return { "error": true, message: err.message };
        }
    },
    Register: async (cred) => {
        try {
            console.log(cred);
            const response = await baseApi().post(REG_URL, cred);
            return response.data;
        } catch(err) {
            return { "error": true, message1: err.message }; 
        }
    },
    async LogOut(){
        try {
            const response = await baseApi().post(LOGOUT_URL)
            if(!response.data.error){
                this.clear();
                router.push('/');
            }
        } catch(err) {
            return { "error": true, message: err.message }; 
        }
        
    },
    async AuthCheck(){
        try {
            const response = await baseApi().get('/user');
            if(response.data.error) return false;
            store.dispatch('SET_AUTH_USER', response.data.user.user);
            store.dispatch('SET_TOKEN', response.data.user.token);
            store.dispatch('SET_AUTH', true);
            localStorage.setItem('token', response.data.user.token.value);
        } catch(err) {
            return { "error": true, message: err.message }; 
        }
        
    },
    clear(){
        store.dispatch('SET_AUTH_USER', this.userDefault);
        store.dispatch('SET_TOKEN', '');
        store.dispatch('SET_AUTH', false);
        localStorage.removeItem('token');
    }

});
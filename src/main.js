// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import auth from './auth'

import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

import VuePeerJS from 'vue-peerjs';
import Peer from 'peerjs';

Vue.use(VuePeerJS, new Peer({
    path: '/peerjs',
    host: '/',
    port: '8080',
    secure: false
}));

Vue.use(new VueSocketIO({
    debug: true,
    connection: socketio('http://localhost:8080'),
    // vuex: {
    //   store,
    //   actionPrefix: "SOCKET_",
    //   mutationPrefix: "SOCKET_"
    // }
  })
);

auth.AuthCheck();

Vue.config.productionTip = false
/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  sockets: {
      connect: ()=>{
          console.log(`Socket  connected`)
      },
      customEmit: function (data) {
          console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
      }
  },
  data: {isLoading: false},
  router,
  store,
  components: { App },
  template: '<App/>'
})

let timeout = '';
router.beforeResolve((to, from, next) =>{
  clearInterval(timeout);
  app.isLoading = true;
  next();
});

router.afterEach((to, from, next) =>{
  timeout = setTimeout( ()=>{
    app.isLoading = false;
  },500);
});

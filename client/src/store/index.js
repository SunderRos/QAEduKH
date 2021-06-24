import { createStore } from 'vuex'
import axios from 'axios'
import io from 'socket.io-client';

// Create a new store instance.
const store = createStore({
  state () {
    return {
      count: 0,
      userData: JSON.parse(localStorage.getItem('user_data')) || {},
      token: localStorage.getItem('user_token')||"",
      status: false,
      socket : io('localhost:3000'),
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    updateUserData_token(state, {userData, token}){
        state.userData = userData;
        state.token = token;
        state.status = true
    },
    clearUserData_token(state){
        state.userData = {};
        state.token = "";
        state.status = false;
    }
  },
  getters:{
      isAuthenticated: state => !!state.token,
      authStatus: state => state.status,
      getUserData(state){
        return state.userData;
      },
  },
  actions:{
      login(context, credential){
          return new Promise((resolve, reject)=>{
                axios.post('http://localhost:3000/login', {
                email: credential.email,
                password: credential.password,
                }).then(result=>{
                    if(result.data.success){
                        const userData = result.data.result;
                        const token = result.data.token;
                        // console.log(result)
                        localStorage.setItem('user_data', JSON.stringify(userData));
                        localStorage.setItem('user_token', token);
                        // axios.defaults.headers.common['Authorization'] = token;
                        context.commit('updateUserData_token', {userData, token});
                    }
                    resolve(result)
                }).catch(err=>{
                    console.log(err);
                    localStorage.removeItem('user-token');
                    reject(err);
                })
          });
        
      },
      logout(context){
        return new Promise((resolve)=>{
            localStorage.removeItem('user_data');
            localStorage.removeItem('user_token');
            context.commit('clearUserData_token');
            // delete axios.defaults.headers.common['Authorization']
            resolve({success: true});
        });    
      }
  },
})

export default store;
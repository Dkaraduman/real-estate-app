
import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist';
import Crypto from 'crypto-js';
import baseServices from '@/services/indexAirTableService';
import getContactsList from '@/services/getContactsListService';
import getAppointmentsList from '@/services/getAppointmentsListService';
import getAgentsList from '@/services/getAgentListService';
const moment = require('moment');

const storageKey = process.env.VUE_APP_STORAGE_KEY || '';

const vuexLocal = new VuexPersistence({
  key: storageKey,
  storage:{
    getItem: () => {
      // Get the store from local storage.
      const store = window.sessionStorage.getItem(storageKey);

      if (store) {
        try {
          // Decrypt the store retrieved from local storage
          // using our reference in as well as local storage.
          const bytes = Crypto.AES.decrypt(store, storageKey);

          return JSON.parse(bytes.toString(Crypto.enc.Utf8));
        } catch (e) {
          // The store will be reset if decryption fails.
          window.sessionStorage.removeItem(storageKey);
        }
      }

      return null;
    },
    setItem: (key, value) => {
      // Encrypt the store using our encryption reference.
      const store = Crypto.AES.encrypt(value, storageKey).toString();

      // Save the encrypted store in local storage.
      return window.sessionStorage.setItem(storageKey, store);
    },
    removeItem: () => window.sessionStorage.removeItem(storageKey),
  },
  reducer(val){

return val
    
  }
});

const store =  createStore({
  plugins: [vuexLocal.plugin],
  state:{
    contactsList:[],
    appointmentsList:[],
    agentsList:[],
  },
  mutations: {
    setContactsList(state,contactsList){
      state.contactsList = contactsList;
    },
    setAppointmentsList(state,appointmentsList){
      // sort by appointment date asc
      state.appointmentsList = appointmentsList.sort((a,b) => moment(a.fields.appointment_date) - moment(b.fields.appointment_date));
    },
    setAgentsList(state,agentsList){
      state.agentsList = agentsList;
    },
  },
  actions:{
    async getContactsList({commit}){
      try {
      const contactsList = await getContactsList(baseServices);
      if(contactsList){
        commit('setContactsList',contactsList);
      }
      
    } 
    catch (error) {
        console.log(error)
    }
    },


    async getAppointmentsList({commit}){
      try {
      const appointmentsList = await getAppointmentsList(baseServices);
      if(appointmentsList){
        commit('setAppointmentsList',appointmentsList);
      }
      
    } 
    catch (error) {
        console.log(error)
    }
    },

    async getAgentsList({commit}){
      try {
      const agentsList = await getAgentsList(baseServices);
      if(agentsList){
        commit('setAgentsList',agentsList);
      }
      
    } 
    catch (error) {
        console.log(error)
    }
    },

  },
  getters:{
    getContactsList: (state) => state.contactsList,
    getAppointmentsList: (state) => state.appointmentsList,
    getAgentsList: (state) => state.agentsList,


  }

});


export default store;
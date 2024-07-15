
import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist';
import Crypto from 'crypto-js';
import baseServices from '@/services/indexAirTableService';
import getContactsList from '@/services/getContactsListService';
import getAppointmentsList from '@/services/getAppointmentsListService';
import getAgentsList from '@/services/getAgentListService';
import { v4 as uuid } from "uuid"
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
    appointmentModalType:'create',
    contactsList:[],
    appointmentsList:[],
    agentsList:[],
    isAppGeneralModalOpen:false,
    appointmentsListFilter:{
      selectedAgentsIds : [],
      selectedAppointmentStatuses : 'all',
      dateByFrom:'',
      dateByTo: '',
      searchBoxText:'',

    },
    appointmentsObjectModel:{
      id:'',
      createdTime:'',
      fields:{
        appointment_id:'' ,
        appointment_date: '',
        appointment_address: '',
        contact_id: [],
        contact_name: [],
        contact_surname: [],
        contact_email: [],
        contact_phone: [],
        is_cancelled:false,
        agent_id: [],
        agent_name: [],
        agent_surname: [],
        
      },
      
    }
  },
  mutations: {
    setContactsList(state,contactsList){
      state.contactsList = contactsList;
    },
    setAppointmentsList(state,appointmentsList){
      // sort by appointment date asc
      state.appointmentsList = appointmentsList.sort((a,b) => moment(b.fields.appointment_date) - moment(a.fields.appointment_date));
    },
    setAppointmentsObjectModel(state,{key = '', value = ''}){
      if(!key) return;
      if(typeof state.appointmentsObjectModel.fields[key] === 'undefined') return;
      state.appointmentsObjectModel.fields[key] = value;
    },
    setIsAppGeneralModalOpen(state,isAppGeneralModalOpen){
      state.isAppGeneralModalOpen = isAppGeneralModalOpen;
      if(!isAppGeneralModalOpen) {
        state.appointmentsObjectModel = {
          id:'',
          createdTime:'',
          fields:{
            appointment_id: '',
            appointment_date: '',
            appointment_address: '',
            contact_id: [],
            contact_name: [],
            contact_surname: [],
            contact_email: [],
            contact_phone: [],
            is_cancelled:false,
            agent_id: [],
            agent_name: [],
            agent_surname: [],
            
          },
          
        }
      }
    },
    setAgentsList(state,agentsList){
      state.agentsList = agentsList;
    },

    setAppointmentModalType(state,appointmentModalType){
      state.appointmentModalType = appointmentModalType;
    },

    setNewAppointment(state){
      state.appointmentsObjectModel.id = uuid(17);
      state.appointmentsObjectModel.createdTime = moment().format();
      state.appointmentsObjectModel.fields.appointment_id = uuid(3);
      state.appointmentsList.push(state.appointmentsObjectModel);
      state.appointmentsList = state.appointmentsList.sort((a,b) => moment(b.fields.appointment_date) - moment(a.fields.appointment_date));

    },

    setSelectedAppointmentEditInfo(state,appointment){
      state.appointmentsObjectModel.id = appointment.id;
      state.appointmentsObjectModel.createdTime = appointment.createdTime;
      Object.keys(appointment.fields).forEach(key => {
        state.appointmentsObjectModel.fields[key] = appointment.fields[key]
      })
 
    },
    
    editAppointment(state){

      const index = state.appointmentsList.findIndex(appointment => appointment.id === state.appointmentsObjectModel.id)
      state.appointmentsList[index] = state.appointmentsObjectModel;
      state.appointmentsList = state.appointmentsList.sort((a,b) => moment(b.fields.appointment_date) - moment(a.fields.appointment_date));



    },
    setAppointmentsListFilter(state,{key = '', value = ''}){
      if(!key) return;
      if(typeof state.appointmentsListFilter[key] === 'undefined') return;
      state.appointmentsListFilter[key] = value;
    }
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
    getAppointmentsListFilter: (state) => state.appointmentsListFilter,
    getModalStatus: (state) => state.isAppGeneralModalOpen,
    getAppointmentsObjectModel: (state) => state.appointmentsObjectModel,
    getAppointmentModalType: (state) => state.appointmentModalType,


  }

});


export default store;
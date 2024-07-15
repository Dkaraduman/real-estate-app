import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import LoadingSplash from "./utils/LoadingSplash.vue"

import {
    // create naive ui
    create,
    // component
    NSelect,
    NTreeSelect,
    NPopselect,
    NPagination,
    NSpace
   
  } from 'naive-ui'
  
  const naive = create({
    components: [NPagination, NPopselect,NSelect,NTreeSelect,NSpace]
  })

import DatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

createApp(App).use(store).use(naive).use(router).
component("date-picker", DatePicker).
component("LoadingSplash", LoadingSplash).
mount("#real-estate-app");

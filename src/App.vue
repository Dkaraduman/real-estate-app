<template>
  <div id="real-estate-app">
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "real-estate-app",
  async created() {

    // setting initial state via airtable dataset
    await this.setContactsList();
    await this.setAgentsList();
    await this.setAppointmentsList();

  },
  computed: {
    ...mapGetters(["getContactsList", "getAgentsList", "getAppointmentsList"]),
  },
  methods: {
   async setContactsList() {

      if(this.getContactsList.length === 0){
        await this.$store.dispatch("getContactsList");
      }

    },
    async setAgentsList() {
      if(this.getAgentsList.length === 0){
        await this.$store.dispatch("getAgentsList");
      } 
    },
    async setAppointmentsList() {
      if(this.getAppointmentsList.length === 0){
        await this.$store.dispatch("getAppointmentsList");
      } 
    },
  },
}
</script>
<style lang="scss" scoped>
// @import "@/assets/scss/app.scss";
// @import "@/assets/scss/scroll.scss";

* {
  font-family: "Open Sans";
  font-style: normal;
}
</style>

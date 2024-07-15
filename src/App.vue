<template>
  <div id="real-estate-app">
    <router-view v-if="getAppointmentsList.length" />
    <LoadingSplash v-else></LoadingSplash>

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
    ...mapGetters(["getContactsList", "getAgentsList", "getAppointmentsList","getModalStatus"]),
  },
  watch: {
    getModalStatus(newValue) {
      console.log(newValue,'ns')
      let app = document.getElementById("real-estate-app");
      if (newValue) {
        let modalDiv = document.createElement("div");
        modalDiv.id = "modal-bg";
        modalDiv.style = `z-index:0;background:#000000b6;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        backdrop-filter: blur(5px) !important
        ;
        `;
 
        app.append(modalDiv);
      } else {
        let removedElement = document.getElementById("modal-bg");
        if (removedElement?.parentNode) {
          removedElement.parentNode.removeChild(removedElement);
        }
      }
    },
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
<style lang="scss">
@import "@/assets/scss/app.scss";
@import "@/assets/scss/scroll.scss";

#real-estate-app {
  width: 100%;
  height: 100vh;
  position: absolute;
  inset: 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}

* {
  font-family: "Open Sans";
  font-style: normal;
}
</style>

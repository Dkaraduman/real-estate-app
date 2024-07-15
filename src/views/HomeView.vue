<template>
  <div class="home-page-container">
    <NavbarApp />
    <AppointmetsListContainer :key="getModalStatus" />
    <Teleport to="body" v-if="getModalStatus">
      <AppointmentActionModal />
    </Teleport>
    

  </div>
</template>

<script>

// @ is an alias to /src
import NavbarApp from '@/components/navbar_app/IndexNavbarApp.vue';
import AppointmetsListContainer from '@/components/appointments_list/IndexAppointmentsList.vue'
import AppointmentActionModal from "@/components/appointment_modal_container/IndexAppointmentModal.vue";
import { mapGetters } from "vuex";
import {computed} from 'vue'

export default {
  name: "HomeView",
  components: {
    NavbarApp,
    AppointmetsListContainer,
    AppointmentActionModal
  },
  provide() {
    return {
      appointmentActionType: computed(() => this.getAppointmentModalType),
    };
  },

  computed: {
    ...mapGetters(["getAppointmentsListFilter", "getModalStatus","getAppointmentModalType"]),
  },
};
</script>

<style scoped lang="scss">
.home-page-container {
  display: flex;
  flex-direction: column;
  height: 99vh;
  width: 96%;
}
</style>

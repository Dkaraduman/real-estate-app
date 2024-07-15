<template>
  <div class="appointment-modal-container">
    <AppointmentModalHeader/>
    <AppointmentContactSearchBoxVue/>
    <AppointmentSetAdress/>
    <AppointmentAgentsSelectionVue/>
    <AppointmentDatePicker/>
    <AppointmentSetStatus v-if="appointmentActionType === 'edit'"/>
    <ContactRelatedAppointments v-if="appointmentActionType === 'edit'"/>
    <AppointmentControllerButtonsVue @closeAppointmentModal="closeAppointmentModal" @setAppointment="setAppointment($event)"/>
  </div>
</template>

<script>
import  { mapGetters } from "vuex";
import AppointmentContactSearchBoxVue from './AppointmentContactSearchBox.vue';
import AppointmentModalHeader from "./AppointmentModalHeader.vue"
import AppointmentDatePicker from './AppointmentDatePicker.vue';
import AppointmentSetAdress from './AppointmentSetAdress.vue';
import AppointmentSetStatus from './AppointmentSetStatus.vue';
import AppointmentAgentsSelectionVue from './AppointmentAgentsSelection.vue';
import AppointmentControllerButtonsVue from './AppointmentControllerButtons.vue';
import ContactRelatedAppointments from "./ContactRelatedAppointments.vue";

export default {
  inject:{
        appointmentActionType: {
            default: 'create',
            type: String

        }
    },
  components: {
    AppointmentModalHeader,
    AppointmentContactSearchBoxVue,
    AppointmentDatePicker,
    AppointmentSetAdress,
    AppointmentSetStatus,
    AppointmentAgentsSelectionVue,
    AppointmentControllerButtonsVue,
    ContactRelatedAppointments
  },

  methods: {
    closeAppointmentModal() {
      this.$store.commit("setIsAppGeneralModalOpen", false)
    },
    setAppointment(appointmentType = "create") {
      if(appointmentType === "create") {
        this.$store.commit("setNewAppointment")
      }
      else {
        this.$store.commit("editAppointment")
      }
      this.closeAppointmentModal();
      
    }
  },
  computed: {
    ...mapGetters(["getSelectedAppointmentInfo"])
  }
  
}
</script>

<style scoped lang="scss">
.appointment-modal-container {
    position: absolute;
    top: 6%;
    left: 50%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    transform: translateX(-50%);
    width: 34%;
    margin: auto;
    min-height: 70%;
    height: max-content;
    max-height: 90%;
    background: #e7f9f9;
    border: 2px solid #DCDFDF;
    box-sizing: border-box;
    border-radius: 12px;
    gap: 1.2em;
    padding: .5em 1em;
    z-index: 1;
    overflow-y: auto;
    overflow-x:hidden ;

    @media screen and (max-width: 1000px) {
        width: 50%; /* Wider on smaller screens */
        left: 50%; /* Adjust left to center it */
        transform: translateX(-50%); /* Keep centered */
    }

    @media screen and (max-width: 768px) {
        width: 70%; /* Even wider on smaller screens like tablets */
        top: 10%; /* Adjust top for better view */
        padding: 1em; /* Larger padding for better touch interaction */
    }

    @media screen and (max-width: 480px) {
        width: 90%; /* Use almost full width on very small screens */
        top: 5%; /* Minimal top to utilize screen space */
    }
}
</style>
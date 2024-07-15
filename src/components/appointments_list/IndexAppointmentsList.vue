<template>
  <div class="appointments-list-container" :key="filteredAppointmentsList.length + appointmentsList.length">
    <AppointmentsListHeader @createAppointment="createAppointment" :appointmentsCounts="filteredAppointmentsList.length"  />
    <AppointmentsListCardsContainer :key="getModalStatus" :appointmentsList="getPaginatedAppointmentsList"  />
    <AppointmentsListPagination :key="getModalStatus + filteredAppointmentsList.length" @change-paginate-index="changePaginateIndex($event)" :getAppointmentsTotalPageCount="getAppointmentsTotalPageCount" :getFilteredAppointmentsCount="filteredAppointmentsList.length" />
      
      </div>
</template>

<script>
import { mapGetters } from "vuex";
import AppointmentsListHeader from "./AppointmentsListHeader.vue";
import AppointmentsListCardsContainer from "./AppointmentsListCardsContainer.vue";
import AppointmentsListPagination from "./AppointmentsListPagination.vue";
import moment from 'moment'
export default {
components: {
    AppointmentsListHeader,
    AppointmentsListCardsContainer,
    AppointmentsListPagination
},
data() {
    return {
        pageIndex: 0,
        filteredAppointmentsList: [],
    }
},

created() {
    this.filteredAppointmentsList = this.setFilteredAppointmentsList();
},
methods: {

    checkFromDatesFilter(fromDate,appointmentDate) {
    // Convert fromDate and appointmentDate to moment objects for comparison
    const fromDateMoment = moment(fromDate);
    const appointmentDateMoment = moment(appointmentDate);
    
    // Return true if the appointmentDate is after fromDate
    return appointmentDateMoment.isAfter(fromDateMoment);
    // This checks if the appointment date is after the 'from' date. If it is, it returns true, meaning the appointment date is later than the 'from' date. 
    },
    checkToDatesFilter(toDate,appointmentDate) {
    // Convert toDate and appointmentDate to moment objects for comparison
    const toDateMoment = moment(toDate);
    const appointmentDateMoment = moment(appointmentDate);
    
    // Return true if the appointmentDate is before toDate
    return appointmentDateMoment.isBefore(toDateMoment);
    // This checks if the appointment date is before the 'to' date. If it is, it means 'to' date is greater, hence it returns true.
    },

    checkAgenstsFilter(agentIds,appointmentAgentsIds) {
     // Check if appointmentAgentsIds is exists  
    if(!appointmentAgentsIds) return false;
            // Check if any agentId is present in appointmentAgentsIds
    return agentIds.some(agentId => appointmentAgentsIds.includes(agentId));
    },
    checkSearchBoxFilter(searchText,appointment) {

    const normalizedSearchText = searchText.toLowerCase().trim();

    // Pre-compiling a regular expression for efficiency in repeated searches
    const searchRegex = new RegExp(normalizedSearchText, 'i');

    // Using an array to centralize attribute retrieval and make code cleaner
    const searchAttributes = [
        'contact_name', 'contact_surname', 'contact_email',
        'contact_phone', 'appointment_address'
    ];

    // Check if any of the defined attributes matches the search regex
    return searchAttributes.some(attribute => {
        const value = appointment?.fields?.[attribute];
        return value ? searchRegex.test(value) : false;
    });


    },

    checkAppointmentStatusFilter(appointmentStatus,appointment) {
        if(appointmentStatus === 'cancelled'){
            return appointment?.fields?.is_cancelled
        }
        else if(appointmentStatus === 'upcomming'){
            const date = moment();
            const appointmentDateMoment = moment(appointment?.fields?.appointment_date);
            return appointmentDateMoment.isAfter(date)
        }
        else if(appointmentStatus === 'completed'){
            const date = moment();
            const appointmentDateMoment = moment(appointment?.fields?.appointment_date);
            return appointmentDateMoment.isBefore(date)
        }

    },
    applyFilterOptions(appointment) {

        let appointmentPassFilterStatus = [];
        const { 
        selectedAgentsIds,
        selectedAppointmentStatuses,
        dateByFrom,
        dateByTo,
        searchBoxText

       } = this.appointmentsListFilter;

       const appointmentDate = appointment?.fields?.appointment_date;

        if (selectedAppointmentStatuses !== 'all' && selectedAppointmentStatuses.length) {
            appointmentPassFilterStatus.push(this.checkAppointmentStatusFilter(selectedAppointmentStatuses,appointment))
        }

        if(dateByFrom){
            appointmentPassFilterStatus.push(this.checkFromDatesFilter(dateByFrom,appointmentDate))
        }

        if(dateByTo){
            appointmentPassFilterStatus.push(this.checkToDatesFilter(dateByTo,appointmentDate))
        }

        if(searchBoxText){
            appointmentPassFilterStatus.push(this.checkSearchBoxFilter(searchBoxText,appointment))
        }


        if(selectedAgentsIds.length){
            appointmentPassFilterStatus.push(this.checkAgenstsFilter(selectedAgentsIds,appointment?.fields?.agent_id))

        }
        return appointmentPassFilterStatus.every(status => status === true) || appointmentPassFilterStatus.length === 0;

    },

    changePaginateIndex(pageIndex) {
        this.pageIndex = pageIndex
    },

    createAppointment() {
        this.$store.commit("setAppointmentModalType", "create")
        this.$store.commit("setIsAppGeneralModalOpen", true);
    },
    setFilteredAppointmentsList() {
            return this.appointmentsList.filter((appointment) => {
                return this.applyFilterOptions(appointment)
            })
        },
},

watch: {
    appointmentsListFilter: {
        deep: true,
        handler(newFilter) {
            this.filteredAppointmentsList = this.setFilteredAppointmentsList();
        }
    }
},

computed: {
        ...mapGetters({
            appointmentsList: "getAppointmentsList",
            appointmentsListFilter: "getAppointmentsListFilter",
            getModalStatus: "getModalStatus"
        }),

        getAppointmentsTotalPageCount() {
            return Math.ceil(this.filteredAppointmentsList.length / 10)
        },

        getPaginatedAppointmentsList() {
            return this.filteredAppointmentsList.slice((this.pageIndex * 10), ((this.pageIndex + 1) * 10))
        },


    },
}
</script>

<style scoped lang="scss">
.appointments-list-container {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 90%;
}
</style>
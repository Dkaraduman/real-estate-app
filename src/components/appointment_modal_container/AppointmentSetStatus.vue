<template>
    <div class="appointment-set-status-container">
    <NSelect
    v-model:value="selectedStatus"
    :options="getStatusFilteredListOptions"
    class="n-select-ui"
    placeholder="Status"

    

  />
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import moment from 'moment';
export default {
    data(){
        return {
            statusList: [

                {
                    label:'Cancelled',
                    value:'cancelled'
                },
                {
                    label:'Upcomming',
                    value:'upcomming'
                },

                {
                    label:'Completed',
                    value:'completed'
                }
            ],
            selectedStatus: ''

        }
    },

    computed: {
        ...mapGetters(["getAppointmentsObjectModel"]),

        getStatusFilteredListOptions(){
            const appointmentDay = this.getAppointmentsObjectModel['fields']['appointment_date'] || moment().format();
            const isAppointmentDateExpired = moment(appointmentDay).isBefore(moment().format());
            if(isAppointmentDateExpired) {
                return this.statusList.filter(status => status.value !== 'upcomming');
            }
            else {
                return this.statusList.filter(status => status.value !== 'completed');
            }

        }
    },

    methods: {
        ...mapMutations(["setAppointmentsObjectModel"]),
        addStatusToFilterAppointmentsList(value){
            if(value === 'cancelled') {
                this.setAppointmentsObjectModel({
                key: 'is_cancelled',    
                value:true
            })
            }
            else {
                this.setAppointmentsObjectModel({
                    key: 'is_cancelled',    
                    value:false
                })
            }

        }

    },

    watch: {
        selectedStatus(){
            this.addStatusToFilterAppointmentsList(this.selectedStatus)
        }
    },

    created() {
        if(this.getAppointmentsObjectModel['fields']['is_cancelled']) {
            this.selectedStatus = 'cancelled';
        }
        else {
            this.selectedStatus = this.getStatusFilteredListOptions.filter(status => status.value !== 'cancelled')[0].value;
        }

        
    }
}
</script>

<style scoped lang="scss">
.appointment-set-status-container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: max-content;
}
</style>
<template>
    <div class="appointment-status-list-container">
    <NSelect
    v-model:value="selectedStatus"
    :options="statusList"
    class="naive-ui-global-n-tree-selecter"
    

  />
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data(){
        return {
            statusList: [
                {
                    label:'All Statutes',
                    value:'all'
                },
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
            selectedStatus: 'all'

        }
    },

    computed: {
        ...mapGetters(["getAppointmentsListFilter"]),
    },

    methods: {
        addStatusToFilterAppointmentsList(value){
            this.$store.commit("setAppointmentsListFilter", {
                key:'selectedAppointmentStatuses',    
                value
            });
        }

    },

    watch: {
        selectedStatus(){
            this.addStatusToFilterAppointmentsList(this.selectedStatus)
        }
    },

    created() {
        if(this.getAppointmentsListFilter['selectedAppointmentStatuses']) {
            this.selectedStatus = this.getAppointmentsListFilter['selectedAppointmentStatuses'];
        }
    }
}
</script>

<style scoped lang="scss">
.appointment-status-list-container {
    width: 12%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    @media screen and (max-width: 480px) {
        width: 46%;
    }
}
</style>
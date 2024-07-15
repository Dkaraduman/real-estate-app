<template>
    <div class="date-picker-container"> 
        <div class="date-picker-container__from-date">
            <date-picker
              class=" date-picker-input"

              v-model="fromDate"
              type="date"
              placeholder="from Date"
              :minDate="new Date()"
              valueType="format"
              position="left"
              :auto-position="true"
            ></date-picker>
        </div>

        <div class="date-picker-container__to-date">


            <date-picker
              class="date-picker-input"

              v-model="toDate"
              :minDate="new Date()"
              type="date"
              placeholder="to Date"
              position="left"
              :auto-position="true"
              valueType="format"
            ></date-picker>
        </div>


    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {

    data(){
        return {
            fromDate: null,
            toDate: null
        }
    },

    computed: {
        ...mapGetters(['getAppointmentsListFilter'])
    },

    watch: {
        fromDate(date){
            this.addDateToFilterAppointmentsList('dateByFrom',date)
        },
        toDate(date){
            this.addDateToFilterAppointmentsList('dateByTo',date)
        }
    },

    methods: {
        addDateToFilterAppointmentsList(key,value){

            this.$store.commit("setAppointmentsListFilter", {
                key,
                value
            });

        }
    },
    created() {
        if(this.getAppointmentsListFilter['dateByFrom']) {
            this.fromDate = this.getAppointmentsListFilter['dateByFrom'];
        }
        if(this.getAppointmentsListFilter['dateByTo']) {
            this.toDate = this.getAppointmentsListFilter['dateByTo'];
        }
    }
}
</script>

<style scoped lang="scss">
.date-picker-container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    width: 28vw;
    height: 100%;



    &__from-date {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        width: 45%;

    }

    &__to-date {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        width: 45%;
    }

    & label {
        font-family: "Open Sans";
        font-style: normal;
        font-weight: 400;
        font-size: 1vw;
        color: #000000;
    }

    @media screen and (max-width: 480px) {
        width: 46%;
    }
}
</style>
<template>
    <div class="appointment-date-picker">
        <date-picker
              class=" date-picker-input-modal"

              v-model="selectedDate"
              type="date"
              placeholder="Date"
              valueType="format"
              position="left"
              
              :auto-position="true"
            ></date-picker>


    </div>
</template>

<script>
import moment from 'moment';
import { mapGetters, mapMutations } from "vuex";
export default {
data() {
    return {
        selectedDate: null
    }
},

computed: {
    ...mapGetters(["getAppointmentsObjectModel"]),

},


methods: {
    ...mapMutations(["setAppointmentsObjectModel"]),

    setSelectedDate() {
                    
        this.setAppointmentsObjectModel({
                key: 'appointment_date',
                value: this.selectedDate,      
            })
    }
},
watch: {
    selectedDate() {
        this.setSelectedDate()
    }
},
created() {

    this.selectedDate = this.getAppointmentsObjectModel['fields']['appointment_date'] || '';
}

}
</script>

<style scoped lang="scss">
    .appointment-date-picker {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: max-content;
        background: #ffffff00;
        padding:0 ;

 

    }
</style>
<template>
  <div class="appointment-control-buttons-container">
    <button @click="$emit('closeAppointmentModal')" class="appointment-control-buttons-container__exit-btn"
    :class="appointmentActionType === 'create' ? 'appointment-control-buttons-container__exit-btn--cancel' : 'appointment-control-buttons-container__exit-btn--close'"
    >
        {{ appointmentActionType === 'create' ? 'Cancel' : 'Close' }}
    </button>
    <button @click="$emit('setAppointment', appointmentActionType)"
        class="appointment-control-buttons-container__set-appointment-btn"
        :class="[appointmentActionType === 'create' ? 'appointment-control-buttons-container__set-appointment-btn--create' : 'appointment-control-buttons-container__set-appointment-btn--edit',
        getIsButtonActive ? '' : 'disabled']
        "
        >
        {{ appointmentActionType === 'create' ? 'Create' : 'Save' }}
    </button>

  </div>
</template>

<script>
import moment from 'moment';
import { mapGetters } from "vuex";
export default {
    emits: ["closeAppointmentModal", "setAppointment"],
    inject:{
        appointmentActionType: {
            default: 'create',
            type: String

        }
    },
    
    data() {
        return {
        isActionButtonActive: false      
        }
    },

    computed: {
        ...mapGetters(["getAppointmentsObjectModel"]),
        getIsButtonActive() {
            return this.isActionButtonActive
        }

    },

    watch: {
        getAppointmentsObjectModel:{
            deep: true,
            handler() {
              this.isActionButtonActive =  this.checkAppointmentActionTypActive()
            }
        }
    },

    methods: {
        checkFieldsIsFull(keys){
            const fields = keys.map(key =>{
                const typesHasLength = ['string','object'];
                if( typesHasLength.includes(typeof this.getAppointmentsObjectModel.fields[key])) {
                    if(key === 'appointment_date') {
                            return moment(this.getAppointmentsObjectModel.fields[key]).isValid() === true;
                    }
                    return this.getAppointmentsObjectModel.fields[key].length
                }
 
                else {
                    return this.getAppointmentsObjectModel.fields[key]
                }

            })
            return fields.filter(value => value).length === keys.length
        },
        checkAppointmentActionTypActive() {
            const requireFilledFieldCount = 10;
            const objectRequiredKeys = Object.keys(this.getAppointmentsObjectModel.fields).filter(key => key !== 'is_cancelled' && key !== 'appointment_id') || [];
            if(objectRequiredKeys.length !==  requireFilledFieldCount) {
                return false
            }
            return this.checkFieldsIsFull(objectRequiredKeys)

        }
    }

}
</script>

<style scoped lang="scss">
.disabled {
    pointer-events: none;
    opacity: .3;
}
.appointment-control-buttons-container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: max-content;
    gap: 1em;
    z-index: 9;
    margin-top: auto;
    margin-bottom: 2vh;



    & button:hover {
        opacity: .8;
        cursor: pointer;
    }
      
    
    &__exit-btn {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        width: max-content;
        height: max-content;
        box-sizing: border-box;
        padding: .5em 1em;

        &--cancel {
            border: 0;
            background: #0F0F0F;
            color: #fff;
            border-radius: 4px;
            border: 1px solid #0F0F0F;
        }

        &--close {
            background: #fff;
            color: #000;
            border: 1px solid #0F0F0F;
            border-radius: 8px;
        }
    }

    &__set-appointment-btn {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        width: max-content;
        height: max-content;
        box-sizing: border-box;
        padding: .5em 1em;
        border:0;
        background: #EC1E80;
        color: #fff;
        border:1px solid #EC1E80;


        &--create {
            border-radius: 4px;
        }

        &--edit {
            border-radius: 8px;
        }
    }
}
</style>
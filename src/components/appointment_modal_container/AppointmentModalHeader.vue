<template>
  <div class="appointment-modal-header">
    <i class="fa-solid fa-calendar-plus"></i>
    <h3>{{ appointmentActionType === 'create' ? createTitle : editTitle }}</h3>
  </div>
</template>

<script>
export default {
    inject:{
        appointmentActionType: {
            default: 'create',
            type: String

        }
    },
    data() {
        return {
            createTitle:'Create an Appointment',
            editTitle:'Edit the Appointment'
        }
    }

}
</script>

<style scoped lang="scss">
.appointment-modal-header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: max-content;
    gap: .6em;
    color:#3D3E3E;

    & h3 {
        font-weight: 550;
        font-size: .9vw;

    }
    
    & i {
        font-size: 1.4vw;
    }
}
</style>
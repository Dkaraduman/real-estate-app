<template>
    <div class="appointments-list-header">
        <p> <strong>{{ appointmentsCounts }} Appointments Found. </strong></p>
        <button @click="$emit('createAppointment')"><i class="fa-solid fa-circle-plus"></i> Create Appointment</button>
    </div>
</template>

<script>

export default {
    emits: ["createAppointment"],
    props:{
        appointmentsCounts: {
            type: Number,
            default: 0
        }
    }
}
</script>

<style scoped lang="scss">
.appointments-list-header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 12%;
    border-bottom: 1px solid #DEDEDE;


    & p {
    font-size: 1vw;
    color: #525252;
    font-weight: bolder;
    }
    & button {
        width:max-content;
        height: max-content;
        font-size: 1vw;
        padding: .7em 2em;
        color: #ffffff;
        border: 0;
        border-radius: 6px;
        font-weight: 500;
        background: #EC1E80;
        cursor: pointer;

        & i {
            margin-right: .5em;

        }

        &:hover {
            opacity: .8;
        }
    }

}
</style>
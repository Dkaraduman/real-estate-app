<template>
  <div class="appointments-list-cards-container">
    <AppointmentsListCard v-for="(appointmentsInfo) in appointmentsList" :key="appointmentsInfo?.id" :appointmentsInfo="appointmentsInfo" />
  </div>
</template>

<script>
import AppointmentsListCard from "./AppointmentsListCard.vue";

export default {
    components: {
        AppointmentsListCard
    },
    props: {
        appointmentsList: {
            type: Array,
            required: true,
            default: () => {
                return []
            }
        }
    },

    




}
</script>

<style scoped lang="scss">
.appointments-list-cards-container {
    display: flex;
    flex-flow: column nowrap;
    justify-content:flex-start;
    gap: .6em;
    align-items: flex-start;
    width: 100%;
    height: 78%;
    overflow: auto;
    padding: 1em 0 ;
}
</style>
<template>
<nav class="navbar-app-container">
    <AgentsList :useInNavbar="true" />
    <AppointmentStatus />
    <DatePicker />
    <NavbarSearch />
</nav>
</template>

<script>
import AgentsList from "@/utils/AgentsList.vue";
import DatePicker from "./DatePicker.vue";
import NavbarSearch from "./NavbarSearch.vue";
import AppointmentStatus from "./AppointmentStatus.vue";
export default {
    components: {
        AgentsList,
        DatePicker,
        NavbarSearch,
        AppointmentStatus
    }

}
</script>

<style scoped lang="scss">
.navbar-app-container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    height: max-content;
    width: 100%;
    height: 10%;
    gap: 2vw;
    background: #FFFFFF;
    border-bottom:2px solid #E5E5E5;

    @media screen and (max-width: 480px) {
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: center;
        height: max-content;
        width: 100%;
        gap: 1em;

    }
}
</style>
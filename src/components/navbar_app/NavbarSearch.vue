<template>
  <div class="navbar-search-container">
    <input v-model="searchValue" type="text" placeholder="search...">
    <button @click="setSearchValueToFilterAppointmentsList"><i class="fa-solid fa-magnifying-glass"></i></button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data(){
        return {
            searchValue:''
        }
    },

    methods: {
        setSearchValueToFilterAppointmentsList(){
            this.$store.commit("setAppointmentsListFilter", {
                key:'searchBoxText',
                value:this.searchValue
            });        }
    },

    computed: {
        ...mapGetters(['getAppointmentsListFilter'])
    },
    created() {
        this.searchValue = this.getAppointmentsListFilter['searchBoxText'];
    }
}
</script>

<style scoped lang="scss">
.navbar-search-container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: center;
    gap: 0;
    width: 25vw;
    height: 100%;
    margin-left: auto;

    & input {
        width: 20vw;
        height: max-content;
        border: none;
        outline: 0;
        padding: .8em .3em;
        border-top-left-radius: 12px;
        border-bottom-left-radius: 12px;
        border: 1px solid #DADADA;
        border-right: 0;
        text-align: center;
        font-size: .8vw;

        &:focus {
            outline:.5px solid #dfeeff;
        }

        &::placeholder {
            color: #838383;
        }
    }

    & button {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        padding:  .9em;
        font-size: .9vw;
        height: max-content;
        border:0;
        background-color: black;
        color: #fff;
        border-left: none;
        border-top-right-radius: 12px;
        border-bottom-right-radius: 12px;
        cursor: pointer;

        &:hover {
            opacity: .8;
        }
    }

    @media screen and (max-width: 480px) {
        width: 46%;
    }
}
</style>
<template>
    <div class="appointment-set-adress-container">
        <input type="text" v-model="adress" placeholder="Adress">
        <div class="appointment-set-adress-container__icon">
            <i class="fa-solid fa-home"></i>
        </div>
    </div>
</template>

<script>
import { mapGetters,mapMutations } from "vuex";
export default {
    data() {
        return {
            adress: ''
        }
    },
    methods: {
        ...mapMutations(["setAppointmentsObjectModel"]),
        setAdress() {
            this.setAppointmentsObjectModel({
                key: 'appointment_address',
                value: this.adress
            })
        }
    },
    computed: {
        ...mapGetters(["getAppointmentsObjectModel"])
    },
    watch: {
        adress() {
            this.setAdress()
        }
    },
    created() {
        if(this.getAppointmentsObjectModel['fields']['appointment_address']) {
            this.adress = this.getAppointmentsObjectModel['fields']['appointment_address'] || '';
        }
    }
}
</script>

<style scoped lang="scss">
    .appointment-set-adress-container {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: max-content;
        color:#5d5d5d;
        border:1px solid #DEDEDE;
        background: #fff;
        border-radius: 6px;
        padding: 1em 0;

        & input {
            width: 95%;
            height: 100%;
            font-size: .8vw;
            border: none;
            outline: none;
            padding: 0;
            padding-left: .7em;

            &::placeholder {
                color: #c4c4c4;
            }

           
        }


        &__icon {
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;
            align-items: center;
            width: 5.5%;
            height: max-content;
            font-size: 1vw;
            color: #747474;

            
        }
    }
</style>
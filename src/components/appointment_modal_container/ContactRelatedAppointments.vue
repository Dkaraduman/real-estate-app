<template>
    <div class="contact-related-appointments-container">
        <h4>Related Appointments:</h4>
        <div class="contact-related-appointments-container__appointments">
            <div class="contact-related-appointments-container__appointments__card" v-for="appointment in contactRelatedAppointments" :key="appointment.id">
                <div class="contact-related-appointments-container__appointments__card__info">
            <div class="contact-related-appointments-container__appointments__card__info__adress">
            <div class="contact-related-appointments-container__appointments__card__info__adress__wrapper">
            <i class="fa-solid fa-home"></i>
            <p class="contact-related-appointments-container__appointments__card__info__adress__text"> {{ appointment?.fields?.appointment_address || "No Adress" }}</p>
            </div>
        </div>

        <div class="contact-related-appointments-container__appointments__card__info__status">
            <div class="contact-related-appointments-container__appointments__card__info__status__wrapper">
                <div class="contact-related-appointments-container__appointments__card__info__status__wrapper__status-box" v-html="getAppointmentStatus(appointment?.fields?.appointment_date,appointment?.fields?.is_cancelled)"></div>
                <div class="contact-related-appointments-container__appointments__card__info__status__wrapper__status-date">
                      <i class="fa-solid fa-clock"></i> <span> {{ getConvertedDate(appointment?.fields?.appointment_date) || "No Date" }} </span>
                </div>
            </div>
        </div>
                </div>

                <div class="contact-related-appointments-container__appointments__card__agents">
                    <div class="appointments-list-card-container__agents">
            <AgentsList  v-if=" (appointment?.fields?.agent_id || []).length !== 0" :useInAppointmentsTable="true" :appointmentIds="appointment.fields.agent_id" />
            <div class="appointments-list-card-container__agents__warning-message" v-else>
                <span>No Agents Found</span>
            </div>
        </div>
                </div>

            </div>
    </div>

    </div>

</template>

<script>
import { mapGetters } from "vuex";
import moment from 'moment'
import AgentsList from '@/utils/AgentsList.vue'
export default {
    components: {
        AgentsList
    },
    data(){
        return {
            contactRelatedAppointments: [],
            cancelledColor: "#FC6B5C",
            completedColor: "#AECC81",
            upcomingColor: "#EFBD84"

        }   
    },
    watch: {
        getAppointmentsObjectModel:{
            deep: true,
            handler() {
                this.setContactRelatedAppointments();
            }
        }
    },
    methods: {
        setContactRelatedAppointments() {
            this.contactRelatedAppointments = this.getAppointmentsList.filter(appointment => appointment?.fields?.contact_id[0] === this.getAppointmentsObjectModel?.fields?.contact_id[0])
        },
        getConvertedDate(date) {
            return moment(date).format("DD/MM/YYYY");
        },
        getAppointmentStatus(appointmentDate, isCancelled) {
            const divStatus = document.createElement('div');

            if(isCancelled) {
                divStatus.style.color = this.cancelledColor;
                divStatus.innerHTML = "Cancelled";
                
            }
            else {
                const date = moment();
                const appointmentDateMoment = moment(appointmentDate);

            if(date.isBefore(appointmentDateMoment)) {
                const diff = appointmentDateMoment.diff(date, 'days');
                divStatus.innerHTML = "Upcoming" + `<span color:"#9A9A9A" style="margin-left: .5em">${diff } days </span>`;
                divStatus.style.color = this.upcomingColor;
            }
            else {
                divStatus.innerHTML = "Completed";
                divStatus.style.color = this.completedColor;
            }
            }
      

            return divStatus.outerHTML;


        },
    },
    computed:{
        ...mapGetters(["getAppointmentsObjectModel","getAppointmentsList"]),
    },
    created(){
        this.setContactRelatedAppointments();
    }

}
</script>

<style scoped lang="scss">

.contact-related-appointments-container {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 25vh;

    gap: 0;

    & h4 {
        font-size: .9vw;
        color: #6C6D6D;
        font-weight: 600;
        margin-bottom: .5em;
    }

&__appointments {
    display: flex;
    flex-flow:column nowrap;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    overflow: auto;
    border: 1px solid #E4E4E4;
    padding: 1em 0;
    gap: 1em;
    height: 100%;

    &__card {
        display: flex;
        flex-flow:row nowrap;
        justify-content: space-between;
        align-items: center;
        width: 90%;
        height: max-content;
        padding: .5em 1em;
        border-radius: 12px;
        background: #fff;
        border: 1px solid #E6E6E6;
        transition: .1s all ease-in-out;

        &:hover {
            opacity: .8;
            cursor: pointer;
        }

        &__agents {
        flex-basis: 40%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        gap: 1em;
        font-size: .75vw;
        color: #494a4a;
        font-weight: 600;
        height: 100%;
    }

        &__info {
            display: flex;
        flex-flow: column nowrap;
        height: 100%;
        justify-content: center;
        align-items: center;
        flex-basis: 55%;
        gap: .5em;
        font-size: .75vw;
        color: #707070;
        font-weight: 600;
        // padding-bottom: 1em;

        & div {
            display: flex;
            width: 100%;
            height: max-content;
            flex-flow: row nowrap;
            justify-content:flex-start;
            align-items: center;
            gap: 2em;

            i {
                width:20%;
                text-align: end;
            }
            span {
                width: auto;
            }
        }

        &__name  span {

            font-weight: 800;
            color: #494a4a;
        }

        &__adress {
        flex-basis: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        gap: 1em;
        font-size: .75vw;
        color: #494a4a;
        font-weight: 600;

        &__wrapper {
            display: flex;
            width: 100%;
            flex-flow: row nowrap;
            justify-content: flex-start;
            align-items: center;
            gap: 1em;

            & i {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: .9vw;
            }
            &__text {
                width: 80%;
            }
        }
    }

    &__status {
        flex-basis: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        height: 100%;
        

        &__wrapper {
            display: flex;
            background: #EC1E80;
            color: #fff;
            width: 100%;
            height: 80%;
            border-radius: 6px;
            flex-flow: row nowrap;
            justify-content: flex-start;
            align-items: center;
            font-size: .7vw;
            padding: .5em;

            &__status-box {
                display: flex;
                flex-flow: column nowrap;
                justify-content: center;
                align-items: center;
                height: 80%;
                background: #fff;
                border-radius: 6px;
                padding:  .5em;
                font-weight: 600 !important;
                flex-basis: content;
                
            }

            &__status-date {
                flex-basis: content;
                display: flex;
                flex-flow: row nowrap;
                justify-content: flex-start;
                gap: .5em;
                align-items: center;
                height: 90%;
                background: transparent;
                font-weight: 500 !important;


            }
        }

    
        }


        
    }



    }
}
}

</style>
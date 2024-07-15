<template>
    <div class="appointments-list-card-container" @click="setAppointmentEditModal(appointmentsInfo)" :style="{'background-color': indexCard % 2 === 0 ? '#F0F5F5' : '#FFFFFF'}" v-if="Object.keys(appointmentsInfo).length">
        <div class="appointments-list-card-container__info">
            <div class="appointments-list-card-container__info__name">
              <i class="fa-solid fa-user"></i>  <span>{{ appointmentsInfo?.fields?.contact_name[0] + " " + appointmentsInfo?.fields?.contact_surname[0] || "No Name" }} </span>
            </div>
            <div>
               <i class="fa-solid fa-envelope"></i>  <span>{{ appointmentsInfo?.fields?.contact_email[0] || "No Email" }}</span>
            </div>
            <div>
               <i class="fa-solid fa-phone"></i> <span>{{ appointmentsInfo?.fields?.contact_phone[0] || "No Phone" }}</span>
            </div>
        </div>

        <div class="appointments-list-card-container__adress">
            <div class="appointments-list-card-container__adress__wrapper">
            <i class="fa-solid fa-home"></i>
            <p class="appointments-list-card-container__adress__text"> {{ appointmentsInfo?.fields?.appointment_address || "No Adress" }}</p>
            </div>
        </div>

        <div class="appointments-list-card-container__status">
            <div class="appointments-list-card-container__status__wrapper">
                <div class="appointments-list-card-container__status__wrapper__status-box" v-html="getAppointmentStatus(appointmentsInfo?.fields?.appointment_date,appointmentsInfo?.fields?.is_cancelled)"></div>
                <div class="appointments-list-card-container__status__wrapper__status-date">
                      <i class="fa-solid fa-clock"></i> <span> {{ getConvertedDate(appointmentsInfo?.fields?.appointment_date) || "No Date" }} </span>
                </div>
            </div>
        </div>

        <div class="appointments-list-card-container__agents">
            <AgentsList  v-if=" (appointmentsInfo?.fields?.agent_id || []).length !== 0" :useInAppointmentsTable="true" :appointmentIds="appointmentsInfo.fields.agent_id" />
            <div class="appointments-list-card-container__agents__warning-message" v-else>
                <span>No Agents Found</span>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import AgentsList from '@/utils/AgentsList.vue'
export default {
    components: {
        AgentsList
    },
    props: {
        appointmentsInfo: {
            type: Object,
            required: true,
            default: () => {
                return {}
            }
        },
        indexCard: {
            type: Number,
            required: true,
            default: 0
        }
    },
    data() {
        return {
            cancelledColor: "#FC6B5C",
            completedColor: "#AECC81",
            upcomingColor: "#EFBD84"
        }
    },

    methods: {

        setAppointmentEditModal(appointmentsInfo) {
            this.$store.commit("setSelectedAppointmentEditInfo", appointmentsInfo)
            this.$store.commit("setAppointmentModalType", "edit")
            this.$store.commit("setIsAppGeneralModalOpen", true);
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




        }
    }

}
</script>

<style scoped lang="scss">
.appointments-list-card-container {
    display: flex;
    flex-flow:row wrap;
    justify-content: space-between;
    align-items: center;
    width: 99.5%;
    height: max-content;
    // padding: 1em .5em;
    border: 1px solid #E4E4E4;
    box-sizing: border-box;
    border-radius: 6px;
    padding: .5em 0;
    transition: all .1s ease-in-out;

    &:hover {
        opacity: .8;
        cursor: pointer;
    }


    &__info {
        display: flex;
        flex-flow: column nowrap;
        height: 100%;
        justify-content: center;
        align-items: center;
        flex-basis: 25%;
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


        
    }

    &__adress {
        flex-basis: 25%;
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
                width: 20%;
                text-align: end;
                font-size: .9vw;
            }
            &__text {
                width: 80%;
            }
        }
    }

    &__status {
        flex-basis: 25%;
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
            justify-content: space-around;
            align-items: center;
            font-size: .8vw;
            padding: .5em;

            &__status-box {
                display: flex;
                flex-flow: column nowrap;
                justify-content: center;
                align-items: center;
                height: 80%;
                background: #fff;
                border-radius: 6px;
                padding: 0 .5em;
                font-weight: 650 !important;


                width: 50%;
            }

            &__status-date {
                width: 40%;
                display: flex;
                flex-flow: row nowrap;
                justify-content: center;
                gap: 1em;
                align-items: center;
                height: 90%;
                background: transparent;
                font-weight: 500 !important;


            }
        }

    }

    &__agents {
        flex-basis: 25%;
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
}
</style>
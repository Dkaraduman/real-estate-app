<template>
    <div class="agents-list-container">
        <div class="agents-list-container__first-five-agents-container">
            <div class="agents-list-container__first-five-agents-container__info-out-circle"
            :style="{left:-(.5 + index*.5) + 'vw'  }"
            :class="{activeted: isAgentSelected(agent?.id) && useInNavbar }"
             v-for="(agent,index) in firstFiveAgents" :key="agent?.id">
                <div class="agents-list-container__first-five-agents-container__info-in-circle"
            :style="{'background-color': agent?.fields?.color || 'transparent'}"
            @click="addAgentToFilterAppointmentsList(agent?.id)"
             >
                {{ getAgentShortFullName(agent) }}
            </div>
            </div>

        </div>

        <div class="agents-list-container__other-agents-container" v-if="getModifiedOtherAgentsList.length">
            <NPopselect  @update:value="addAgentToFilterAppointmentsList($event)"  :options="getModifiedOtherAgentsList">
                <div class="agents-list-container__other-agents-container__other-agents-out-circle">

                    <div class="agents-list-container__other-agents-container__other-agents-circle">
                        <i class="fa-solid fa-plus"></i> <span >{{ getModifiedOtherAgentsList.length }}</span>
                    </div>

                </div>
             </NPopselect>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex"; 
export default {
 props: {
     appointmentIds:{
         type: Array,
         required: false,
         default: () => []
     },
     useInAppointmentsTable: {
         type: Boolean,
         default: false
     },
     useInNavbar: {
         type: Boolean,
         default: false
     }
 },   
data(){
    return {    
        firstFiveAgents: [],
        otherAgents: [],
        selectedAgents: [],
    }
},   
computed: {
    ...mapGetters(["getAgentsList",'getAppointmentsListFilter']),
    getModifiedOtherAgentsList() {
        return this.modifyAgentsListToShowInList(this.otherAgents);
    }
},
methods: {
    isAgentSelected(agentId = '') {
        return this.selectedAgents.includes(agentId)
    },
    removeAgentFromFilterAppointmentsList(agentId = '') {
        if(!agentId) return;
        this.selectedAgents = this.selectedAgents.filter(agent => agent !== agentId)
    },
    getListFilterByAppointmentId() {
        return this.getAgentsList.filter(filter => this.appointmentIds.includes(filter.id) )
    },
    addAgentToFilterAppointmentsList(agentId = '') {
        if(!agentId) return;
        if(this.selectedAgents.includes(agentId)) {
            this.removeAgentFromFilterAppointmentsList(agentId);
            return;
        }
        this.selectedAgents.push(agentId)
    },
    getAgentShortFullName(agent) {
        if(!agent) return '';
        return agent?.fields?.agent_name.slice(0, 1) + agent?.fields?.agent_surname.slice(0, 1);
    },
    modifyAgentsListToShowInList(list) {
        return list.map(agent => {
            return {
                value: agent?.id || '',
                label: (agent?.fields?.agent_name + ' ' + agent?.fields?.agent_surname) || ''
            }
        });
    }
},
watch: {
    selectedAgents:{
        deep: true,
        handler() {
            if(!this.useInNavbar) return;
            const agentFilter = {
                key:'selectedAgentsIds',
                value:this.selectedAgents
            }
            this.$store.commit("setAppointmentsListFilter", agentFilter);
        }
    }
},
created() {
    const agencyList = this.appointmentIds.length && this.useInAppointmentsTable ? this.getListFilterByAppointmentId() : this.getAgentsList; 

    this.firstFiveAgents = agencyList.slice(0, 5);
    this.otherAgents = agencyList.slice(5, agencyList.length);
    if(this.getAppointmentsListFilter['selectedAgentsIds'].length) {
        this.selectedAgents = this.getAppointmentsListFilter['selectedAgentsIds'];
    }

},
}
</script>

<style scoped lang="scss">

    .activeted {
        scale: 1.2;
        box-shadow: 1px 1px 5px #00000091;
    }
    .agents-list-container {
        display: flex;
        flex-flow:row wrap;
        justify-content: flex-start;
        gap: 0;
        align-items: center;
        flex-basis:  content;
        position: relative;
        z-index:0;

        &__first-five-agents-container {
            display: flex;
            flex-flow:row wrap;
            justify-content: flex-start;
            position: relative;
            align-items: center;
            flex-basis: content;



            &__info-out-circle {
                width: 2.5vw;
                height: 2.5vw;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                background: #ffffff ;
                cursor: pointer;


                

            }

            &__info-in-circle {
                width: 75%;
                height: 75%;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                color: white;
                font-weight: 550;
                font-size: .8vw;
                padding: .1em .2em;
                cursor: pointer;
                &:hover {
                    opacity: .8;
                }
            }

          
        }

        &__other-agents-container {
            display: flex;
            flex-flow:row wrap;
            justify-content: space-between;
            align-items: center;
            position: relative;
            flex-basis: content;
            left: -3vw;
            
            


            &__other-agents-out-circle {
                width: 2.5vw;
                height: 2.5vw;
                z-index: 99;
               
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                background: #ffffff;
                cursor: pointer;


                
            }

            &__other-agents-circle {
                width: 75%;
                height: 75%;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                background-color: #F0F5F5;
                color: #6F7070;
                font-weight: 700;
                font-size: .8vw;
                border: .5px solid #E9EAEA;
                padding: .05em .1em;

                & span {
                    margin-left: .2vw;
                }
                & i {
                    font-size: .6vw;
                }

                &:hover {
                    opacity: .8;
                }

            }
        }

    }
</style>
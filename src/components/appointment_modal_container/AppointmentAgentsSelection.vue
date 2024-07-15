<template>
    <div class="appointment-agents-container">
        <NSelect
        :options="getModifedAgentsList"
        @update:value="onSetAgentIds($event)"
        v-model:value="selectedAgentsIds"
        :max-tag-count="1"
        class="n-select-ui"
        clearable
        filterable
        multiple
        placeholder="Agent"

        />
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
    
    inject:{
        appointmentActionType: {
            default: 'create',
            type: String
        }
    },

    data(){
        return {
            selectedAgentsIds: []
        }
    },

    created() {

        if(this.getAppointmentsObjectModel['fields']['agent_id'].length) {
            this.selectedAgentsIds = this.getAppointmentsObjectModel['fields']['agent_id'];
        }
    },

    methods: {
        onSetAgentIds(agent_ids) {
            const selectedAgentsIds = this.getAgentsList.filter((agent) => {
                return agent_ids.includes(agent.id)
            })
            const ids = [];
            const names = [];
            const surnames = [];

            selectedAgentsIds.forEach((agent) => {
                ids.push(agent.id)
                names.push(agent.fields?.agent_name)
                surnames.push(agent.fields?.agent_surname)
            })

            this.setAppointmentsObjectModel({
                key: 'agent_id',
                value: ids
            })

            this.setAppointmentsObjectModel({
                key: 'agent_name',
                value: names
            })

            this.setAppointmentsObjectModel({
                key: 'agent_surname',
                value: surnames
            })

        },
        ...mapMutations(['setAppointmentsObjectModel'])
    },
    computed: {
        ...mapGetters(["getAgentsList",'getAppointmentsObjectModel']),
        getModifedAgentsList() {

            return this.getAgentsList.map((agent) => {
                return {
                    value: agent.id,
                    label: agent.fields?.agent_name + ' ' + agent.fields?.agent_surname
                }
            })
        }
    }
}
</script>

<style scoped lang="scss">
    .appointment-agents-container {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: max-content;
    }
</style>
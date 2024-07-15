<template>
    <div class="appointment-contact-search-box">
        <NSelect
        :options="getModifedContactsList"
        @update:value="onSetContactId($event)"
        class="n-select-ui"
        clearable
        filterable
        placeholder="Search"
        v-if="!selectedContact"
        />
            <div class="appointment-contact-search-box__info" v-else>
            <div class="appointment-contact-search-box__info__name">
              <i class="fa-solid fa-user"></i>  <span>{{ selectedContact?.fields?.contact_name + " " + selectedContact?.fields?.contact_surname || "No Name" }} </span>
            </div>
            <div>
               <i class="fa-solid fa-envelope"></i>  <span>{{ selectedContact?.fields?.contact_email || "No Email" }}</span>
            </div>
            <div>
               <i class="fa-solid fa-phone"></i> <span>{{ selectedContact?.fields?.contact_phone || "No Phone" }}</span>
            </div>

            <div class="appointment-contact-search-box__info__exit" @click="onSetContactId(null)">
                <i class="fa-solid fa-xmark" ></i>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters,mapMutations } from "vuex";
export default {
    inject:{
        appointmentActionType: {
            default: 'create',
            type: String
        }
    },
    data() {
        return {
            selectedContact: null        
        }
    },

    created() {
        this.selectedContact = this.getAppointmentsObjectModel['fields']['contact_id'].length ? this.getContactsList.find(contact => contact.id === this.getAppointmentsObjectModel['fields']['contact_id'][0]) : null;
    },
    methods: {
        ...mapMutations(["setAppointmentsObjectModel"]),
        onSetContactId(contactId) {
            const contact = this.getContactsList.find(contact => contact.id === contactId);

            if(!contact) {
                this.selectedContact = null;
                return;
            }

            this.selectedContact = contact;
            
            this.setAppointmentsObjectModel({
                key: 'contact_id',
                value: [contact?.id],      
            })
            this.setAppointmentsObjectModel({
                key: 'contact_name',
                value: [contact?.fields?.contact_name],      
            })
            this.setAppointmentsObjectModel({
                key: 'contact_surname',
                value: [contact?.fields?.contact_surname],      
            })
            this.setAppointmentsObjectModel({
                key: 'contact_email',
                value: [contact?.fields?.contact_email],      
            })
            this.setAppointmentsObjectModel({
                key: 'contact_phone',
                value: [contact?.fields?.contact_phone],      
            })
            
        }
    },
    computed: {
        ...mapGetters(["getContactsList","getAppointmentsObjectModel"]),
        getModifedContactsList() {

            return this.getContactsList.map((contact) => {
                return {
                    value: contact.id,
                    label: contact.fields?.contact_name + ' ' + contact.fields?.contact_surname
                }
            })
        }
    }
}
</script>

<style scoped lang="scss">
    .appointment-contact-search-box {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: max-content;

        &__info {
        display: flex;
        position: relative;
        flex-flow: column nowrap;
        height: 100%;
        justify-content: center;
        align-items: flex-start;
        width: 100%;
        gap: .5em;
        font-size: .75vw;
        color: #707070;
        font-weight: 600;
        border: 1px solid #E4E4E4;
        border-radius: 12px;
        background: #fff;
        padding: 1em 2em;

        &__exit {
            position: absolute;
            top: 4%;
            right: 2%;
            width: max-content !important;
            height: max-content;
            border:0;
            display: flex;
            font-size: 1.2vw;
            font-weight: 700 !important;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: all .1s ease-in-out;
            &:hover {
                opacity: .8;
            }
        }

        & div {
            display: flex;
            width: 100%;
            height: max-content;
            flex-flow: row nowrap;
            justify-content:flex-start;
            align-items: center;
            gap: 1em;

    
        }

        &__name  span {

            font-weight: 800;
            color: #494a4a;
        }


        
    }
    }


</style>
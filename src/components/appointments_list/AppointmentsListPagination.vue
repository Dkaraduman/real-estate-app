<template>
  <div class="appointments-list-pagination">
    <div class="quiz-list-pagination-container" v-show="getFilteredAppointmentsCount > 10 ">
    <n-space vertical>
    <n-pagination v-model:page="pagePaginateIndex" @update:page="changePaginateIndex($event)" :page-count="getAppointmentsTotalPageCount"   size="medium"  />
   
  </n-space>
  </div>
  </div>
</template>

<script>
export default {
    emits: ["changePaginateIndex"],
    props: {
        getFilteredAppointmentsCount: {
            type: Number,
            required: true
        },
        getAppointmentsTotalPageCount: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            pagePaginateIndex: 1
        }
    },
    methods: {
        changePaginateIndex(index) {
            this.$emit("changePaginateIndex", index-1)
        }
    }
}
</script>

<style scoped lang="scss">
.appointments-list-pagination {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 10%;
    border-top: 1px solid #DEDEDE;
}
</style>
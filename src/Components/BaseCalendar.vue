<template>
    <div>
        <el-calendar v-model="value"></el-calendar>
        {{ emitSetDay() }}
    </div>
</template>

<script>
export default {
    name: "BaseCalender",
    data() {
        return {
            value: new Date(),
        };
    },
    computed: {
        selectedDate() {
            return this.value;
        },
    },
    methods: {
        emitSetDay() {
            this.$emit("setDay", this.selectedDate);
        },
    },
};
</script>

<style scoped></style>

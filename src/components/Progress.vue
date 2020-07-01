<template>
    <div class="progress-wrapper">
        <v-progress-circular size="128" width="8" color="accent" indeterminate></v-progress-circular>
    </div>
</template>

<script>
export default {
    name: 'Progress'
};
</script>

<style scoped>
    .progress-wrapper {
        width: 100%;
        margin-top: 40px;
        display: flex;
        justify-content: center;
    }
</style>
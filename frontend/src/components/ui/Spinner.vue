<template>
    <div class="screen-loader">
        <v-progress-circular
            color="primary"
            indeterminate
            size="90"
            width="9"
        />
    </div>
</template>

<script>
/**
 * Spinner page loader component
 */
export default {
    name: 'Spinner',
};
</script>

<style lang="scss" scoped>
    .screen-loader {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        z-index: 1;
        height: 100%;
        background: #fffd; // #21212175

        .v-progress-circular {
            top: calc(50vh - 45px);
            left: calc(50% - 45px);
        }
    }

    .theme--dark .screen-loader {
        background: #252525dd;
    }
</style>

<template>
    <v-tooltip
        :open-delay="openDelay"
        :bottom="position === 'bottom'"
        :left="position === 'left'"
        :right="position === 'right'"
        :top="position === 'top'"
        max-width="300"
    >
        <slot slot="activator" />
        <span v-html="text" />
    </v-tooltip>
</template>

<script>
/**
 * v-tooltip wrapper component
 */
export default {
    name: 'Tooltip',
    props: {
        /**
         * Delay (in ms) after which menu opens
         */
        openDelay: {
            type: Number,
            required: false,
            default: 1500,
        },
        /**
         * Tooltip position
         */
        position: {
            type: String,
            required: false,
            default: 'top',
        },
        /**
         * Tooltip text
         */
        text: {
            type: String,
            required: true,
        },
    },
};
</script>

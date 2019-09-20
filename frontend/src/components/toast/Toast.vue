<template>
    <v-snackbar
        v-model="visible"
        :auto-height="autoHeight"
        :bottom="y === 'bottom'"
        class="application"
        :color="color"
        :left="x === 'left'"
        :multi-line="multiLine"
        :right="x === 'right'"
        :timeout="timeout"
        :top="y === 'top'"
        :vertical="vertical"
        @click="dismiss"
    >
        <v-icon
            v-if="!!icon"
            class="mr-0"
            dark
            left
        >
            {{ icon }}
        </v-icon>
        <div v-if="title" class="title text-xs-center ml-2">
            {{ title }}
        </div>
        <div class="message" :class="[title ? 'ml-3' : 'ml-2']" v-html="message" />
    </v-snackbar>
</template>

<script>
export default {
    name: '',
    props: {
        /**
         * Makes notification height dynamic
         */
        autoHeight: {
            type: Boolean,
            default: false,
        },
        /**
         * Defines whether notification is closable
         */
        closable: {
            type: Boolean,
            default: true,
        },
        /**
         * Notification color
         */
        color: {
            type: String,
            required: false,
            default: 'info',
        },
        /**
         * Notification icon
         */
        icon: {
            type: String,
            required: false,
            default: null,
        },
        /**
         * Notification message
         */
        message: {
            type: String,
            required: false,
            default: null,
        },
        /**
         * Makes notification higher (mobile)
         */
        multiLine: {
            type: Boolean,
            default: false,
        },
        /**
         * Time (in milliseconds) to wait until notification is automatically hidden
         */
        timeout: {
            type: Number,
            required: false,
            default: 4000,
        },
        /**
         * Notification title
         */
        title: {
            type: String,
            required: false,
            default: null,
        },
        /**
         * Stacks notification content vertically (mobile)
         */
        vertical: {
            type: Boolean,
            default: false,
        },
        /**
         * Horizontal direction position
         */
        x: {
            type: String,
            required: false,
            default: 'right',
        },
        /**
         * Vertical direction position
         */
        y: {
            type: String,
            required: false,
            default: 'bottom',
        },
    },
    data() {
        return {
            /**
             * Defines whether to show notification
             */
            visible: false,
        };
    },
    mounted() {
        this.$nextTick(() => this.show());
    },
    methods: {
        /**
         * Show notification
         */
        show() {
            this.visible = true;
        },
        /**
         * Close notification
         */
        close() {
            this.visible = false;
        },
        /**
         * Dismiss notification
         */
        dismiss() {
            if (this.closable) {
                this.close();
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .v-snack {
        z-index: 1502;
    }

    .title {
        font-size: 17px !important;
    }
</style>

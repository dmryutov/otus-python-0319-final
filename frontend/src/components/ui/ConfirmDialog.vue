<template>
    <v-dialog
        v-model="visible"
        :max-width="options.width"
        :style="{zIndex: options.zIndex}"
        @keydown.esc="cancel"
    >
        <v-card>
            <v-toolbar
                v-if="title"
                dark
                :color="options.color"
                dense
                flat
            >
                <v-toolbar-title class="white--text">
                    <v-icon>mdi-alert</v-icon>{{ title }}
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text v-show="message">
                {{ message }}
            </v-card-text>
            <v-card-actions class="pt-0">
                <v-spacer />
                <v-btn
                    color="primary darken-1"
                    flat="flat"
                    @click.native="onConfirm"
                >
                    Yes
                </v-btn>
                <v-btn
                    color="grey"
                    flat="flat"
                    @click.native="onCancel"
                >
                    Cancel
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
/**
 * Vuetify Confirm Dialog component
 *
 * Insert component where you want to use it:
 * ```
 * <confirm ref="confirm"></confirm>
 * ```
 *
 * Call it:
 * ```
 * this.$refs.confirm.open('Delete', 'Are you sure?', { color: 'red' }).then((confirm) => {})
 * ```
 *
 * Or use await:
 * ```
 * if (await this.$refs.confirm.open('Delete', 'Are you sure?', { color: 'red' })) {
 *   // yes
 * }
 * else {
 *   // cancel
 * }
 * ```
 *
 * Alternatively you can place it in main App component and access
 * it globally via this.$root.$confirm
 * ```
 * <template>
 *   <v-app>
 *     ...
 *     <confirm ref="confirm"></confirm>
 *   </v-app>
 * </template>
 *
 * mounted() {
 *   this.$root.$confirm = this.$refs.confirm.open
 * }
 * ```
 */
export default {
    data() {
        return {
            /**
             * Dialog message
             */
            message: null,
            /**
             * Dialog default options
             */
            options: {
                color: 'warning',
                width: 300,
                zIndex: 200,
            },
            /**
             * Promise response
             */
            resolve: null,
            /**
             * Dialog title
             */
            title: null,
            /**
             * Defines whether to show dialog
             */
            visible: false,
        };
    },
    methods: {
        /**
         * Open dialog
         * @param {string} message - Dialog message
         * @param {string} title - Dialog title
         */
        open(message, title = null) {
            this.visible = true;
            this.title = title;
            this.message = message;
            return new Promise((resolve) => {
                this.resolve = resolve;
            });
        },
        /**
         * Click on "Confirm" button
         */
        onConfirm() {
            this.resolve(true);
            this.visible = false;
        },
        /**
         * Click on "Cancel" button
         */
        onCancel() {
            this.resolve(false);
            this.visible = false;
        },
    },
};
</script>

<template>
    <v-list-tile
        :exact="true"
        ripple
        :to="to"
    >
        <v-list-tile-action v-if="icon">
            <v-icon>{{ icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
            <v-list-tile-title>{{ text }}</v-list-tile-title>
        </v-list-tile-content>
    </v-list-tile>
</template>

<script>
/**
 * Sidebar link component
 */
export default {
    name: 'SidebarLink',
    props: {
        /**
         * Link icon
         */
        icon: {
            type: String,
            required: false,
            default: null,
        },
        /**
         * Link text
         */
        text: {
            type: String,
            required: true,
        },
        /**
         * Will designate the component tag to `<router-link>`
         */
        to: {
            type: Object,
            required: true,
        },
    },
};
</script>

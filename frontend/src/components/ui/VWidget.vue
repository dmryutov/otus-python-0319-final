<template>
    <v-card>
        <v-toolbar
            v-if="title"
            card
            dense
            color="transparent"
            flat
        >
            <v-toolbar-title>
                <h4>{{ title }}</h4>
            </v-toolbar-title>
            <v-spacer />
            <slot name="widget-header-action" />
        </v-toolbar>
        <v-divider v-if="title" />
        <v-card-text :class="[contentBg, padding]">
            <slot name="widget-content" />
        </v-card-text>
    </v-card>
</template>

<script>
/**
 * Custom card widget component
 */
export default {
    name: 'VWidget',
    props: {
        /**
         * Content block background color
         */
        contentBg: {
            type: String,
            required: false,
            default: null,
        },
        /**
         * Content block padding
         */
        padding: {
            type: String,
            required: false,
            default: '',
        },
        /**
         * Widget title
         */
        title: {
            type: [String, Number],
            required: false,
            default: null,
        },
    },
};
</script>

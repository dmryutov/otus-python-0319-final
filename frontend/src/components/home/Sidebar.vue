<template>
    <v-navigation-drawer
        v-model="showSidebar"
        app
        class="d-flex"
        clipped
        fixed
        :dark="$vuetify.dark"
        :mini-variant.sync="mini"
        width="260"
    >
        <v-list dense expand>
            <sidebar-link
                icon="mdi-chart-scatter-plot"
                text="Correspondence Analysis"
                :to="{name: 'ca'}"
            />
            <sidebar-link
                icon="mdi-chart-bell-curve"
                text="Time Series Decomposition"
                :to="{name: 'stl'}"
            />
            <sidebar-link
                icon="mdi-chart-line"
                text="Time Series Forecasting"
                :to="{name: 'forecast'}"
            />
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import {mapGetters} from 'vuex';

import * as homeTypes from '@/store/home/types';
import SidebarLink from './SidebarLink';

/**
 * Sidebar component
 */
export default {
    name: 'HomeSidebar',
    components: {
        SidebarLink,
    },
    data() {
        return {
            /**
             * Condenses navigation drawer width
             */
            mini: false,
        };
    },
    computed: {
        ...mapGetters([
            'currentUser',
        ]),
        showSidebar: {
            /**
             * Get sidebar visibility flag
             * @return {boolean} True if should show sidebar
             */
            get() {
                return this.$store.getters.showSidebar;
            },
            /**
             * Set sidebar visibility flag
             * @param {boolean} value - Sidebar visibility flag
             */
            set(value) {
                this.$store.commit(homeTypes.TOGGLE_SIDEBAR, value);
            },
        },
    },
};
</script>

<style lang="scss" scoped>
    .v-navigation-drawer {
        flex-direction: column;
        margin-top: 55px !important;

        > *:not(.spacer) {
            flex-grow: 0 !important;
        }
    }

    .sidebar-logo {
        display: flex;
        flex: 1;
        align-items: flex-end;
        justify-content: center;

        /* min-height: 134px; */
        min-height: 100px;
        margin-bottom: 15px;

        img {
            width: 100px;
        }
    }
</style>

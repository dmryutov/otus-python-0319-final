<template>
    <v-toolbar
        app
        dark
        class="site-header"
        clipped-left
        color="primary"
        fixed
    >
        <!-- MENU TOGGLE -->
        <v-toolbar-side-icon @click.stop="toggleSidebar" />
        <v-toolbar-title class="d-flex align-center">
            <img src="@/assets/img/logo-white.png" height="25" alt="Logo">
            <span class="ml-2">
                {{ SERVICE_TITLE }}
            </span>
        </v-toolbar-title>
        <v-spacer />

        <!-- USER MENU -->
        <v-menu
            left
            :nudge-bottom="10"
            offset-y
            origin="center"
            transition="scale-transition"
        >
            <v-btn
                slot="activator"
                flat
                icon
                large
            >
                <v-avatar size="30">
                    <img :src="currentUser.avatar" alt="avatar">
                </v-avatar>
            </v-btn>
            <v-list class="pa-0">
                <v-list-tile disabled>
                    <v-list-tile-avatar size="24">
                        <img :src="currentUser.avatar" alt="avatar">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ currentUser.username }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile ripple @click="logout">
                    <v-list-tile-action>
                        <v-icon>mdi-logout</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Logout</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-menu>
    </v-toolbar>
</template>

<script>
import {mapGetters} from 'vuex';

import {TOOLTIP} from '@/consts/home';
import {SERVICE_TITLE} from '@/consts/system';
import * as homeTypes from '@/store/home/types';
import * as userTypes from '@/store/user/types';

/**
 * Header component
 */
export default {
    name: 'HomeHeader',
    data() {
        return {
            SERVICE_TITLE,
            /**
             * Component tooltip
             */
            tooltip: TOOLTIP,
        };
    },
    computed: {
        ...mapGetters([
            'currentUser',
            'showRefresh',
        ]),
    },
    methods: {
        /**
         * Show / hide sidebar
         */
        toggleSidebar() {
            this.$store.commit(homeTypes.TOGGLE_SIDEBAR);
        },
        /**
         * Redirect to logout page
         */
        logout() {
            this.$store.dispatch(userTypes.LOGOUT);
        },
    },
};
</script>

<style lang="scss">
    .v-toolbar .v-toolbar__content {
        height: 55px !important;
    }

    .refresh-badge .v-badge__badge {
        top: -10px;
        right: -15px;
        width: 18px;
        height: 18px;
        font-size: 12px;
    }
</style>

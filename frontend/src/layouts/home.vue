<template>
    <v-app>
        <!-- SIDEBAR -->
        <app-sidebar class="app--drawer" />
        <!-- HEADER -->
        <app-header class="app--toolbar" />
        <!-- PAGE -->
        <v-content>
            <!-- PAGE TITLE -->
            <v-layout class="align-center layout px-4 pt-4 app--page-header">
                <div class="page-header-left">
                    <h2 class="pr-3">
                        {{ $route.meta.title }}
                        <span v-if="$route.meta.subtitle" class="ml-1">
                            | {{ $route.meta.subtitle }}
                        </span>
                    </h2>
                </div>
                <v-spacer />
                <v-breadcrumbs divider=">" :items="breadcrumbs" class="hidden-xs-only">
                    <li slot="item" slot-scope="{item}">
                        <router-link
                            class="v-breadcrumbs__item"
                            :class="{'v-breadcrumbs__item--disabled': item.disabled}"
                            :disabled="item.disabled"
                            :to="item.to || '/'"
                        >
                            <v-icon v-if="item.icon">
                                {{ item.icon }}
                            </v-icon>{{ item.text }}
                        </router-link>
                    </li>
                </v-breadcrumbs>
            </v-layout>
            <!-- PAGE CONTENT -->
            <div class="page-wrapper">
                <transition name="slide" mode="out-in">
                    <router-view />
                </transition>
                <app-spinner v-if="isLoading" />
            </div>
            <!-- PAGE FOOTER -->
            <v-footer height="auto" class="pa-3 pt-0 app--footer">
                <span class="caption ma-auto">
                    v{{ appVersion }} © {{ currentYear }} dmryutov
                </span>
            </v-footer>
        </v-content>

        <!-- UTILS -->
        <v-fab-transition>
            <v-btn
                v-show="showToTop"
                bottom="bottom"
                color="error"
                dark="dark"
                fab="fab"
                fixed="fixed"
                right="right"
                small
                @click="toTop"
            >
                <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
        </v-fab-transition>

        <app-confirm-dialog ref="confirm" />
    </v-app>
</template>

<script>
import {mapGetters} from 'vuex';

import Header from '@/components/home/Header';
import Sidebar from '@/components/home/Sidebar';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import Spinner from '@/components/ui/Spinner';

/**
 * Main page component
 */
export default {
    name: 'Home',
    components: {
        appConfirmDialog: ConfirmDialog,
        appHeader: Header,
        appSidebar: Sidebar,
        appSpinner: Spinner,
    },
    data() {
        return {
            /**
             * Defines whether to show "To Top" button
             */
            showToTop: false,
        };
    },
    computed: {
        ...mapGetters([
            'appVersion',
            'isLoading',
        ]),
        /**
         * Get current year
         * @return {number} Current year
         */
        currentYear: () => new Date().getFullYear(),
        /**
         * Construct breadcrumbs chain
         * @return {Array} Breadcrumbs data
         */
        breadcrumbs() {
            const {parent} = this.$route.meta;
            const link = parent ? [{
                text: parent.title,
                to: {name: parent.to},
                exact: true,
            }] : [];
            return [
                {
                    icon: 'mdi-home',
                    disabled: true,
                },
                ...link,
                {
                    text: this.$route.meta.title,
                    disabled: true,
                },
            ];
        },
    },
    /**
     * Connect window events with component methods when the component has been loaded
     */
    created() {
        window.addEventListener('scroll', this.onScroll);
    },
    /**
     * Define global access to confirm dialog
     */
    mounted() {
        this.$root.$confirm = this.$refs.confirm.open;
    },
    /**
     * Disconnect window events from component methods before the component has been destroyed
     */
    destroyed() {
        window.removeEventListener('scroll', this.onScroll);
    },
    methods: {
        /**
         *
         */
        onScroll() {
            const top = window.pageYOffset || document.documentElement.offsetTop || 0;
            this.showToTop = top > 200;
        },
        /**
         * Scroll to page top
         */
        toTop() {
            this.$vuetify.goTo(0);
        },
    },
};
</script>

<style lang="scss">
    $dark_background: #424242;

    // === COMMON ===
    .w-100 {
        width: 100% !important;
    }

    .h-100 {
        height: 100% !important;
    }

    .page-wrapper {
        min-height: calc(100vh - 55px - 50px - 81px);
    }

    .top-button-block {
        position: sticky;
        top: 50px;
        z-index: 1;

        .v-card__text div:not(.spacer) {
            overflow-x: auto;
            white-space: nowrap;
        }

        .v-btn {
            margin: 0;
        }
    }

    .v-toolbar--card {
        background-color: #fff !important;
        border-color: #fff !important;

        &.theme--dark {
            background-color: $dark_background !important;
            border-color: $dark_background !important;
        }
    }

    // === FOOTER ===
    .v-footer {
        background: #fafafa !important;

        &.theme--dark {
            background: $dark_background !important;
        }
    }

    // === TABLES ===
    .v-table .v-chip {
        z-index: 0;
    }

    .table-action-cell {
        white-space: nowrap;

        .v-btn--icon {
            width: 40px;
            height: 40px;
            margin: 0;
        }
    }

    .multiline-cell {
        padding: 10px 0 !important;
        white-space: pre-line;
    }

    // === FORMS ===
    .v-form {
        .v-subheader {
            text-transform: uppercase;
        }

        .v-input,
        .v-input__slot {
            margin-bottom: 10px;
        }
    }

    .v-menu__content.v-autocomplete__content {
        z-index: 210 !important;
    }

    .v-select--chips {
        z-index: 0;
    }

    .v-input--checkbox .v-input__slot {
        margin-bottom: 0 !important;
    }

    // === HANDSONTABLE ===
    .disabled-cell {
        background: #ddd !important;
    }

    .handsontableSelected {
        background: #eee !important;
    }

    .htCore .btn {
        line-height: 0 !important;
    }

    .button-table-fix {
        z-index: 0;
        overflow-x: scroll;

        &.auto-height {
            .wtHolder {
                height: auto !important;
            }
        }

        .cell-btn {
            min-width: auto !important;
            height: auto !important;
        }
    }

    .theme--dark .handsontable {
        th {
            color: #fff;
            background: $dark_background !important;
            border-color: #ffffff1f !important;
        }

        td {
            color: #fff;
            background: #606060 !important;
            border-color: #ffffff1f !important;
        }

        .handsontableSelected {
            background: #888 !important;
        }
    }

    // === HIGHCHARTS ===
    .theme--dark {
        .highcharts-background {
            fill: $dark_background;
        }

        .highcharts-title,
        .highcharts-subtitle,
        .highcharts-xaxis-labels text,
        .highcharts-yaxis-labels text,
        .highcharts-axis-title,
        .highcharts-range-selector-buttons > text,
        .highcharts-range-label text,
        .highcharts-range-input text,
        .highcharts-legend-item rect[fill="#434348"],
        .highcharts-legend-item rect[fill="rgb(67,67,72)"],
        .highcharts-series rect[fill="#434348"],
        .highcharts-series rect[fill="rgb(67,67,72)"] {
            fill: #fff !important;
        }

        .highcharts-legend-item text {
            fill: #e0e0e3 !important;
        }

        .highcharts-legend-item-hidden {
            .highcharts-graph {
                stroke: #606063 !important;
            }

            text {
                fill: #606063 !important;
            }
        }

        .highcharts-legend-item:hover text {
            fill: #fff !important;
        }

        .highcharts-legend-item path[stroke="#434348"],
        .highcharts-series path[stroke="#434348"],
        .highcharts-series path[stroke="#rgb(67,67,72)"] {
            stroke: #fff !important;
        }
    }

    // === ANIMATION ===
    .slide-enter-active {
        animation: slide-in 170ms ease-out forwards;
    }

    .slide-leave-active {
        animation: slide-out 170ms ease-out forwards;
    }

    @keyframes slide-in {
        from {
            transform: translateY(-30px);
            opacity: 0;
        }

        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes slide-out {
        from {
            transform: translateY(0);
            opacity: 1;
        }

        to {
            transform: translateY(-30px);
            opacity: 0;
        }
    }
</style>

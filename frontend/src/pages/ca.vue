<template>
    <v-container fluid grid-list-xl>
        <!-- BUTTONS -->
        <v-layout class="top-button-block" wrap>
            <v-flex class="pt-0" xs12>
                <v-widget>
                    <div slot="widget-content">
                        <v-btn
                            color="primary"
                            :disabled="caData.length < 3 || caData[0].length < 3"
                            @click="calculate"
                        >
                            <v-icon>mdi-calculator</v-icon>Calculate
                        </v-btn>
                        <v-btn
                            class="ml-4"
                            color="error"
                            @click="clearAll"
                        >
                            <v-icon>mdi-eraser</v-icon>Clear All
                        </v-btn>
                    </div>
                </v-widget>
            </v-flex>
        </v-layout>

        <v-layout v-if="caResult" wrap>
            <!-- CHART SETTINGS -->
            <v-flex xs12>
                <v-widget>
                    <v-layout slot="widget-content" wrap>
                        <v-flex xs12 sm6 md4>
                            <v-autocomplete
                                v-model="caConfig.scaling"
                                :items="CA_SCALING"
                                label="Scale Coordinates"
                                prepend-icon="mdi-ruler"
                            >
                                <template slot="item" slot-scope="{item}">
                                    <span :style="{color: item.color}">
                                        {{ item.text }}
                                    </span>
                                </template>
                            </v-autocomplete>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-autocomplete
                                v-model="caConfig.angles"
                                chips
                                deletable-chips
                                :items="CA_ANGLES"
                                label="Show Angles"
                                multiple
                                prepend-icon="mdi-angle-acute"
                                small-chips
                            >
                                <template slot="item" slot-scope="{item}">
                                    <span :style="{color: item.color}">
                                        {{ item.text }}
                                    </span>
                                </template>
                            </v-autocomplete>
                        </v-flex>
                        <v-flex xs12 md4>
                            <v-text-field
                                v-model="caConfig.title"
                                label="Chart Title"
                                prepend-icon="mdi-format-title"
                            />
                        </v-flex>
                        <v-flex xs12 sm6 md2>
                            <v-checkbox
                                v-model="caConfig.showTitle"
                                label="Show Chart Title"
                            />
                        </v-flex>
                        <v-flex xs12 sm6 md2>
                            <v-checkbox
                                v-model="caConfig.showAxisTitle"
                                label="Show Axis Title"
                            />
                        </v-flex>
                        <v-flex xs12 sm6 md2>
                            <v-checkbox
                                v-model="caConfig.showAxisLabel"
                                label="Show Axis Labels"
                            />
                        </v-flex>
                        <v-flex xs12 sm6 md2>
                            <v-checkbox
                                v-model="caConfig.showGrid"
                                label="Show Grid"
                            />
                        </v-flex>
                        <v-flex xs12 sm6 md2>
                            <v-checkbox
                                v-model="caConfig.showLegend"
                                label="Show Legend"
                            />
                        </v-flex>
                        <v-flex xs12 sm6 md2>
                            <v-checkbox
                                v-model="caConfig.showTooltip"
                                label="Show Tooltips"
                            />
                        </v-flex>
                    </v-layout>
                </v-widget>
            </v-flex>

            <!-- CHART -->
            <v-flex xs12 xl6>
                <v-widget title="Chart">
                    <scatter-plot
                        slot="widget-content"
                        :angles="caConfig.angles"
                        :data="caIncludedData"
                        :height="500"
                        :label-positions="caLabelPositions"
                        :point-click-callback="refreshCoordinateTable"
                        :result="transformedResult"
                        :selected-point="caSelectedPoint"
                        :show-axis-title="caConfig.showAxisTitle"
                        :show-axis-label="caConfig.showAxisLabel"
                        :show-grid="caConfig.showGrid"
                        :show-legend="caConfig.showLegend"
                        :show-title="caConfig.showTitle"
                        :show-tooltip="caConfig.showTooltip"
                        :title="caConfig.title"
                    />
                </v-widget>
            </v-flex>

            <!-- RESULT TABLES -->
            <v-flex xs12 sm6 xl4>
                <v-widget title="Coordinates" padding="pa-0">
                    <coordinate-table
                        slot="widget-content"
                        ref="coordTable"
                        :data="caIncludedData"
                        :height="532"
                        :label-positions="caLabelPositions"
                        :result="transformedResult"
                        :selected-point="caSelectedPoint"
                    />
                </v-widget>
            </v-flex>
            <v-flex xs12 sm6 xl2>
                <v-widget title="Explained" padding="pa-0">
                    <explain-table
                        slot="widget-content"
                        :explained="caResult.explained"
                        :height="532"
                    />
                </v-widget>
            </v-flex>
        </v-layout>

        <!-- INPUT TABLE -->
        <v-layout wrap>
            <v-flex xs12>
                <v-widget title="Input" padding="pa-0">
                    <input-table
                        slot="widget-content"
                        :data="caData"
                        :meta="caDataMeta"
                    />
                </v-widget>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import _ from 'lodash';
import {mapGetters} from 'vuex';

import CACoordinateTable from '@/components/ca/CACoordinateTable';
import CAExplainTable from '@/components/ca/CAExplainTable';
import CAInputTable from '@/components/ca/CAInputTable';
import CAScatterPlot from '@/components/ca/CAScatterPlot';
import {
    CA_STATUS_SUP, CA_ANGLES, CA_SCALING, CA_SCALING_SYMMETRIC, CA_SCALING_ROWPRINCIPAL,
    CA_SCALING_COLPRINCIPAL,
} from '@/consts/ca';
import * as caTypes from '@/store/ca/types';
import {showNotification, showPageLoader} from '@/utils/ui';

/**
 * Correspondence analysis (CA) component
 */
export default {
    name: 'CA',
    components: {
        coordinateTable: CACoordinateTable,
        explainTable: CAExplainTable,
        inputTable: CAInputTable,
        scatterPlot: CAScatterPlot,
    },
    data() {
        return {
            CA_ANGLES,
            CA_SCALING,
        };
    },
    computed: {
        ...mapGetters([
            'caConfig',
            'caData',
            'caDataMeta',
            'caIncludedData',
            'caLabelPositions',
            'caResult',
            'caSelectedPoint',
        ]),
        /**
         * Transform (with weights) CA results
         * @return {?Object} Transformed CA results
         */
        transformedResult() {
            if (!this.caResult) {
                return null;
            }
            const result = _.cloneDeep(this.caResult);
            const [sc1, sc2] = this.caResult.eigenvalues.map((x) => Math.sqrt(x));

            if (this.caConfig.scaling === CA_SCALING_SYMMETRIC) {
                result.rows = result.rows.map((coords) => [
                    coords[0] * Math.sqrt(sc1),
                    coords[1] * Math.sqrt(sc2),
                ]);
                result.cols = result.cols.map((coords) => [
                    coords[0] * Math.sqrt(sc1),
                    coords[1] * Math.sqrt(sc2),
                ]);
            }
            else if (this.caConfig.scaling === CA_SCALING_ROWPRINCIPAL) {
                result.rows = result.rows.map((coords) => [
                    coords[0] * sc1,
                    coords[1] * sc2,
                ]);
            }
            else if (this.caConfig.scaling === CA_SCALING_COLPRINCIPAL) {
                result.cols = result.cols.map((coords) => [
                    coords[0] * sc1,
                    coords[1] * sc2,
                ]);
            }
            return result;
        },
    },
    methods: {
        /**
         * Refresh (redraw) table with coordinates
         */
        refreshCoordinateTable() {
            this.$refs.coordTable.refresh();
        },
        /**
         * Clear all data
         */
        clearAll() {
            this.$store.commit(caTypes.CA_CLEAR_DATA);
        },
        /**
         * Calculate correspondence analysis (CA)
         */
        calculate() {
            // Prepare data
            const data = this.caIncludedData
                .slice(2)
                .map((row) => row.slice(2));
            const colStatus = this.caIncludedData[1]
                .slice(2)
                .map((status, i) => (status === CA_STATUS_SUP ? i : null))
                .filter((index) => index !== null);
            const rowStatus = this.caIncludedData
                .slice(2)
                .map((row) => row[1])
                .map((status, i) => (status === CA_STATUS_SUP ? i : null))
                .filter((index) => index !== null);
            // Validate data
            const hasNegative = data.some((row) => row.some((x) => x < 0));
            if (hasNegative) {
                showNotification('warning', 'Only positive values are allowed');
                return;
            }
            // Send data to server
            showPageLoader(this.$store.dispatch(caTypes.CA_CALCULATE, {
                data,
                sup_rows: rowStatus,
                sup_cols: colStatus,
            }));
        },
    },
};
</script>

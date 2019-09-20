<template>
    <v-container fluid grid-list-xl>
        <!-- BUTTONS -->
        <v-layout class="top-button-block" wrap>
            <v-flex class="pt-0" xs12>
                <v-widget>
                    <div slot="widget-content">
                        <v-btn
                            color="primary"
                            :disabled="!stlData.length"
                            @click="calculate"
                        >
                            <v-icon>mdi-calculator</v-icon>Calculate
                        </v-btn>
                        <v-btn
                            class="ml-4"
                            color="success"
                            :disabled="!stlResult"
                            @click="exportExcel"
                        >
                            <v-icon>mdi-download</v-icon>Export to Excel
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

        <v-layout wrap>
            <!-- MODEL SETTINGS -->
            <v-flex xs12>
                <v-widget>
                    <v-layout slot="widget-content" wrap>
                        <v-flex xs12 sm6>
                            <v-autocomplete
                                v-model="stlConfig.model"
                                :items="STL_MODELS"
                                label="Seasonal Component Type"
                                prepend-icon="mdi-chart-bell-curve"
                                @change="clearResult"
                            />
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-text-field
                                v-model.number="stlConfig.frequency"
                                label="Series Frequency"
                                prepend-icon="mdi-numeric"
                                @change="clearResult"
                            />
                        </v-flex>
                    </v-layout>
                </v-widget>
            </v-flex>
        </v-layout>

        <v-layout wrap>
            <!-- INPUT TABLE -->
            <v-flex xs12 sm6>
                <v-widget title="Data" padding="pa-0">
                    <input-table
                        slot="widget-content"
                        ref="inputTable"
                        :data="stlData"
                        :result="stlResult"
                    />
                </v-widget>
            </v-flex>

            <!-- CHARTS -->
            <v-flex v-if="stlData.length" xs12 sm6>
                <v-widget title="Charts" padding="pa-0">
                    <result-chart
                        slot="widget-content"
                        :data="stlData"
                        :result="stlResult"
                    />
                </v-widget>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import {mapGetters} from 'vuex';

import STLInputTable from '@/components/stl/STLInputTable';
import STLResultChart from '@/components/stl/STLResultChart';
import {STL_MODELS, STL_MODEL_MULTIPLICATIVE} from '@/consts/stl';
import * as stlTypes from '@/store/stl/types';
import {showNotification, showPageLoader} from '@/utils/ui';

/**
 * Time series decomposition (STL) component
 */
export default {
    name: 'STL',
    components: {
        inputTable: STLInputTable,
        resultChart: STLResultChart,
    },
    data() {
        return {
            STL_MODELS,
        };
    },
    computed: {
        ...mapGetters([
            'stlConfig',
            'stlData',
            'stlResult',
        ]),
    },
    methods: {
        /**
         * Clear all data
         */
        clearAll() {
            this.$store.commit(stlTypes.STL_CLEAR_DATA);
        },
        /**
         * Clear results
         */
        clearResult() {
            this.$store.commit(stlTypes.STL_CALCULATE, null);
        },
        /**
         * Calculate time series decomposition (STL)
         */
        calculate() {
            const hasNegative = this.stlData.some((x) => x <= 0);
            if (this.stlConfig.model === STL_MODEL_MULTIPLICATIVE && hasNegative) {
                showNotification('warning', 'Only positive values are allowed');
                return;
            }
            showPageLoader(this.$store.dispatch(stlTypes.STL_CALCULATE, {
                data: this.stlData,
                frequency: this.stlConfig.frequency,
                model: this.stlConfig.model,
            }), this.$refs.inputTable.refresh);
        },
        /**
         * Export time series decomposition results to Excel file
         */
        exportExcel() {
            showPageLoader(this.$store.dispatch(stlTypes.STL_EXPORT, {
                data: this.stlData,
                result: this.stlResult,
            }));
        },
    },
};
</script>

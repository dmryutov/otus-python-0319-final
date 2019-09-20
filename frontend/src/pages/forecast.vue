<template>
    <v-container fluid grid-list-xl>
        <!-- BUTTONS -->
        <v-layout class="top-button-block" wrap>
            <v-flex class="pt-0" xs12>
                <v-widget>
                    <div slot="widget-content">
                        <v-btn
                            color="primary"
                            :disabled="!forecastData.length"
                            @click="calculate"
                        >
                            <v-icon>mdi-calculator</v-icon>Calculate
                        </v-btn>
                        <v-btn
                            class="ml-4"
                            color="success"
                            :disabled="!forecastResult"
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
                        <v-flex xs12 sm6 lg4>
                            <date-picker
                                v-model="forecastConfig.dateStart"
                                label="Start Date"
                                icon="mdi-calendar"
                            />
                        </v-flex>
                        <v-flex xs12 sm6 lg4>
                            <v-autocomplete
                                v-model="forecastConfig.periodType"
                                :items="FORECAST_PERIODS"
                                label="Period Type"
                                prepend-icon="mdi-calendar-clock"
                                @change="clearResult"
                            />
                        </v-flex>
                        <v-flex xs12 sm6 lg4>
                            <v-text-field
                                v-model.number="forecastConfig.periodCount"
                                label="Forecast Periods"
                                prepend-icon="mdi-numeric"
                                @change="clearResult"
                            />
                        </v-flex>
                        <v-flex xs12 sm6 lg4>
                            <v-autocomplete
                                v-model="forecastConfig.model"
                                :items="STL_MODELS"
                                label="Seasonal Component Type"
                                prepend-icon="mdi-chart-bell-curve"
                                @change="clearResult"
                            />
                        </v-flex>
                        <v-flex xs12 sm6 lg4>
                            <v-autocomplete
                                v-model="forecastConfig.changepointMethod"
                                :items="FORECAST_CHANGEPOINT_METHODS"
                                label="Trend Changepoint Detection"
                                prepend-icon="mdi-trending-up"
                                @change="clearResult"
                            />
                        </v-flex>
                        <v-flex
                            v-if="isChangepointScale"
                            xs12 sm6 lg4
                        >
                            <v-text-field
                                v-model.number="forecastConfig.changepointScale"
                                label="Trend Changepoint Scale"
                                prepend-icon="mdi-ruler"
                                @change="clearResult"
                            />
                        </v-flex>
                        <v-flex
                            v-if="isChangepointDates"
                            xs12 sm6 lg4
                        >
                            <date-picker-multiple
                                v-model="forecastConfig.changepointDates"
                                label="Trend Changepoint Dates"
                                :min-date="dates[0]"
                                :max-date="dates[forecastData.length - 1]"
                                icon="mdi-calendar"
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
                        :data="forecastData"
                        :dates="dates"
                        :result="forecastResult"
                    />
                </v-widget>
            </v-flex>

            <!-- CHARTS -->
            <v-flex v-if="forecastData.length" xs12 sm6>
                <v-widget title="Charts" padding="pa-0">
                    <result-chart
                        slot="widget-content"
                        :data="forecastData"
                        :dates="dates"
                        :result="forecastResult"
                    />
                </v-widget>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import moment from 'moment';
import {mapGetters} from 'vuex';

import ForecastInputTable from '@/components/forecast/ForecastInputTable';
import ForecastResultChart from '@/components/forecast/ForecastResultChart';
import DatePicker from '@/components/ui/DatePicker';
import DatePickerMultiple from '@/components/ui/DatePickerMultiple';
import {
    FORECAST_PERIODS, FORECAST_MOMENT_PERIODS, FORECAST_MOMENT_MULTIPLIER,
    FORECAST_CHANGEPOINT_METHODS, FORECAST_CHANGEPOINT_METHOD_SCALE,
    FORECAST_CHANGEPOINT_METHOD_DATES,
} from '@/consts/forecast';
import {STL_MODELS} from '@/consts/stl';
import * as forecastTypes from '@/store/forecast/types';
import {showPageLoader} from '@/utils/ui';

/**
 * Time series forecasting component
 */
export default {
    name: 'Forecast',
    components: {
        DatePicker,
        DatePickerMultiple,
        inputTable: ForecastInputTable,
        resultChart: ForecastResultChart,
    },
    data() {
        return {
            FORECAST_CHANGEPOINT_METHODS,
            FORECAST_CHANGEPOINT_METHOD_DATES,
            FORECAST_CHANGEPOINT_METHOD_SCALE,
            FORECAST_PERIODS,
            STL_MODELS,
        };
    },
    computed: {
        ...mapGetters([
            'forecastConfig',
            'forecastData',
            'forecastResult',
        ]),
        /**
         * Generate date series
         * @return {Array} Date series
         */
        dates() {
            const {dateStart, periodType, periodCount} = this.forecastConfig;
            const multiplier = FORECAST_MOMENT_MULTIPLIER[periodType];
            const periods = FORECAST_MOMENT_PERIODS[periodType];
            return Array(this.forecastData.length + periodCount)
                .fill(null)
                .map((__, index) => moment(dateStart)
                    .add(index * multiplier, periods)
                    .format('YYYY-MM-DD'));
        },
        /**
         * Check if changepoint detection method is selecting dates
         * @return {boolean} True if method is selecting dates
         */
        isChangepointDates() {
            return this.forecastConfig.changepointMethod === FORECAST_CHANGEPOINT_METHOD_DATES;
        },
        /**
         * Check if changepoint detection method is scaling
         * @return {boolean} True if method is scaling
         */
        isChangepointScale() {
            return this.forecastConfig.changepointMethod === FORECAST_CHANGEPOINT_METHOD_SCALE;
        },
    },
    methods: {
        /**
         * Clear all data
         */
        clearAll() {
            this.$store.commit(forecastTypes.FORECAST_CLEAR_DATA);
        },
        /**
         * Clear results
         */
        clearResult() {
            this.$store.commit(forecastTypes.FORECAST_CALCULATE, null);
        },
        /**
         * Calculate time series forecast
         */
        calculate() {
            showPageLoader(this.$store.dispatch(forecastTypes.FORECAST_CALCULATE, {
                data: this.forecastData,
                model: this.forecastConfig.model,
                date_start: this.forecastConfig.dateStart,
                period_type: this.forecastConfig.periodType,
                period_count: this.forecastConfig.periodCount,
                changepoint_dates: this.isChangepointDates
                    ? this.forecastConfig.changepointDates : undefined,
                changepoint_scale: this.isChangepointScale
                    ? this.forecastConfig.changepointScale : undefined,
            }), this.$refs.inputTable.refresh);
        },
        /**
         * Export time series forecasting results to Excel file
         */
        exportExcel() {
            showPageLoader(this.$store.dispatch(forecastTypes.FORECAST_EXPORT, {
                data: this.forecastData,
                result: this.forecastResult,
                date_start: this.forecastConfig.dateStart,
                period_type: this.forecastConfig.periodType,
            }));
        },
    },
};
</script>

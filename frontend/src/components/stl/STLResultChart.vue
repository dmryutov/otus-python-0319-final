<template>
    <div>
        <highcharts
            :options="chartOptions('Observed', data)"
        />
        <template v-if="result">
            <highcharts
                :options="chartOptions('Trend', result.trend)"
            />
            <highcharts
                :options="chartOptions('Seasonal', result.seasonal)"
            />
            <highcharts
                :options="chartOptions('Residual', result.resid)"
            />
        </template>
    </div>
</template>

<script>
import Highcharts from 'highcharts';
import loadExporting from 'highcharts/modules/exporting';
import {Chart} from 'highcharts-vue';

import {CHART_IMAGE_WIDTH} from '@/consts/chart';

loadExporting(Highcharts);

/**
 * Time series decomposition (STL) result charts component
 */
export default {
    name: 'STLResultChart',
    components: {
        highcharts: Chart,
    },
    props: {
        /**
         * Input table data
         */
        data: {
            type: Array,
            required: true,
        },
        /**
         * Time series decomposition results
         */
        result: {
            validator: (prop) => typeof prop === 'object' || prop === null,
            required: true,
        },
    },
    methods: {
        /**
         * Build chart configuration
         * @param {string} title - Chart title
         * @param {Array} data - Chart series data
         * @return {Object} Chart configs
         */
        chartOptions(title, data) {
            return {
                chart: {
                    height: '200px',
                    type: 'spline',
                    zoomType: 'x',
                },
                credits: {
                    enabled: false,
                },
                exporting: {
                    sourceWidth: CHART_IMAGE_WIDTH,
                },
                legend: {
                    enabled: false,
                },
                plotOptions: {
                    spline: {
                        marker: {
                            enabled: false,
                        },
                    },
                },
                series: [
                    {
                        name: title,
                        data,
                    },
                ],
                title: {
                    text: title,
                },
                tooltip: {
                    valueDecimals: 2,
                },
                xAxis: {
                    gridLineWidth: 1,
                    title: null,
                },
            };
        },
    },
};
</script>

<template>
    <highcharts
        :options="chartOptions"
    />
</template>

<script>
import Highcharts from 'highcharts';
import loadExporting from 'highcharts/modules/exporting';
import highchartsMore from 'highcharts/highcharts-more';
import {Chart} from 'highcharts-vue';

import {CHART_IMAGE_WIDTH} from '@/consts/chart';

loadExporting(Highcharts);
highchartsMore(Highcharts);

/**
 * Time series forecasting result charts component
 */
export default {
    name: 'ForecastResultChart',
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
         * Date series
         */
        dates: {
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
    computed: {
        /**
         * Chart config
         * @return {Object} Chart configs
         */
        chartOptions() {
            return {
                chart: {
                    height: '500px',
                    type: 'spline',
                    zoomType: 'x',
                },
                credits: {
                    enabled: false,
                },
                exporting: {
                    sourceWidth: CHART_IMAGE_WIDTH,
                },
                plotOptions: {
                    arearange: {
                        lineWidth: 0.5,
                    },
                    series: {
                        fillOpacity: 0.3,
                        marker: {
                            enabled: false,
                        },
                    },
                },
                series: [
                    {
                        color: '#7cb5ec',
                        data: this.addDatesToValues(this.data),
                        name: 'Series',
                        zIndex: 2,
                    },
                    ...(this.result ? [
                        {
                            color: '#434348',
                            data: this.addDatesToValues(this.result.forecast),
                            name: 'Forecast',
                            zIndex: 2,
                        },
                        {
                            color: '#90ed7d',
                            data: this.addDatesToValues(this.result.lower.map((x, i) =>
                                [x, this.result.upper[i]])),
                            name: 'Confidence Interval',
                            type: 'arearange',
                            visible: false,
                            zIndex: 1,
                        },
                    ] : []),
                ],
                title: {
                    text: 'Forecasting',
                },
                tooltip: {
                    valueDecimals: 2,
                },
                xAxis: {
                    dateTimeLabelFormats: {
                        day: '%d.%m.%Y',
                        month: '%b-%Y',
                        year: '%Y',
                    },
                    gridLineWidth: 1,
                    plotLines: (this.result ? this.result.changepoints.map((date) => ({
                        color: '#ff000055',
                        dashStyle: 'longdash',
                        value: new Date(date).getTime(),
                        width: 0.5,
                    })) : []),
                    title: null,
                    type: 'datetime',
                },
            };
        },
    },
    methods: {
        /**
         * Connect factor values and dates
         * @param {Array} values - List of values
         * @return {Array}
         */
        addDatesToValues(values) {
            return values.map((value, i) => [
                new Date(this.dates[i]).getTime(),
                ...(Array.isArray(value) ? value : [value]),
            ]);
        },
    },
};
</script>

<template>
    <highcharts
        :options="chartOptions"
        :style="`height: ${height}px;`"
    />
</template>

<script>
import Highcharts from 'highcharts';
import loadExporting from 'highcharts/modules/exporting';
import {Chart} from 'highcharts-vue';
import _ from 'lodash';

import {CA_STATUS_SUP, CA_LABEL_POSITIONS} from '@/consts/ca';
import {CHART_IMAGE_WIDTH} from '@/consts/chart';
import {
    CHART_COL_COLOR, CHART_COL_SUP_COLOR, CHART_ROW_COLOR, CHART_ROW_SUP_COLOR,
} from '@/consts/color';
import caResultMixin from '@/mixins/caResultMixin';
import * as caTypes from '@/store/ca/types';
import {round} from '@/utils/math';

loadExporting(Highcharts);

/**
 * Correspondence analysis (CA) scatter plot component
 */
export default {
    name: 'CAScatterPlot',
    components: {
        highcharts: Chart,
    },
    mixins: [caResultMixin],
    props: {
        /**
         * Angles lines (lines from point to zero) directions
         */
        angles: {
            type: Array,
            required: false,
            default: () => [],
        },
        /**
         * Input table data
         */
        data: {
            type: Array,
            required: true,
        },
        /**
         * Chart height (px)
         */
        height: {
            type: Number,
            required: false,
            default: 500,
        },
        /**
         * Point label positions
         */
        labelPositions: {
            type: Object,
            required: true,
        },
        /**
         * Point click event callback
         */
        pointClickCallback: {
            type: Function,
            required: false,
            default: () => {},
        },
        /**
         * Correspondence analysis results
         */
        result: {
            type: Object,
            required: true,
        },
        /**
         * Factor point selected on chart
         */
        selectedPoint: {
            type: Object,
            required: true,
        },
        /**
         * Defines whether to show axis title
         */
        showAxisTitle: {
            type: Boolean,
            required: false,
            default: true,
        },
        /**
         * Defines whether to show axis label
         */
        showAxisLabel: {
            type: Boolean,
            required: false,
            default: true,
        },
        /**
         * Defines whether to show grid
         */
        showGrid: {
            type: Boolean,
            required: false,
            default: true,
        },
        /**
         * Defines whether to show chart legend
         */
        showLegend: {
            type: Boolean,
            required: false,
            default: false,
        },
        /**
         * Defines whether to show chart title
         */
        showTitle: {
            type: Boolean,
            required: false,
            default: true,
        },
        /**
         * Defines whether to show point tooltips
         */
        showTooltip: {
            type: Boolean,
            required: false,
            default: false,
        },
        /**
         * Chart title
         */
        title: {
            type: String,
            required: false,
            default: 'CA',
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
                    type: 'scatter',
                    zoomType: 'xy',
                },
                credits: {
                    enabled: false,
                },
                exporting: {
                    sourceWidth: CHART_IMAGE_WIDTH,
                },
                legend: {
                    enabled: this.showLegend,
                },
                plotOptions: {
                    scatter: {
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}',
                        },
                        marker: {
                            radius: 5,
                        },
                    },
                    series: {
                        point: {
                            events: {
                                click: this.pointClick,
                            },
                        },
                        states: {
                            inactive: {
                                opacity: 1,
                            },
                        },
                        stickyTracking: false,
                    },
                    spline: {
                        marker: {
                            enabled: false,
                        },
                    },
                },
                series: [
                    this.pointSeries('row', CHART_ROW_COLOR, CHART_ROW_SUP_COLOR),
                    this.pointSeries('col', CHART_COL_COLOR, CHART_COL_SUP_COLOR),
                    ...this.angleSeries('row', 0, CHART_ROW_COLOR),
                    ...this.angleSeries('col', 1, CHART_COL_COLOR),
                ],
                title: {
                    text: this.showTitle ? this.title : null,
                },
                tooltip: {
                    enabled: this.showTooltip,
                    footerFormat: '</table>',
                    headerFormat: '<b>{point.key}</b><table>',
                    pointFormat: '<tr>'
                        + '<td>Dim 1:</td><td style="text-align: right"><b>{point.x:.1f}</b></td>'
                        + '</tr><tr>'
                        + '<td>Dim 2:</td><td style="text-align: right"><b>{point.y:.1f}</b></td>'
                        + '</tr>',
                    useHTML: true,
                    valueDecimals: 1,
                },
                xAxis: {
                    ...this.axisSettings,
                    title: {
                        text: this.showAxisTitle
                            ? `Dim 1 (${round(this.result.explained[0], 1)} %)`
                            : null,
                    },
                },
                yAxis: {
                    ...this.axisSettings,
                    title: {
                        text: this.showAxisTitle
                            ? `Dim 2 (${round(this.result.explained[1], 1)} %)`
                            : null,
                    },
                },
            };
        },
        /**
         * Chart axis common config
         * @return {Object} Axis config
         */
        axisSettings() {
            return {
                gridLineWidth: 1 * this.showGrid,
                labels: {
                    enabled: this.showAxisLabel,
                },
                lineWidth: 1 * this.showAxisLabel,
                plotLines: [{
                    color: '#777',
                    width: 1,
                    value: 0,
                    zIndex: 3,
                }],
                tickLength: 10 * this.showAxisLabel,
                tickWidth: 1,
            };
        },
    },
    methods: {
        /**
         * Build series data belong to points
         * @param {string} direction - Factor direction (row/col)
         * @param {string} mainColor - Main points color
         * @param {string} supColor - Supplementary points color
         * @return {Object} Series config
         */
        pointSeries(direction, mainColor, supColor) {
            return {
                color: mainColor,
                data: _.zipWith(
                    this[`${direction}Headers`],
                    this.result[`${direction}s`],
                    this.labelPositions[`${direction}s`],
                    this[`${direction}Statuses`],
                    (name, coords, position, status) => ({
                        color: status === CA_STATUS_SUP ? supColor : mainColor,
                        dataLabels: {
                            allowOverlap: true,
                            ...CA_LABEL_POSITIONS[position.position.toLowerCase()],
                        },
                        name,
                        x: coords[0],
                        y: coords[1],
                    })
                ),
                name: direction === 'row' ? 'Row' : 'Column',
            };
        },
        /**
         * Build series data belong to points
         * @param {string} direction - Factor direction (row/col)
         * @param {number} seriesIndex - Point series index
         * @param {string} mainColor - Main points color
         * @return {Object} Series config
         */
        angleSeries(direction, seriesIndex, mainColor) {
            const sameDirection = this.angles.includes(direction);
            const sameSeries = this.selectedPoint.series === seriesIndex;
            return this.result[`${direction}s`]
                .filter((__, index) => sameDirection
                    || (sameSeries && this.selectedPoint.index === index))
                .map((coords, index) => ({
                    color: mainColor,
                    data: [[0, 0], coords].sort().map((point) => ({
                        name: this[`${direction}Headers`][index],
                        x: point[0],
                        y: point[1],
                    })),
                    lineWidth: 1,
                    showInLegend: false,
                    type: 'spline',
                }));
        },
        /**
         * Point click event - select/deselect point
         * @param event - Event payload
         */
        pointClick(event) {
            const {index, series} = event.point;
            const {index: selectedIndex, series: selectedSeries} = this.selectedPoint;
            const isSelected = (selectedSeries === series.index && selectedIndex === index)
                || series.index > 1;
            if (isSelected) {
                this.$store.commit(caTypes.CA_UPDATE_SELECTED_POINT, {
                    series: null,
                    index: null,
                });
            }
            else {
                this.$store.commit(caTypes.CA_UPDATE_SELECTED_POINT, {
                    series: series.index,
                    index,
                });
            }
            this.pointClickCallback();
        },
    },
};
</script>

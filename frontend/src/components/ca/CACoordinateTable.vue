<template>
    <HotTable
        ref="coordTable"
        :after-change="updateTableValue"
        :after-selection-end="afterSelectionEnd"
        :cells="tableSettings.cells"
        class="button-table-fix mt-0"
        :col-headers="tableSettings.colHeaders"
        :columns="tableSettings.columns"
        current-row-class-name="handsontableSelected"
        :data="tableData"
        :fill-handle="{autoInsertRow: false, autoInsertCol: false}"
        :height="532"
    />
</template>

<script>
import HotTable from '@handsontable-pro/vue';
import Handsontable from 'handsontable-pro';
import _ from 'lodash';

import {CA_STATUS_SUP} from '@/consts/ca';
import {
    TABLE_COL_COLOR, TABLE_COL_SUP_COLOR, TABLE_ROW_COLOR, TABLE_ROW_SUP_COLOR,
} from '@/consts/color';
import {CELL_SOURCE_TYPE} from '@/consts/table';
import caResultMixin from '@/mixins/caResultMixin';
import * as caTypes from '@/store/ca/types';

/**
 * Factor name cell renderer
 */
Handsontable.renderers.registerRenderer(
    'coordFactorName',
    (instance, td, row, col, prop, value, cellProperties) => {
        Handsontable.renderers.TextRenderer.apply(this,
            [instance, td, row, col, prop, value, cellProperties]);
        if (col === 0) {
            td.style.backgroundColor = cellProperties.color;
        }
        if (!cellProperties.hasSelection) {
            td.style.color = '#000';
        }
        else if (cellProperties.selected) {
            td.style.color = '#000';
            td.style.fontWeight = 'bold';
        }
    }
);
/**
 * Selected row cells renderer
 */
Handsontable.renderers.registerRenderer(
    'selectedRow',
    (instance, td, row, col, prop, value, cellProperties) => {
        Handsontable.renderers.NumericRenderer.apply(this,
            [instance, td, row, col, prop, value, cellProperties]);
        if (!cellProperties.hasSelection) {
            td.style.color = '#000';
        }
        else if (cellProperties.selected) {
            td.style.color = '#000';
            td.style.fontWeight = 'bold';
        }
    }
);

/**
 * Correspondence analysis (CA) result coordinates table component
 */
export default {
    name: 'CACoordinateTable',
    components: {
        HotTable,
    },
    mixins: [caResultMixin],
    props: {
        /**
         * Input table data
         */
        data: {
            type: Array,
            required: true,
        },
        /**
         * Table height (px)
         */
        height: {
            type: Number,
            required: false,
            default: 300,
        },
        /**
         * Point label positions
         */
        labelPositions: {
            type: Object,
            required: true,
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
    },
    computed: {
        /**
         * Table `data` config section
         * @return {Array} Table `data` config section
         */
        tableData() {
            return [
                ..._.zipWith(this.rowHeaders, this.result.rows, this.result.rows_quality,
                    this.labelPositions.rows, (name, coords, quality, position) =>
                        [name, ...coords, 100 * quality, position.position]),
                ..._.zipWith(this.colHeaders, this.result.cols, this.result.cols_quality,
                    this.labelPositions.cols, (name, coords, quality, position) =>
                        [name, ...coords, 100 * quality, position.position]),
            ];
        },
        /**
         * Table config
         * @return {Object} Table config
         */
        tableSettings() {
            return {
                cells: (row, col) => {
                    const cellProperties = {};
                    const hasSelection = this.selectedPoint.series !== null;
                    const selectedRow = this.rowHeaders.length * this.selectedPoint.series
                        + this.selectedPoint.index;
                    if (col === 0) {
                        if (row < this.rowHeaders.length) {
                            cellProperties.color = this.rowStatuses[row] === CA_STATUS_SUP
                                ? TABLE_ROW_SUP_COLOR : TABLE_ROW_COLOR;
                        }
                        else {
                            const index = row - this.rowHeaders.length;
                            cellProperties.color = this.colStatuses[index] === CA_STATUS_SUP
                                ? TABLE_COL_SUP_COLOR : TABLE_COL_COLOR;
                        }
                    }
                    cellProperties.hasSelection = hasSelection;
                    cellProperties.selected = hasSelection && row === selectedRow;
                    return cellProperties;
                },
                colHeaders: ['', 'Dim 1', 'Dim2', 'Quality', 'Label Position'],
                columns: (index) => {
                    let obj;
                    if (index === 0) {
                        obj = {
                            type: 'text',
                            renderer: 'coordFactorName',
                            readOnly: true,
                        };
                    }
                    else if (index < 3) {
                        obj = {
                            type: 'numeric',
                            renderer: 'selectedRow',
                            numericFormat: {
                                pattern: {
                                    thousandSeparated: true,
                                    mantissa: 4,
                                },
                            },
                            readOnly: true,
                        };
                    }
                    else if (index === 3) {
                        obj = {
                            type: 'numeric',
                            renderer: 'selectedRow',
                            numericFormat: {
                                pattern: {
                                    thousandSeparated: true,
                                    mantissa: 1,
                                },
                            },
                            readOnly: true,
                        };
                    }
                    else {
                        obj = {
                            allowInvalid: false,
                            strict: true,
                            source: ['Top', 'Right', 'Bottom', 'Left'],
                            type: 'dropdown',
                        };
                    }
                    return obj;
                },
            };
        },
    },
    methods: {
        /**
         * Update data in store when `afterChange` event is emitted
         * @param {Array} change - Event payload
         * @param {string} source - Event type
         */
        updateTableValue(change, source) {
            if (!CELL_SOURCE_TYPE.includes(source)) {
                return;
            }
            // Update store
            change.forEach((changeItem) => {
                const row = changeItem[0];
                const value = changeItem[3];
                const isRow = row < this.rowHeaders.length;
                const direction = isRow ? 'rows' : 'cols';
                const index = row - !isRow * this.rowHeaders.length;
                this.$store.commit(caTypes.CA_UPDATE_LABEL_POSITION, {
                    direction,
                    index: this.labelPositions[direction][index].index,
                    value,
                });
            });
        },
        /**
         * Select/deselect point on chart after click on appropriate cell
         * @param {number} row - Selection start row index
         * @param {number} col - Selection start column index
         * @param {number} row2 - Selection end row index
         */
        afterSelectionEnd(row, col, row2) {
            if (row === row2) {
                const isRow = row < this.rowHeaders.length;
                const index = row - !isRow * this.rowHeaders.length;
                this.$store.commit(caTypes.CA_UPDATE_SELECTED_POINT, {
                    series: 1 - isRow,
                    index,
                });
                this.refresh();
            }
        },
        /**
         * Refresh (redraw) table
         */
        refresh() {
            this.$refs.coordTable.hotInstance.render();
        },
    },
};
</script>

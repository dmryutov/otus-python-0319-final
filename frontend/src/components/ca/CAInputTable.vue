<template>
    <HotTable
        ref="inputTable"
        :after-change="updateTableValue"
        :cells="tableSettings.cells"
        class="button-table-fix mt-0"
        :columns="tableSettings.columns"
        current-row-class-name="handsontableSelected"
        :merge-cells="tableSettings.mergeCells"
        :data="data"
        :height="tableSettings.height"
    />
</template>

<script>
import HotTable from '@handsontable-pro/vue';
import Handsontable from 'handsontable-pro';

import {CA_STATUSES} from '@/consts/ca';
import {TABLE_COL_COLOR, TABLE_ROW_COLOR, TABLE_ZERO_COLOR} from '@/consts/color';
import {CELL_SOURCE_TYPE} from '@/consts/table';
import * as caTypes from '@/store/ca/types';

/**
 * Factor name cell renderer
 */
Handsontable.renderers.registerRenderer(
    'factorName',
    (instance, td, row, col, prop, value, cellProperties) => {
        Handsontable.renderers.TextRenderer.apply(this,
            [instance, td, row, col, prop, value, cellProperties]);
        td.style.fontWeight = 'bold';
        if (col === 0 && row !== 0) {
            td.style.backgroundColor = TABLE_ROW_COLOR;
        }
        if (row === 0 && col !== 0) {
            td.style.backgroundColor = TABLE_COL_COLOR;
        }
        if (cellProperties.zero) {
            td.style.backgroundColor = TABLE_ZERO_COLOR;
        }
    }
);
/**
 * Factor status cell renderer
 */
Handsontable.renderers.registerRenderer(
    'factorStatus',
    (instance, td, row, col, prop, value, cellProperties) => {
        Handsontable.renderers.AutocompleteRenderer.apply(this,
            [instance, td, row, col, prop, value, cellProperties]);
        if (col === 1) {
            td.style.backgroundColor = TABLE_ROW_COLOR;
        }
        if (row === 1) {
            td.style.backgroundColor = TABLE_COL_COLOR;
        }
        if (cellProperties.zero) {
            td.style.backgroundColor = TABLE_ZERO_COLOR;
        }
    }
);
/**
 * Factor value cell renderer
 */
Handsontable.renderers.registerRenderer(
    'factorValue',
    (instance, td, row, col, prop, value, cellProperties) => {
        Handsontable.renderers.NumericRenderer.apply(this,
            [instance, td, row, col, prop, value, cellProperties]);
        if (cellProperties.zero) {
            td.style.backgroundColor = TABLE_ZERO_COLOR;
        }
        if (value < 0) {
            td.className += ' htInvalid';
        }
    }
);

/**
 * Correspondence analysis (CA) input table component
 */
export default {
    name: 'CAInputTable',
    components: {
        HotTable,
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
         * Table meta data about input table rows and columns
         */
        meta: {
            type: Object,
            required: true,
        },
    },
    computed: {
        /**
         * Table config
         * @return {Object} Table config
         */
        tableSettings() {
            const {meta} = this;
            return {
                cells(row, col) {
                    const cellProperties = {};
                    if (row === 0) {
                        cellProperties.renderer = 'factorName';
                    }
                    if (row === 1) {
                        cellProperties.allowInvalid = false;
                        cellProperties.renderer = 'factorStatus';
                        cellProperties.skipRowOnPaste = true;
                        cellProperties.source = CA_STATUSES;
                        cellProperties.type = 'dropdown';
                    }
                    if (col === 1) {
                        cellProperties.skipColumnOnPaste = true;
                    }
                    if (row <= 1 && col <= 1) {
                        cellProperties.readOnly = true;
                    }
                    if (row > 1 && col > 1) {
                        cellProperties.numericFormat = {
                            pattern: {
                                thousandSeparated: true,
                                mantissa: 3,
                            },
                        };
                        cellProperties.renderer = 'factorValue';
                        cellProperties.type = 'numeric';
                    }
                    cellProperties.zero = (meta.rows[row - 2] || {}).zero
                        || (meta.cols[col - 2] || {}).zero;
                    return cellProperties;
                },
                columns: (index) => {
                    let obj;
                    if (index === 0) {
                        obj = {
                            renderer: 'factorName',
                            type: 'text',
                        };
                    }
                    else if (index === 1) {
                        obj = {
                            allowInvalid: false,
                            renderer: 'factorStatus',
                            strict: true,
                            source: CA_STATUSES,
                            type: 'dropdown',
                        };
                    }
                    else {
                        obj = {
                            type: 'text',
                        };
                    }
                    return obj;
                },
                height: window.innerHeight - 220,
                mergeCells: [
                    {
                        row: 0,
                        col: 0,
                        rowspan: 2,
                        colspan: 2,
                    },
                ],
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
            // Check if cell is out of table
            let maxRow = 1;
            let maxCol = 1;
            change.forEach((changeItem) => {
                const row = changeItem[0] + 1;
                const col = changeItem[1] + 1;
                if (row > maxRow) {
                    maxRow = row;
                }
                if (col > maxCol) {
                    maxCol = col;
                }
            });
            if (maxRow > this.data.length || maxCol > this.data[1].length) {
                this.$store.commit(caTypes.CA_RESIZE_DATA, {
                    cols: maxCol,
                    rows: maxRow,
                });
            }
            // Update store
            change.forEach((changeItem) => {
                const row = changeItem[0];
                const col = changeItem[1];
                const value = changeItem[3];
                this.$store.commit(caTypes.CA_UPDATE_DATA, {
                    row,
                    col,
                    value,
                });
            });
        },
    },
};
</script>

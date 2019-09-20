<template>
    <HotTable
        ref="inputTable"
        :after-change="updateTableValue"
        class="button-table-fix mt-0"
        :col-headers="tableSettings.colHeaders"
        :columns="tableSettings.columns"
        current-row-class-name="handsontableSelected"
        :merge-cells="tableSettings.mergeCells"
        :data="tableData"
        :fill-handle="{autoInsertCol: false}"
        :height="tableSettings.height"
        :row-headers="true"
    />
</template>

<script>
import HotTable from '@handsontable-pro/vue';
import _ from 'lodash';

import {CELL_SOURCE_TYPE} from '@/consts/table';
import * as stlTypes from '@/store/stl/types';

/**
 * Time series decomposition (STL) input table component
 */
export default {
    name: 'STLInputTable',
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
         * Time series decomposition results
         */
        result: {
            validator: (prop) => typeof prop === 'object' || prop === null,
            required: true,
        },
    },
    computed: {
        /**
         * Table `data` config section
         * @return {Array} Table `data` config section
         */
        tableData() {
            if (this.data.length) {
                return _.zip(...[
                    this.data,
                    ...(this.result ? [
                        this.result.trend,
                        this.result.seasonal,
                        this.result.resid,
                    ] : []),
                ]);
            }
            return [['Paste here...']];
        },
        /**
         * Table config
         * @return {Object} Table config
         */
        tableSettings() {
            return {
                colHeaders: ['Observed', 'Trend', 'Seasonal', 'Residual'],
                columns: (index) => {
                    let obj;
                    if (index === 0) {
                        obj = {
                            numericFormat: {
                                pattern: {
                                    mantissa: 2,
                                    thousandSeparated: true,
                                },
                            },
                            type: 'numeric',
                        };
                    }
                    else {
                        obj = {
                            numericFormat: {
                                pattern: {
                                    mantissa: 2,
                                    thousandSeparated: true,
                                },
                            },
                            readOnly: true,
                            type: 'numeric',
                        };
                    }
                    return obj;
                },
                height: window.innerHeight - 220,
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
            change.forEach((changeItem) => {
                const row = changeItem[0] + 1;
                if (row > maxRow) {
                    maxRow = row;
                }
            });
            if (maxRow > this.data.length) {
                this.$store.commit(stlTypes.STL_RESIZE_DATA, {
                    rows: maxRow,
                });
            }
            // Update store
            change.forEach((changeItem) => {
                const row = changeItem[0];
                const value = changeItem[3];
                this.$store.commit(stlTypes.STL_UPDATE_DATA, {
                    row,
                    value,
                });
            });
        },
        /**
         * Refresh (redraw) table (just to fix column settings bug)
         */
        refresh() {
            this.$refs.inputTable.hotInstance.updateSettings({columns: this.tableSettings.columns});
            this.$refs.inputTable.hotInstance.render();
        },
    },
};
</script>

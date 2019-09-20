<template>
    <HotTable
        class="button-table-fix table-read-only mt-0"
        :col-headers="tableSettings.colHeaders"
        :columns="tableSettings.columns"
        current-row-class-name="handsontableSelected"
        :data="tableData"
        :height="height"
        :read-only="true"
    />
</template>

<script>
import HotTable from '@handsontable-pro/vue';
import Handsontable from 'handsontable-pro';

import {cumSum} from '@/utils/containers';

/**
 * Low cumulative percentage warning renderer
 */
Handsontable.renderers.registerRenderer(
    'lowPercent',
    (instance, td, row, col, prop, value, cellProperties) => {
        Handsontable.renderers.NumericRenderer.apply(this,
            [instance, td, row, col, prop, value, cellProperties]);
        if (col === 2 && row === 1 && value < 75) {
            td.className += ' htInvalid';
        }
    }
);

/**
 * Correspondence analysis (CA) explain table component
 */
export default {
    name: 'CAExplainTable',
    components: {
        HotTable,
    },
    props: {
        /**
         * Principle components explain percentage
         */
        explained: {
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
    },
    computed: {
        /**
         * Table `data` config section
         * @return {Array} Table `data` config section
         */
        tableData() {
            const cumPercentage = cumSum(this.explained);
            return this.explained.map((percent, index) => [
                `Dim ${index + 1}`,
                percent,
                cumPercentage[index],
            ]);
        },
        /**
         * Table config
         * @return {Object} Table config
         */
        tableSettings() {
            return {
                colHeaders: ['', 'Percentage', 'Cum. Percentage'],
                columns: (index) => {
                    let obj;
                    if (index === 0) {
                        obj = {
                            type: 'text',
                        };
                    }
                    else {
                        obj = {
                            numericFormat: {
                                pattern: {
                                    thousandSeparated: true,
                                    mantissa: 2,
                                },
                            },
                            renderer: 'lowPercent',
                            type: 'numeric',
                        };
                    }
                    return obj;
                },
            };
        },
    },
};
</script>

<style lang="scss">
    .table-read-only .htDimmed {
        color: #000;
    }
</style>

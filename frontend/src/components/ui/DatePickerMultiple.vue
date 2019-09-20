<template>
    <v-menu
        v-model="visible"
        :close-on-content-click="false"
        :disabled="disabled"
        full-width
        max-width="290"
    >
        <v-combobox
            slot="activator"
            :clearable="clearable"
            :disabled="disabled"
            :error-messages="errorMessages"
            :hint="hint"
            :label="label"
            multiple
            :prepend-icon="icon"
            readonly
            :value="formattedDate"
            @blur="$emit('blur')"
            @input="onChange"
        >
            <template slot="selection" slot-scope="{item}">
                <v-chip
                    close
                    small
                    @input="removeItem(item)"
                >
                    {{ item }}
                </v-chip>
            </template>
        </v-combobox>
        <v-date-picker
            :allowed-dates="allowedDates"
            first-day-of-week="1"
            :max="maxDate"
            :min="minDate"
            multiple
            :no-title="!showTitle"
            :type="type"
            :value="value"
            @change="visible = false"
            @input="onChange"
        />
    </v-menu>
</template>

<script>
import moment from 'moment';

/**
 * Multiple dates picker component
 */
export default {
    name: 'DatePickerMultiple',
    $_veeValidate: {
        value() {
            return this.value;
        },
    },
    props: {
        /**
         * Defines whether input should be clearable
         */
        clearable: {
            type: Boolean,
            required: false,
            default: false,
        },
        /**
         * Defines whether input should be disabled
         */
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
        /**
         * Restricts which dates can be selected
         */
        disabledDays: {
            type: Function,
            required: false,
            default: null,
        },
        /**
         * Validation errors
         */
        errorMessages: {
            type: Array,
            required: false,
            default: null,
        },
        /**
         * Date format
         */
        format: {
            type: String,
            required: false,
            default: 'DD.MM.YYYY',
        },
        /**
         * Input hint text
         */
        hint: {
            type: String,
            required: false,
            default: null,
        },
        /**
         * Prepends an icon inside the component
         */
        icon: {
            type: String,
            required: false,
            default: null,
        },
        /**
         * Input label
         */
        label: {
            type: String,
            required: true,
        },
        /**
         * Maximum allowed date/month
         */
        maxDate: {
            type: String,
            required: false,
            default: null,
        },
        /**
         * Minimum allowed date/month
         */
        minDate: {
            type: String,
            required: false,
            default: null,
        },
        /**
         * Defines whether to show calendar title
         */
        showTitle: {
            type: Boolean,
            required: false,
            default: false,
        },
        /**
         * Determines the type of the picker - `date` for date picker, `month` for month picker
         */
        type: {
            type: String,
            required: false,
            default: 'date',
        },
        /**
         * Input value
         */
        value: {
            type: Array,
            required: false,
            default: () => [],
        },
    },
    data() {
        return {
            /**
             * Defines whether to show date picker
             */
            visible: false,
        };
    },
    computed: {
        /**
         * Change date format
         * @return {string} Formatted date
         */
        formattedDate() {
            return this.value.map((date) => moment(date).format(this.format));
        },
    },
    methods: {
        /**
         * Change input value
         * @param value - New input value
         */
        onChange(value) {
            this.$emit('input', value);
        },
        /**
         * Remove selected value
         * @param value - Old input value
         */
        removeItem(value) {
            const index = this.formattedDate.findIndex((date) => date === value);
            this.value.splice(index, 1);
        },
        /**
         * Restricts which dates can be selected
         * @param {string} date - Current date
         * @return {boolean} True if date should be allowed
         */
        allowedDates(date) {
            return this.disabledDays ? !this.disabledDays(new Date(date)) : true;
        },
    },
};
</script>

<style lang="scss">
    .v-select .v-chip {
        z-index: 0;
    }
</style>

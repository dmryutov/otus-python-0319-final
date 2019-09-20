<template>
    <v-menu
        v-model="visible"
        :close-on-content-click="false"
        :disabled="disabled"
        full-width
        max-width="290"
    >
        <v-text-field
            slot="activator"
            :clearable="clearable"
            :disabled="disabled"
            :error-messages="errorMessages"
            :hint="hint"
            :label="label"
            :prepend-icon="icon"
            readonly
            :value="formattedDate"
            @blur="$emit('blur')"
            @input="onChange"
        />
        <v-date-picker
            :allowed-dates="allowedDates"
            first-day-of-week="1"
            :max="maxDate"
            :min="minDate"
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
 * Date picker component
 */
export default {
    name: 'DatePicker',
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
            validator: (prop) => typeof prop === 'string' || prop === null,
            required: false,
            default: null,
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
            return this.value ? moment(this.value).format(this.format) : '';
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

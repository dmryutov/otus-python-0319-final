/**
 * Correspondence analysis (CA) result components base mixin
 */
export default {
    computed: {
        /**
         * Get row headers
         * @return {Array} Row headers
         */
        rowHeaders() {
            return this.data.slice(2).map((row) => row[0]);
        },
        /**
         * Get column headers
         * @return {Array} Column headers
         */
        colHeaders() {
            return this.data[0].slice(2);
        },
        /**
         * Get row statuses
         * @return {Array} Row statuses
         */
        rowStatuses() {
            return this.data.slice(2).map((row) => row[1]);
        },
        /**
         * Get column statuses
         * @return {Array} Column statuses
         */
        colStatuses() {
            return this.data[1].slice(2);
        },
    },
};

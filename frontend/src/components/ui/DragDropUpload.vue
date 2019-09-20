<template>
    <div
        class="dropzone"
        :class="{'d-none': !isDragging}"
        @dragover.prevent
        @dragleave.prevent="isDragging = false"
        @drop.prevent="onDrop($event)"
    >
        <div class="drop-text">
            <i />
            <h2>Drag & Drop Files Here</h2>
        </div>
    </div>
</template>

<script>
/**
 * Drag-n-drop file uploader component
 */
export default {
    name: 'DragDropUpload',
    props: {
        /**
         * Form field name
         */
        fieldName: {
            type: String,
            required: false,
            default: 'import_file',
        },
        /**
         * HTML form with `<input type="file">`
         */
        form: {
            type: [HTMLFormElement, Object],
            default: null,
        },
        /**
         * Callback which is emitted when file has been added to field
         */
        sendFile: {
            type: Function,
            required: true,
        },
    },
    data() {
        return {
            /**
             * Defines whether file is dragging over component
             */
            isDragging: false,
        };
    },
    /**
     * Connect window events with component methods when the component has been loaded
     */
    mounted() {
        window.addEventListener('dragenter', this.onDragEnter);
    },
    /**
     * Disconnect window events from component methods before the component has been destroyed
     */
    beforeDestroy() {
        window.removeEventListener('dragenter', this.onDragEnter);
    },
    methods: {
        /**
         * Update `isDragging` status when `dragenter` event is emitted
         */
        onDragEnter(event) {
            event.preventDefault();
            this.isDragging = true;
        },
        /**
         * Fill `FormData` and send it to server
         */
        onDrop(event) {
            this.isDragging = false;
            // Initiate data
            const {dataTransfer} = event;
            const formData = new FormData(this.form);

            // Filter files
            if (dataTransfer.items) {
                Object.keys(dataTransfer.items).forEach((key) => {
                    const file = dataTransfer.items[key];
                    if (file.kind === 'file' && file.type) {
                        formData.append(this.fieldName, file.getAsFile());
                    }
                });
            }
            else {
                Object.keys(dataTransfer.files).forEach((key) => {
                    const file = dataTransfer.files[key];
                    if (file.type) {
                        formData.append(this.fieldName, file);
                    }
                });
            }

            // Send files
            this.sendFile(formData);

            // Remove drag data
            if (dataTransfer.items) {
                dataTransfer.items.clear();
            }
            else {
                dataTransfer.clearData();
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .dropzone {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background: #f5f5f5cc;
        border: 3px #607d8b dashed;

        i {
            content: url('../../assets/img/arrow.png');
        }

        h2 {
            margin: 0;
            color: #676b6f;
            font-size: 24px;
        }

        .drop-text {
            text-align: center;
        }
    }
</style>

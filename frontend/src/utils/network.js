/**
 * Download file
 * @param {string} fileName - File name
 * @param {string} data - Raw file data
 */
export const downloadFile = (fileName, data) => {
    if (!window.navigator.msSaveOrOpenBlob) {
        // BLOB NAVIGATOR
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(new Blob([data]));
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    else {
        // BLOB FOR EXPLORER 11
        window.navigator.msSaveOrOpenBlob(new Blob([data]), fileName);
    }
};

import store from '@/store/index';
import * as homeTypes from '@/store/home/types';


/**
 * Notification icon mapping
 */
const ICON = {
    success: 'mdi-check-circle',
    info: 'mdi-information',
    warning: 'mdi-alert',
    error: 'mdi-alert',
};


/**
 * Show notification
 * @param {string} level - Notification level
 * @param {string} message - Notification message
 * @param {?string} title - Notification title
 * @param {number} timeout - Time before notification closing
 */
export const showNotification = (level, message, title = null, timeout = 4000) => {
    window.vueApp.$toast(message, {
        title,
        color: level,
        icon: ICON[level],
        timeout,
        x: 'right',
        y: 'top',
        autoHeight: true,
    });
};


/**
 * Show notification with API request error message
 * @param response - Response object
 * @param {string} action - Current action
 */
export const requestErrorNotification = (response, action) => {
    switch (response.status) {
    case 401:
        break;
    case 403:
    case 404:
        showNotification('error', 'You have no access to this object');
        break;
    default:
        if (response.data && response.data.code) {
            showNotification('warning', response.data.message, `Error ${response.data.code}`, 7000);
        }
        else {
            showNotification('error', `An error occurred while ${action}!`);
        }
    }
};


/**
 * Show page loader, wait response from server and then perform some actions
 * @param {Array|Promise} promises - List of promises (requests to server)
 * @param {function} callback - Action that should be performed after page loading
 */
export const showPageLoader = (promises, callback = () => {}) => {
    store.commit(homeTypes.START_LOADING);
    return Promise.all(Array.isArray(promises) ? promises : [promises]).then(async () => {
        await callback();
        store.commit(homeTypes.STOP_LOADING);
    });
};

import axios from 'axios';

import store from '@/store/index';
import * as userTypes from '@/store/user/types';
import {jwtToken} from '@/utils/user';


/**
 * Create new Axios instance
 * @param {string} baseURL - API base URL
 * @return {Object} Axios instance
 */
const createAxiosInstance = (baseURL) => {
    // Create new Axios instance and configure it with default settings
    const instance = axios.create({
        baseURL,
        xsrfHeaderName: 'X-CSRFTOKEN',
        xsrfCookieName: 'csrftoken',
    });

    // Create Axios request interceptor that adds JWT access token to each request
    instance.interceptors.request.use(
        (config) => {
            config.headers.Authorization = jwtToken();
            return config;
        },
        (error) => Promise.reject(error)
    );

    // Create Axios response interceptor that refreshes JWT access token when it expires
    const createInterceptor = () => {
        const interceptor = instance.interceptors.response.use(
            (response) => response,
            (error) => {
                // Reject promise if common error
                if (error.response.status !== 401) {
                    return Promise.reject(error.response);
                }
                // When response code is 401, try to refresh token.
                // Eject interceptor to avoid infinite loop when token refresh causes 401 response
                instance.interceptors.response.eject(interceptor);
                return store.dispatch(userTypes.REFRESH_TOKEN)
                    .then(() => {
                        error.response.config.headers.Authorization = jwtToken();
                        error.response.config.url = error.response.config.url.replace(/^\/api/, '');
                        return instance(error.response.config);
                    }).catch((response) => {
                        store.commit(userTypes.LOGOUT);
                        return Promise.reject(response);
                    }).finally(createInterceptor);
            }
        );
    };
    createInterceptor();

    return instance;
};


const axiosInstance = createAxiosInstance(process.env.VUE_APP_API_URL);

export default axiosInstance;

import VueCookies from 'vue-cookies';

import {TOKEN_ACCESS} from '@/consts/user';


/**
 * Get JWT access token from cookies
 * @return {string} JWT access token
 */
export const jwtToken = () => `JWT ${VueCookies.get(TOKEN_ACCESS)}`;


/**
 * Parse user authentication information from token
 * @param {Object} token - Authentication data
 * @return {Object} User data
 */
export const parseUserToken = (token) => {
    if (token) {
        return {
            token,
            ...JSON.parse(atob(token.split('.')[1])),
        };
    }
    return {};
};

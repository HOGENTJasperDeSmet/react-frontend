import axiosRoot from 'axios';
import config from '../config.json';

export const axios = axiosRoot.create({
    baseURL: config.base_url,
    // baseURL: process.env.REACT_APP_API_URL,
});

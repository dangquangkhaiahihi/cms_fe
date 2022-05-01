import axios from 'axios';
import { BASE_URL } from './constant';

export function singleUploadApi(url, file) {
    const formData = new FormData();
    formData.append("file", file);
    const options = {
        headers: {
            Authorization: sessionStorage.getItem('access_token') || '',
            Accept: 'application/json',
        },
        mode: 'cors',
        method: 'POST',
        data: formData
    }

    if (!url.startsWith('http')) {
        if (!url.startsWith('/')) {
            options.url = `/${url}`;
        }
        options.url = BASE_URL + url;
    } else {
        options.url = url;
    }
    return axios(options).then((response) => {
        return response.data;
    }).catch((error) => {
        if (error.response && error.response.data) {
            return {
            result: {
                success: false,
                error_code: error.response.data.error,
                message: error.response.data.message
            }
            };
        }
        return {
            result: {
            success: false,
            error_code: 'SEND_REQUEST_FAILED',
            message: error
            }
        };
    });
};

export function multiUploadApi(url, files = []) {
    const formData = new FormData();
    files.forEach(file => {
        formData.append("files", file);
    });
    const options = {
        headers: {
            Authorization: sessionStorage.getItem('access_token') || '',
            Accept: 'application/json',
        },
        mode: 'cors',
        method: 'POST',
        data: formData
    }

    if (!url.startsWith('http')) {
        if (!url.startsWith('/')) {
            options.url = `/${url}`;
        }
        options.url = BASE_URL + url;
    } else {
        options.url = url;
    }
    return axios(options).then((response) => {
        return response.data;
    }).catch((error) => {
        if (error.response && error.response.data) {
            return {
            result: {
                success: false,
                error_code: error.response.data.error,
                message: error.response.data.message
            }
            };
        }
        return {
            result: {
            success: false,
            error_code: 'SEND_REQUEST_FAILED',
            message: error
            }
        };
    });
};
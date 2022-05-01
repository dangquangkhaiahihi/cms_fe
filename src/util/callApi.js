import axios from 'axios';
import { BASE_URL } from './constant';

// import Router from 'next/router';
// import { NotificationManager } from 'react-notifications'; 

const callApi = function callApi(url, options) {
  const accessToken = localStorage.getItem('access_token') || '';
  if (!options.mode) {
    options.mode = 'cors';
  }
  if (options.headers) {
    if (!options.headers['Content-Type']) {
      Object.assign(options.headers, { 'Content-Type': 'application/json' });
    }
    if (options.headers.Authorization == null) {
      options.headers.Authorization = accessToken;
    }
    if (options.headers.Accept == null) {
      options.headers.Accept = 'application/json';
    }
  } else {
    options.headers = {
      'Content-Type': 'application/json',
      Authorization: accessToken,
      Accept: 'application/json',
    };
  }

  if (!url.startsWith('http')) {
    if (!url.startsWith('/')) {
      options.url = `/${url}`;
    }
    options.url = BASE_URL + url;
  } else {
    options.url = url;
  }
  return axios(options)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("ggggggggggggggggggggggggggggggggggg",error.response);
      if (error.response && error.response.data) {
        if (error.response.data.error === 'Unauthorized') {
          NotificationManager.error("Unauthorized", "ROLE_ERROR", 5000);
          Router.push('/login');
          return;
        }
        if (error.response.data.error === 'Forbidden') {
          NotificationManager.error("Invalid role", "ROLE_ERROR", 5000);
          Router.push('/');
          return;
          // return {
          //   result: {
          //     success: false,
          //     error_code: error.response.data.error,
          //     message: 'Tài khoản không có quyền thao tác'
          //   },
          // };
        }
        return {
          result: {
            success: false,
            error_code: error.response.data.code,
            message: error.response.data.desc
          },
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

export default callApi;

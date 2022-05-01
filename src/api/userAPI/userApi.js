import callApi from "../../util/callApi";
import { getUrlFromQuery } from "../../util/urlUtil";
import { callApiNotAuth } from "../../util/callApiNotAuth";

export function login(username, password) {
    const endPoint = '/auth/login';
    const request = {
        username,
        password
    }
    const options = {
        method: 'POST',
        data: JSON.stringify(request)
    };
    return callApiNotAuth(endPoint, options).then(body => {
        return body;
    });
}

export function changePassword(request) {
    const endPoint = `/users/change_password`;
    const options = {
        method: 'POST',
        data: JSON.stringify(request)
    };
    return callApi(endPoint, options).then(body => {
        return body;
    });
}

export function logout() {
    const endPoint = `/users/logout`;
    const options = {
        method: 'GET'
    };
    return callApi(endPoint, options).then(body => {
        return body;
    });
}

export function searchUser(page, size, searchForm) {
    let endPoint = `/users?page=${page}&size=${size}`;
    if(searchForm.keyword) endPoint += `&keyword=${searchForm.keyword}`;
    if(searchForm.status) endPoint += `&status=${searchForm.status}`;
    if(searchForm.area) endPoint += `&area=${searchForm.area}`;
    if(searchForm.role) endPoint += `&role=${searchForm.role}`;

    const options = {
        method: 'GET'
    };
    return callApi(endPoint, options);
}

// export function lockUser(id) {
//     const endPoint = `/user/lock/${id}`;
//     const options = {
//         method: 'PUT'
//     };
//     return callApi(endPoint, options).then(body => {
//         return body;
//     });
// }

// export function unlockUser(id) {
//     const endPoint = `/user/unlock/${id}`;
//     const options = {
//         method: 'PUT'
//     };
//     return callApi(endPoint, options).then(body => {
//         return body;
//     });
// }

// export function resetPassword(id) {
//     const endPoint = `/user/reset-pass/${id}`;
//     const options = {
//         method: 'PUT'
//     };
//     return callApi(endPoint, options).then(body => {
//         return body;
//     });
// }

// export function createUser(request) {
//     const endPoint = '/user';
//     const options = {
//         method: 'POST',
//         data: JSON.stringify(request)
//     };
//     return callApi(endPoint, options).then(body => {
//         return body;
//     });
// }

// export function editUser(request) {
//     const endPoint = '/user';
//     const options = {
//         method: 'PUT',
//         data: JSON.stringify(request)
//     };
//     return callApi(endPoint, options).then(body => {
//         return body;
//     });
// }

// export function getUserDetail(id) {
//     const endPoint = `/user/${id}`;
//     const options = {
//         method: 'GET'
//     };
//     return callApi(endPoint, options).then(body => {
//         return body;
//     });
// }
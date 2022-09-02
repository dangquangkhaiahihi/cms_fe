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

export function getUserDetail(id) {
    const endPoint = `/users/${id}`;
    const options = {
        method: 'GET'
    };
    return callApi(endPoint, options).then(body => {
        return body;
    });
}


export function editUser(request,id) {
    const endPoint = `/users/${id}`;
    const options = {
        method: 'PUT',
        data: JSON.stringify(request)
    };
    return callApi(endPoint, options).then(body => {
        return body;
    });
}

export function addUser(request,file) {
    const formData = new FormData();
    console.log('api,file',file);
    if(file){
        formData.append("photo", file);
    }
    formData.append("email", request.email);
    formData.append("firstName", request.firstName);
    formData.append("lastName", request.lastName);
    formData.append("phoneNumber", request.phoneNumber);
    formData.append("dob", request.dob);
    formData.append("socialSecurityNum", request.socialSecurityNum);
    formData.append("areas", request.areas);
    formData.append("areaCode", request.areaCode);
    formData.append("role", request.role);

    const endPoint = `/users`;
    const options = {
        method: 'POST',
        data:formData
    };
    return callApi(endPoint, options).then(body => {
        return body;
    });
}

export function getAllActiveAreas() {
    const endPoint = `/users/getAllActiveAreas`;
    const options = {
        method: 'GET'
    };
    return callApi(endPoint, options).then(body => {
        return body;
    });
}

export function lockOrUnlockUser(id){
    const url = `/users/lockAndUnlock/${id}`;
    const options = {
        method: 'PUT'
    }
    return callApi(url, options);
}

export function resetPassword(id) {
    const endPoint = `/users/reset_password/${id}`;
    const options = {
        method: 'PUT'
    };
    return callApi(endPoint, options).then(body => {
        return body;
    });
}



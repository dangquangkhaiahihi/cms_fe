import callApi from "../../util/callApi";
import { getUrlFromQuery } from "../../util/urlUtil";
import { callApiNotAuth } from "../../util/callApiNotAuth";

export function searchArea(page, size, searchForm){
    let url = `/area?page=${page}&size=${size}`;
    if(searchForm.searchCode) url += `&code=${searchForm.searchCode}`;
    if(searchForm.status) url += `&status=${searchForm.status}`;
    console.log("serviceForm: ", searchForm);

    const options = {
        method: 'GET',
    }

    return callApi(url, options);
}

export function getAreaById(id){
    const url = `/area/${id}`;
    const options = {
        method: 'GET'
    }
    return callApi(url, options);
}

export function lockOrUnlockArea(id){
    const url = `/area/lockAndUnlock/${id}`;
    const options = {
        method: 'PUT'
    }
    return callApi(url, options);
}

export function editArea(request,id) {
    const endPoint = `/area/${id}`;
    const options = {
        method: 'PUT',
        data: JSON.stringify(request)
    };
    return callApi(endPoint, options).then(body => {
        return body;
    });
}

export function createArea(request) {
    const endPoint = `/area`;
    const options = {
        method: 'POST',
        data: JSON.stringify(request)
    };
    return callApi(endPoint, options).then(body => {
        return body;
    });
}
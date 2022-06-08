import callApi from "../../util/callApi";

export function searchArea(page, size, searchForm){
    let url = `/area?page=${page}&size=${size}`;
    if(searchForm.keyword) url += `&keyword=${searchForm.keyword}`;
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
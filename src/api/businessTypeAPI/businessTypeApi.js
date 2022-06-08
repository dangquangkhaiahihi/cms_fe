import callApi from "../../util/callApi";

export function searchBusinessType(page, size, searchForm){
    let url = `/business_type?page=${page}&size=${size}`;
    if(searchForm.keyword) url += `&keyword=${searchForm.keyword}`;
    if(searchForm.status) url += `&status=${searchForm.status}`;

    const options = {
        method: 'GET',
    }

    return callApi(url, options);
}

export function getBusinessTypeById(id){
    const url = `/business_type/${id}`;
    const options = {
        method: 'GET'
    }
    return callApi(url, options);
}

export function lockOrUnlockBusinessType(id){
    const url = `/business_type/lockAndUnlock/${id}`;
    const options = {
        method: 'PUT'
    }
    return callApi(url, options);
}

export function editBusinessType(request,id) {
    const endPoint = `/business_type/${id}`;
    const options = {
        method: 'PUT',
        data: JSON.stringify(request)
    };
    return callApi(endPoint, options).then(body => {
        return body;
    });
}

export function createBusinessType(request) {
    const endPoint = `/business_type`;
    const options = {
        method: 'POST',
        data: JSON.stringify(request)
    };
    return callApi(endPoint, options).then(body => {
        return body;
    });
}
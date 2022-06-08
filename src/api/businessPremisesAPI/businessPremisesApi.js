import callApi from "../../util/callApi";

export function searchBusinessPremises(page, size, searchForm){
    let url = `/business_premises?page=${page}&size=${size}`;
    if(searchForm.keyword) url += `&keyword=${searchForm.keyword}`;
    if(searchForm.area) url += `&area=${searchForm.area}`;
    if(searchForm.businessType) url += `&businessType=${searchForm.businessType}`;
    if(searchForm.foodSafetyCertificateProvidedBy) url += `&foodSafetyCertificateProvidedBy=${searchForm.foodSafetyCertificateProvidedBy}`;
    if(searchForm.licenseStatus) url += `&licenseStatus=${searchForm.licenseStatus}`;
    if(searchForm.certificateStatus) url += `&certificateStatus=${searchForm.certificateStatus}`;
    if(searchForm.warningStatus) url += `&warningStatus=${searchForm.warningStatus}`;
    console.log("serviceForm: ", searchForm);

    const options = {
        method: 'GET',
    }

    return callApi(url, options);
}

export function getAllActiveBusinessType() {
    const endPoint = `/business_premises/getAllActiveBusinessType`;
    const options = {
        method: 'GET'
    };
    return callApi(endPoint, options).then(body => {
        return body;
    });
}

export function createBusinessPremises(request) {
    const endPoint = `/business_premises`;
    const options = {
        method: 'POST',
        data: JSON.stringify(request)
    };
    return callApi(endPoint, options).then(body => {
        return body;
    });
}

export function editBusinessPremises(request,id) {
    const endPoint = `/business_premises/${id}`;
    const options = {
        method: 'POST',
        data: JSON.stringify(request)
    };
    return callApi(endPoint, options).then(body => {
        return body;
    });
}

export function getBusinessPremisesById(id){
    const url = `/business_premises/${id}`;
    const options = {
        method: 'GET'
    }
    return callApi(url, options);
}

export function addOrUpdateLicenses(req,id){
    const url = `/business_premises/add_licenses/${id}`;
    console.log(id);
    const saveReq = {
        licenses : []
    }
    saveReq.licenses = req;
    
    const options = {
        method: 'POST',
        data: JSON.stringify(saveReq)
    }
    return callApi(url, options);
}

export function addOrUpdatePeople(req,id){
    const url = `/business_premises/add_people/${id}`;
    const saveReq = {
        personSaveRequests : []
    };
    saveReq.personSaveRequests = req;

    const options = {
        method: 'POST',
        data: JSON.stringify(saveReq)
    }
    return callApi(url, options);
}

export function inspectBusinessPremises(req,id){
    const url = `/business_premises/update_inspect/${id}`;

    const options = {
        method: 'PUT',
        data: JSON.stringify(req)
    }
    return callApi(url, options);
}


// export function lockOrUnlockArea(id){
//     const url = `/area/lockAndUnlock/${id}`;
//     const options = {
//         method: 'PUT'
//     }
//     return callApi(url, options);
// }

// export function editArea(request,id) {
//     const endPoint = `/area/${id}`;
//     const options = {
//         method: 'PUT',
//         data: JSON.stringify(request)
//     };
//     return callApi(endPoint, options).then(body => {
//         return body;
//     });
// }

// export function createArea(request) {
//     const endPoint = `/area`;
//     const options = {
//         method: 'POST',
//         data: JSON.stringify(request)
//     };
//     return callApi(endPoint, options).then(body => {
//         return body;
//     });
// }
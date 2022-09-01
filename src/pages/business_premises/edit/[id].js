import React, { useState, useEffect }  from "react";
import { useRouter } from "next/dist/client/router";
import LayoutPortal from "../../../components/layout/LayoutPortal";
import ModalDetail from "../../../components/templates/modal/ModalDetail";
import { getAllActiveBusinessType, editBusinessPremises, getBusinessPremisesById } from "../../../api/businessPremisesAPI/businessPremisesApi";
import { getAllActiveAreas } from "../../../api/userAPI/userApi";

export default function EditBusinessPremises() {
    const router = useRouter();

    const premisesId = router.query.id;

    const [editRequest, setEditRequest] = useState({
        name:"",
        addressDetail:"",
        addressGeneral:"",
        businessTypeCode:"",
        areaCode:""
    });
    const [editRequestTemp, setEditRequestTemp] = useState({});
    const { name, addressDetail, addressGeneral, businessTypeCode, areaCode } = editRequest;
    console.log("editRequest", editRequest);

    const [error, setError] = useState("");
    const [isShowError, setIsShowError] = useState(false);

    const [areaOptions, setAreaOptions] = useState([]);
    const [businessTypeOptions, setBusinessTypeOptions] = useState([]);

    const [selectedType, setSelectedType] = useState({
        code: "",
        name: ""
    })
    const [selectedArea, setSelectedArea] = useState({
        code: "",
        name: ""
    })

    useEffect(() => {
        window["loadJsDefault"]();
        console.log("Call load JS Default by another page");
        getAreas();
        getBusinessTypes();
    }, []);

    useEffect(() => {
        if (premisesId) {
            getBusinessPremisesById(premisesId).then(body => {
            if(body.data){
                setEditRequestTemp(body.data)
                setEditRequest(body.data);
                getAreas();
                getBusinessTypes();
            }else{
                moveToOtherPage("/business_premises");
            }
        });
        }
    }, []);

    useEffect(() => {
        let selectedType1 = {
            code: "",
            name: ""
        }
    
        if(editRequest.businessType !== ""){
            for (const type of businessTypeOptions) {
                if (type.name == editRequest.businessType) {
                    selectedType1 = { ...type }
                    break;
                } 
            }
    
            setSelectedType(selectedType1);
            editRequest["businessTypeCode"] = selectedType.code;
        }
    }, [editRequest,businessTypeOptions])

    useEffect(() => {
        let selectedArea1 = {
            code: "",
            name: ""
        }
    
        if(editRequest.area !== ""){
            for (const area of areaOptions) {
                if (area.name == editRequest.area) {
                    selectedArea1 = { ...area }
                    break;
                } 
            }
    
            setSelectedArea(selectedArea1);
            editRequest["areaCode"] = selectedArea.code;
        }
    }, [editRequest,areaOptions])

    const getAreas = async () => {
        const dummyOptions = [];
        await getAllActiveAreas().then(body => {
            if(body.data){
                body.data.forEach(item => {
                    const areaOption = {
                        name : item.name,
                        code : item.code
                    }
                    dummyOptions.push(areaOption);
                });
            }
        })
        setAreaOptions(dummyOptions);
        window["reloadSelectPicker"]();
    }

    const getBusinessTypes = async () => {
        const dummyOptions = [];
        await getAllActiveBusinessType().then(body => {
            if(body.data){
                body.data.forEach(item => {
                    const areaOption = {
                        name : item.name,
                        code : item.code
                    }
                    dummyOptions.push(areaOption);
                });
            }
        })
        setBusinessTypeOptions(dummyOptions);
        window["reloadSelectPicker"]();
    }

    const handleBackToList = () => {
        console.log("Close");
        moveToOtherPage("/business_premises");
    }

    //call api to edit
    const handleProceedEdit = async (request) => {
        if(JSON.parse(localStorage.getItem("account")).area.length == 1){
            request.areaCode = JSON.parse(localStorage.getItem("account")).area[0];
        }
        const data = await editBusinessPremises(request,request.id);
        console.log(data);
        if(data.desc === 'SVC-SUCCESS-00') moveToOtherPage("/business_premises");
        else{
            setError(data.result.message);
            setIsShowError(true);
        }
    }

    //close noti error
    const handleCloseErrorNoti = () => {
        setIsShowError(false)
    }

    const onChange = (e) => {   
        e.preventDefault();
        console.log(e.target.name, e.target.value);
        if(e.target.name === "businessTypeCode"){
            editRequestTemp.businessTypeCode = e.target.value;
        }
        else if(e.target.name === "areaCode"){
            editRequestTemp.areaCode = e.target.value;
        }
        else{
            // editRequest[e.target.name] = e.target.value;
            setEditRequestTemp({ ...editRequest, [e.target.name]: e.target.value });
        }
        // setEditRequest({ ...editRequest, [e.target.name]: e.target.value });
    };


    const moveToOtherPage = (path) => {
        router.push(path);
        window["destroySelectpicker"]();
    };

    return (
        <>
        {
            <div className="d-flex flex-column-fluid">
                <div className="container">
                    <ul className="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold p-0 h5">
                        <li className="breadcrumb-item text-muted">
                            <a className="text-dark-50"><span className="txt">Trang chủ</span></a>
                        </li>
                        <li className="breadcrumb-item text-muted">
                            <a className="text-dark-50"><span className="txt">Cơ sở kinh doanh</span></a>
                        </li>
                        <li className="breadcrumb-item text-muted">
                            <a className="text-dark-50"><span className="txt">Chỉnh sửa</span></a>
                        </li>
                    </ul>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-border card-custom gutter-b example example-compact">
                                <div className="card-header">
                                    <div className="row row-16 align-items-center flex-grow-1">
                                        <div className="col-md">
                                            <div className="card-title">Chỉnh sửa cơ sở kinh doanh</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body p-4">
                            <div className="row list-mb20 list-crop align-items-end mb-1">
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Tên cơ sở</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1 form-control" value={editRequestTemp.name} name="name" onChange={(e) => onChange(e)}/>
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Địa chỉ</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1 form-control" value={editRequestTemp.addressGeneral} name="addressGeneral" onChange={(e) => onChange(e)}/>
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Địa chỉ chi tiết</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1 form-control" value={editRequestTemp.addressDetail} name="addressDetail" onChange={(e) => onChange(e)}/>
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Loại hình kinh doanh</label>
                                    <div className="">
                                        <div className="input-group">
                                            <select className="form-control selectpicker mb-3" title="-Chọn loại hình kinh doanh-" value={selectedType.code} name="businessTypeCode" onChange={(e) => onChange(e)} >
                                                {businessTypeOptions.map((item) => (
                                                    item.text == selectedType.name ? 
                                                    (<option key={item.code} value={item.code} selected> {item.name} </option>) :
                                                    (<option key={item.code} value={item.code}> {item.name} </option>)
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                {
                                    JSON.parse(localStorage.getItem("account")).area.length > 1 &&
                                    <div className="col-md-6 col-xl-6 mb-3">
                                        <label className="text-sm-start float-start mb-1">Khu vực</label>
                                        <div className="">
                                            <div className="input-group">
                                                <select className="form-control selectpicker mb-3" title="-Chọn khu vực-" value={selectedArea.code} name="areaCode" onChange={(e) => onChange(e)} >
                                                    {areaOptions.map((item) => (
                                                        item.text == selectedArea.name ? 
                                                        (<option key={item.code} value={item.code} selected> {item.name} </option>) :
                                                        (<option key={item.code} value={item.code}> {item.name} </option>)
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {
                                    JSON.parse(localStorage.getItem("account")).area.length == 1 &&
                                    <div className="col-md-6 col-xl-6 mb-3">
                                        <label className="text-sm-start float-start mb-1">Khu vực</label>
                                        <div className="input-group">
                                            <input type="text" className="w-100 px-3 py-1" value={JSON.parse(localStorage.getItem("account")).area[0]} name="area" disabled/>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="btn-group block-right my-4">
                            <div className="">
                                <button className="btn btn-danger mx-20" onClick={() => handleBackToList()}>
                                    Quay lại
                                </button>
                            </div>
                            <div className="col-auto block-right">
                                <button className="btn btn-primary" onClick={() => handleProceedEdit(editRequestTemp)}>
                                    Chỉnh sửa
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        <ModalDetail isShow={isShowError} title={"LỖI"} handleClose={handleCloseErrorNoti}>
            <h5>{error}</h5>
        </ModalDetail>
        </>
    )
}
EditBusinessPremises.Layout = LayoutPortal;
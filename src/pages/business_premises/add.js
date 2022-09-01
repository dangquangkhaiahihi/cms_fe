import React, { useState, useEffect }  from "react";
import { useRouter } from "next/dist/client/router";
import LayoutPortal from "../../components/layout/LayoutPortal";
import ModalDetail from "../../components/templates/modal/ModalDetail";
import { getAllActiveBusinessType, createBusinessPremises } from "../../api/businessPremisesAPI/businessPremisesApi";
import { getAllActiveAreas } from "../../api/userAPI/userApi";
import SelectForm from "../../components/elements/selectForm/SelectForm"

export default function AddBusinessPremises() {
    const router = useRouter();

    const [addRequest, setAddRequest] = useState({
        name:"",
        addressDetail:"",
        addressGeneral:"",
        businessTypeCode:"",
        areaCode:""
    });
    const { name, addressDetail, addressGeneral, businessTypeCode, areaCode } = addRequest;

    const [error, setError] = useState("");
    const [isShowError, setIsShowError] = useState(false);

    const [areaOptions, setAreaOptions] = useState([]);
    const [businessTypeOptions, setBusinessTypeOptions] = useState([]);

    useEffect(() => {
        window["loadJsDefault"]();
        console.log("Call load JS Default by another page");
        getAreas();
        getBusinessTypes();
    }, []);

    useEffect(() => {
        window["reloadSelectPicker"]();
    }, [areaOptions,businessTypeOptions]);

    const getAreas = async () => {
        const dummyOptions = [];
        await getAllActiveAreas().then(body => {
            if(body.data){
                body.data.forEach(item => {
                    const areaOption = {
                        text : item.name,
                        value : item.code
                    }
                    dummyOptions.push(areaOption);
                });
            }
        })
        setAreaOptions(dummyOptions);
    }

    const getBusinessTypes = async () => {
        const dummyOptions = [];
        await getAllActiveBusinessType().then(body => {
            if(body.data){
                body.data.forEach(item => {
                    const typeOption = {
                        text : item.name,
                        value : item.code
                    }
                    dummyOptions.push(typeOption);
                });
            }
        })
        setBusinessTypeOptions(dummyOptions);
    }

    const handleBackToList = () => {
        console.log("Close");
        moveToOtherPage("/business_premises");
    }

    //call api to resolve
    const handleProceedAdd = async (request) => {
        if(JSON.parse(localStorage.getItem("account")).area.length == 1){
            request.areaCode = JSON.parse(localStorage.getItem("account")).area[0];
        }
        const data = await createBusinessPremises(request);
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
        if(e.target.name === "businessTypeCode"){
            addRequest.businessTypeCode = e.target.value;
        }
        if(e.target.name === "areaCode"){
            addRequest.areaCode = e.target.value;
        }
        setAddRequest({ ...addRequest, [e.target.name]: e.target.value });
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
                            <a className="text-dark-50"><span className="txt">Thêm mới</span></a>
                        </li>
                    </ul>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-border card-custom gutter-b example example-compact">
                                <div className="card-header">
                                    <div className="row row-16 align-items-center flex-grow-1">
                                        <div className="col-md">
                                            <div className="card-title">Thêm mới cơ sở kinh doanh</div>
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
                                        <input type="text" className="w-100 px-3 py-1 form-control" value={name} name="name" onChange={(e) => onChange(e)}/>
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Địa chỉ</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1 form-control" value={addressGeneral} name="addressGeneral" onChange={(e) => onChange(e)}/>
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Địa chỉ chi tiết</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1 form-control" value={addressDetail} name="addressDetail" onChange={(e) => onChange(e)}/>
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Loại hình kinh doanh</label>
                                    <div className="">
                                        <SelectForm
                                            styleClass="form-control selectpicker mb-3"
                                            title="Loại hình kinh doanh"
                                            defaultValue={""}
                                            defaultTitle="--Tất cả--"
                                            data={businessTypeOptions}
                                            handleChange={onChange}
                                            name="businessTypeCode"
                                        />
                                    </div>
                                </div>
                                {
                                    JSON.parse(localStorage.getItem("account")).area.length > 1 &&
                                    <div className="col-md-6 col-xl-6 mb-3">
                                        <label className="text-sm-start float-start mb-1">Khu vực</label>
                                        <div className="">
                                            <SelectForm
                                                styleClass="form-control selectpicker mb-3"
                                                title="Khu vực"
                                                defaultValue={""}
                                                defaultTitle="--Tất cả--"
                                                data={areaOptions}
                                                handleChange={onChange}
                                                name="areaCode"
                                            />
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
                                <button className="btn btn-primary" onClick={() => handleProceedAdd(addRequest)}>
                                    Thêm mới
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
AddBusinessPremises.Layout = LayoutPortal;
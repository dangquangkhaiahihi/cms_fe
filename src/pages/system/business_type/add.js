import React, { useState, useEffect }  from "react";
import { useRouter } from "next/dist/client/router";
import { createBusinessType } from "../../../api/businessTypeAPI/businessTypeApi";
import LayoutPortal from "../../../components/layout/LayoutPortal";
import ModalDetail from "../../../components/templates/modal/ModalDetail";

export default function AddBusinessType() {
    const router = useRouter();

    const [addRequest, setAddRequest] = useState({
        code : "",
        name : ""
    });
    const { code, name } = addRequest;

    const [error, setError] = useState("");
    const [isShowError, setIsShowError] = useState(false);

    useEffect(() => {
        window["loadJsDefault"]();
        console.log("Call load JS Default by another page");
    }, []);

    const handleBackToList = () => {
        console.log("Close");
        moveToOtherPage("/system/business_type");
    }

    //call api to resolve
    const handleProceedAdd = async (request) => {
        const data = await createBusinessType(request);
        console.log(data);
        if(data.desc === 'SVC-SUCCESS-00') moveToOtherPage("/system/business_type");
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
                            <a className="text-dark-50"><span className="txt">Hệ thống</span></a>
                        </li>
                        <li className="breadcrumb-item text-muted">
                            <a className="text-dark-50"><span className="txt">Khu vực</span></a>
                        </li>
                    </ul>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-border card-custom gutter-b example example-compact">
                                <div className="card-header">
                                    <div className="row row-16 align-items-center flex-grow-1">
                                        <div className="col-md">
                                            <div className="card-title">Thêm mới khu vực</div>
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
                                    <label className="text-sm-start float-start mb-1">Mã khu vực</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1 form-control" value={code} name="code" onChange={(e) => onChange(e)}/>
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Tên khu vực</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1 form-control" value={name} name="name" onChange={(e) => onChange(e)}/>
                                    </div>
                                </div>
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
AddBusinessType.Layout = LayoutPortal;
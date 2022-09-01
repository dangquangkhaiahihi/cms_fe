import React, { useState, useEffect }  from "react";
import { useRouter } from "next/dist/client/router";
import LayoutPortal from "../../../components/layout/LayoutPortal";
import ModalDetail from "../../../components/templates/modal/ModalDetail";
import {  inspectBusinessPremises, getBusinessPremisesById } from "../../../api/businessPremisesAPI/businessPremisesApi";

export default function InspectBusinessPremises() {
    const router = useRouter();

    const premisesId = router.query.id;

    const [inspectRequest, setInspectRequest] = useState({
        warningStatus: -1,
        inspectDate : "",
        warningContent : ""
    });
    const { warningStatus, inspectDate, warningContent } = inspectRequest;

    console.log(inspectRequest);

    const [editRequest, setEditRequest] = useState({});
    
    const [isShowImage, setIsShowImage] = useState(false);

    const [error, setError] = useState("");
    const [isShowError, setIsShowError] = useState(false);

    useEffect(() => {
        window["loadJsDefault"]();
        console.log("Call load JS Default by another page");
    }, []);

    useEffect(() => {
        if (premisesId) {
            getBusinessPremisesById(premisesId).then(body => {
            if(body.data){
                setEditRequest(body.data);
            }else{
                moveToOtherPage("/business_premises");
            }
        });
        }
    }, []);

    useEffect(() => {
        let inspectTemp = {
            warningStatus: editRequest.warningStatus,
            inspectDate : editRequest.inspectDate,
            warningContent : editRequest.warningContent
        }
        setInspectRequest(inspectTemp);
    }, [editRequest]);


    const handleClose = () => {
        setIsShowImage(false);
    }

    const handleBackToList = () => {
        console.log("Close");
        moveToOtherPage("/business_premises");
    }

    //call api to edit
    const handleProceedInspect = async () => {
        if(inspectRequest.warningStatus === 1){
            inspectRequest.inspectDate="";
            inspectRequest.warningContent="";
        }
        const data = await inspectBusinessPremises(inspectRequest,premisesId);
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
        setInspectRequest({ ...inspectRequest, [e.target.name]: e.target.value });
        console.log(e.target.name,e.target.value);
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
                            <a className="text-dark-50"><span className="txt">Thanh tra</span></a>
                        </li>
                    </ul>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-border card-custom gutter-b example example-compact">
                                <div className="card-header">
                                    <div className="row row-16 align-items-center flex-grow-1">
                                        <div className="col-md">
                                            <div className="card-title">Thanh tra cơ sở kinh doanh</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body p-4">
                            <h5 className="my-4"><b>Thông tin cơ sở</b></h5>
                            <div className="row list-mb20 list-crop align-items-end mb-1">
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Tên cơ sở</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={editRequest.name} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Địa chỉ</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={editRequest.addressGeneral} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Địa chỉ chi tiết</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={editRequest.addressDetail} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Loại hình kinh doanh</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={editRequest.businessType} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Khu vực</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={editRequest.area} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <div className="input-group">
                                        <button className="btn btn-primary" onClick={() => {setIsShowImage(true)}}>
                                            Xem ảnh cơ sở
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body p-4">
                            <h5 className="my-4"><b>Thông tin thanh tra</b></h5>
                            {
                                // có vấn đề
                                inspectRequest.warningStatus == 0 &&
                                <label className="switch">
                                    <input type="checkbox" checked value={1} name = "warningStatus" onChange={(e) => onChange(e)}/>
                                    <span className="slider round"></span>
                                </label>
                            }
                            {
                                // bình thường
                                inspectRequest.warningStatus == 1 &&
                                <label className="switch">
                                    <input type="checkbox" value={0} name = "warningStatus" onChange={(e) => onChange(e)}/>
                                    <span className="slider round"></span>
                                </label>
                            }
                            <div className="row list-mb20 list-crop align-items-end mb-1">
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Lần thanh tra trước</label>
                                    {
                                        editRequest.lastInspectDate === "" &&
                                        <div className="input-group">
                                            <input type="text" className="w-100 px-3 py-1" value={"Chưa thanh tra lần nào"} disabled/>
                                        </div>
                                    }
                                    {
                                        editRequest.lastInspectDate !== "" &&
                                        <div className="input-group">
                                            <input type="text" className="w-100 px-3 py-1" value={editRequest.lastInspectDate} disabled/>
                                        </div>
                                    }
                                </div>
                            </div>
                            {
                                inspectRequest.warningStatus == 0 &&
                                <div className="row list-mb20 list-crop align-items-end mb-1">
                                    <div className="col-md-6 col-xl-6 mb-3">
                                        <label className="text-sm-start float-start mb-1">Ngày thanh tra</label>
                                        <div className="input-group">
                                            <input type="date" className="w-100 px-3 py-1" value={inspectRequest.inspectDate} name = "inspectDate" onChange={(e) => onChange(e)}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-xl-6 mb-3">
                                        <label className="text-sm-start float-start mb-1">Nội dung thanh tra</label>
                                        <div className="input-group">
                                            <input type="text" className="w-100 px-3 py-1" value={inspectRequest.warningContent} name = "warningContent" onChange={(e) => onChange(e)}/>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="btn-group block-right my-4">
                            <div className="">
                                <button className="btn btn-danger mx-20" onClick={() => handleBackToList()}>
                                    Quay lại
                                </button>
                            </div>
                            <div className="col-auto block-right">
                                <button className="btn btn-primary" onClick={() => handleProceedInspect()}>
                                    Chỉnh sửa
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        <ModalDetail isShow={isShowImage} title={"ẢNH CƠ SỞ"} handleClose={handleClose}>
            <div>

            </div>
        </ModalDetail>
        <ModalDetail isShow={isShowError} title={"LỖI"} handleClose={handleCloseErrorNoti}>
            <h5>{error}</h5>
        </ModalDetail>
        </>
    )
}
InspectBusinessPremises.Layout = LayoutPortal;
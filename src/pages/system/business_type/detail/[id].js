import React, { useState, useEffect }  from "react";
import { useRouter } from "next/dist/client/router";
import { getBusinessTypeById } from "../../../../api/businessTypeAPI/businessTypeApi";
import LayoutPortal from "../../../../components/layout/LayoutPortal";

export default function DetailBusinessType() {
    const router = useRouter();
    const businessTypeId = router.query.id;

    const [businessTypeDetail, setBusinessTypeDetail] = useState({});

    useEffect(() => {
        window["loadJsDefault"]();
        console.log("Call load JS Default by another page");
    }, []);

    useEffect(() => {
        if (businessTypeId) {
            getBusinessTypeById(businessTypeId).then(body => {
                if(body.data){
                    setBusinessTypeDetail(body.data);
                }else{
                    moveToOtherPage("/system/businessType");
                }
            });
        }
    }, [businessTypeId]);

    const handleBackToList = () => {
        console.log("Close");
        moveToOtherPage("/system/business_type");
    }

    const moveToOtherPage = (path) => {
        router.push(path);
        window["destroySelectpicker"]();
    };


    return (
        <>
        {
            businessTypeDetail && 
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
                            <a className="text-dark-50"><span className="txt">Loại hình kinh doanh</span></a>
                        </li>
                    </ul>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-border card-custom gutter-b example example-compact">
                                <div className="card-header">
                                    <div className="row row-16 align-items-center flex-grow-1">
                                        <div className="col-md">
                                            <div className="card-title">Xem chi tiết loại hình kinh doanh</div>
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
                                    <label className="text-sm-start float-start mb-1">Mã loại hình</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1 form-control" value={businessTypeDetail.code} readOnly />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Tên loại hình</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1 form-control" value={businessTypeDetail.name} readOnly />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="my-4">
                                <button className="btn btn-primary" onClick={() => handleBackToList()}>
                                    Quay lại
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    )
}
DetailBusinessType.Layout = LayoutPortal;
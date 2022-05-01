import React, { useState, useEffect }  from "react";
import { useRouter } from "next/dist/client/router";
import { getAreaById } from "../../../../api/areaAPI/areaApi";
import LayoutPortal from "../../../../components/layout/LayoutPortal";

export default function DetailArea() {
    const router = useRouter();
    const areaId = router.query.id;

    const [areaDetail, setAreaDetail] = useState({});

    useEffect(() => {
        window["loadJsDefault"]();
        console.log("Call load JS Default by another page");
    }, []);

    useEffect(() => {
        if (areaId) {
            getAreaById(areaId).then(body => {
                if(body.data){
                    setAreaDetail(body.data);
                }else{
                    router.push("/system/area");
                }
            });
        }
    }, [areaId]);

    const handleBackToList = () => {
        console.log("Close");
        router.push("/system/area");
    }

    return (
        <>
        {
            areaDetail && 
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
                                            <div className="card-title">Xem chi tiết khu vực</div>
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
                                        <input type="text" className="w-100 px-3 py-1" value={areaDetail.code} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Tên khu vực</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={areaDetail.name} disabled />
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
DetailArea.Layout = LayoutPortal;
import React, { useState, useEffect }  from "react";
import { useRouter } from "next/dist/client/router";
import { getUserDetail } from "../../../api/userAPI/userApi";
import LayoutPortal from "../../../components/layout/LayoutPortal";
import { Image } from "react-bootstrap";

export default function DetailUser() {
    const router = useRouter();
    const userId = router.query.id;

    const [userDetail, setUserDetail] = useState({
        areas : []
    });

    useEffect(() => {
        window["loadJsDefault"]();
        console.log("Call load JS Default by another page");
    }, []);

    useEffect(() => {
        if (userId) {
            getUserDetail(userId).then(body => {
                console.log("sadasdsadsd",body);
                if(body.data){
                    setUserDetail(body.data);
                }else{
                    moveToOtherPage("/user");
                }
            });
        }
    }, [userId]);

    const handleBackToList = () => {
        console.log("Close");
        moveToOtherPage("/user");
    }

    const moveToOtherPage = (path) => {
        router.push(path);
        window["destroySelectpicker"]();
    };

    console.log("vvvvvvvvvvvvvvvvvvvvvvv",userDetail);

    return (
        <>
        {
            userDetail && 
            <div className="d-flex flex-column-fluid">
                <div className="container">
                    <ul className="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold p-0 h5">
                        <li className="breadcrumb-item text-muted">
                            <a className="text-dark-50"><span className="txt">Trang chủ</span></a>
                        </li>
                        <li className="breadcrumb-item text-muted">
                            <a className="text-dark-50"><span className="txt">Quản lý người dùng</span></a>
                        </li>
                        <li className="breadcrumb-item text-muted">
                            <a className="text-dark-50"><span className="txt">Xem chi tiết người dùng</span></a>
                        </li>
                    </ul>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-border card-custom gutter-b example example-compact">
                                <div className="card-header">
                                    <div className="row row-16 align-items-center flex-grow-1">
                                        <div className="col-md">
                                            <div className="card-title">Xem chi tiết người dùng</div>
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
                                    <label className="text-sm-start float-start mb-1">Họ tên</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1 form-control" value={userDetail.fullName} readOnly />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Ngày sinh</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1 form-control" value={userDetail.dob} readOnly />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Email</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1 form-control" value={userDetail.email} readOnly />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Số điện thoại</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1 form-control" value={userDetail.phoneNumber} readOnly />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Số căn cước công dân</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1 form-control" value={userDetail.socialSecurityNum} readOnly />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Khu vực quản lý</label>
                                    {
                                        (userDetail.areas).length === 1 &&
                                        <div className="input-group">
                                            <input type="text" className="w-100 px-3 py-1 form-control" value={userDetail.areas} readOnly />
                                        </div>
                                    }
                                    {
                                        (userDetail.areas).length > 1 &&
                                        <div className="input-group">
                                            <input type="text" className="w-100 px-3 py-1 form-control" value={"Tất cả các khu vực"} readOnly />
                                        </div>
                                    }
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Quyền người dùng</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1 form-control" value={userDetail.role} readOnly />
                                    </div>
                                </div>
                                {/* <img th:src="/@{${user.photosImagePath}}" /> */}
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Quyền người dùng</label>
                                    <div className="input-group">
                                        <Image src={"C:/Users/khaidq/Documents/GitHub/cms/cms" + userDetail.photo} alt=''/>
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
DetailUser.Layout = LayoutPortal;
import React, { useState, useEffect }  from "react";
import { useRouter } from "next/dist/client/router";
import LayoutPortal from "../../../components/layout/LayoutPortal";
import { getBusinessPremisesById,
    addOrUpdateLicenses,  
    addOrUpdatePeople} from "../../../api/businessPremisesAPI/businessPremisesApi";
import ModalDetail from "../../../components/templates/modal/ModalDetail";
import ModalConfirm from "../../../components/templates/modal/ModalConfirm";
import { NotificationManager } from "react-notifications";
import 'react-notifications/lib/notifications.css';

export default function DetailBusinessPremises() {
    const router = useRouter();
    const premisesId = router.query.id;

    const [premissesDetail, setPremissesDetail] = useState({});

    const [owner, setOwner] = useState({});
    const [manager, setManager] = useState({});
    const [license, setLicense] = useState({});
    const [certificate, setCertificate ]= useState({});

    console.log("certificate", certificate);
    console.log("license", license);

    const [isShowImage, setIsShowImage] = useState(false);
    const [isShowOwner, setIsShowOwner] = useState(false);
    const [isShowManager, setIsShowManager] = useState(false);
    const [isShowLicense, setIsShowLicense] = useState(false);
    const [isShowCertificate, setIsShowCertificate] = useState(false);

    useEffect(() => {
        window["loadJsDefault"]();
        console.log("Call load JS Default by another page");
    }, []);

    useEffect(() => {
        if (premisesId) {
                getBusinessPremisesById(premisesId).then(body => {
                if(body.data){
                    setPremissesDetail(body.data);
                    console.log(body.data);
                }else{
                    router.push("/business_premises");
                }
            });
        }
    }, []);

    useEffect(() => {
        if(Object.keys(premissesDetail).length !== 0){
            if(premissesDetail.people.length != 0){
                for (const item of premissesDetail.people) {
                    if(item.position === "OWNER") setOwner(item);
                    if(item.position === "MANAGER") setManager(item);
                }
            }
    
            if(premissesDetail.licenses.length != 0){
                for (const item of premissesDetail.licenses) {
                    if(item.licenseType === "FOOD_SAFETY_CERTIFICATE") setCertificate(item);
                    if(item.licenseType === "BUSINESS_LICENSE") setLicense(item);
                }
            }
        }
    }, [premissesDetail]);

    useEffect(() => {
        owner["positionCode"] = "OWNER";
    }, [owner])

    useEffect(() => {
        manager["positionCode"] = "MANAGER";
    }, [manager])

    useEffect(() => {
        license["licenseTypeCode"] = "BUSINESS_LICENSE";
        if(license.provider === "THANH_PHO") license["providerCode"] = "THANH_PHO";
        if(license.provider === "QUAN") license["providerCode"] = "QUAN";
    },[license])

    useEffect(() => {
        certificate["licenseTypeCode"] = "FOOD_SAFETY_CERTIFICATE";
        if(certificate.provider === "THANH_PHO") certificate["providerCode"] = "THANH_PHO";
        if(certificate.provider === "QUAN") certificate["providerCode"] = "QUAN";
    }, [certificate])

    const handleBackToList = () => {
        console.log("Close");
        router.push("/business_premises");
    }

    const handleClose = () => {
        setIsShowImage(false);
        setIsShowOwner(false);
        setIsShowManager(false);
        setIsShowLicense(false);
        setIsShowCertificate(false);
    }

    return (
        <>
        {
            premissesDetail && 
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
                            <a className="text-dark-50"><span className="txt">Xem chi tiết cơ sở kinh doanh</span></a>
                        </li>
                    </ul>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-border card-custom gutter-b example example-compact">
                                <div className="card-header">
                                    <div className="row row-16 align-items-center flex-grow-1">
                                        <div className="col-md">
                                            <div className="card-title">Xem chi tiết cơ sở kinh doanh</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body p-4">
                            <div className="card">
                                <div className="card-body p-4">
                                    <h5 className="my-4"><b>Thông tin cơ sở</b></h5>
                                    <div className="row list-mb20 list-crop align-items-end mb-1">
                                        <div className="col-md-6 col-xl-6 mb-3">
                                            <label className="text-sm-start float-start mb-1">Tên cơ sở</label>
                                            <div className="input-group">
                                                <input type="text" className="w-100 px-3 py-1" value={premissesDetail.name} disabled />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-xl-6 mb-3">
                                            <label className="text-sm-start float-start mb-1">Địa chỉ</label>
                                            <div className="input-group">
                                                <input type="text" className="w-100 px-3 py-1" value={premissesDetail.addressGeneral} disabled />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-xl-6 mb-3">
                                            <label className="text-sm-start float-start mb-1">Địa chỉ chi tiết</label>
                                            <div className="input-group">
                                                <input type="text" className="w-100 px-3 py-1" value={premissesDetail.addressDetail} disabled />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-xl-6 mb-3">
                                            <label className="text-sm-start float-start mb-1">Loại hình kinh doanh</label>
                                            <div className="input-group">
                                                <input type="text" className="w-100 px-3 py-1" value={premissesDetail.businessType} disabled />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-xl-6 mb-3">
                                            <label className="text-sm-start float-start mb-1">Khu vực</label>
                                            <div className="input-group">
                                                <input type="text" className="w-100 px-3 py-1" value={premissesDetail.area} disabled />
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
                            </div>

                            <div className="card">
                                <div className="card-body p-4">
                                    <h5 className="my-4"><b>Thông tin chủ/ quản lý</b></h5>
                                    <div className="row list-mb20 list-crop align-items-end mb-1">
                                        <div className="col-md-6 col-xl-6 mb-3">
                                            <div className="input-group">
                                                <button className="btn btn-primary" onClick={() => {setIsShowOwner(true)}}>
                                                    Xem thông tin chủ sở hữu
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-xl-6 mb-3">
                                            <div className="input-group">
                                                <button className="btn btn-primary" onClick={() => {setIsShowManager(true)}}>
                                                    Xem thông quản lý
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-body p-4">
                                    <h5 className="my-4"><b>Thông tin ĐKKD/ chứng nhận ATTP</b></h5>
                                    <div className="row list-mb20 list-crop align-items-end mb-1">
                                        <div className="col-md-6 col-xl-6 mb-3">
                                            <div className="input-group">
                                                <button className="btn btn-primary" onClick={() => {setIsShowLicense(true)}}>
                                                    Xem thông tin ĐKKD
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-xl-6 mb-3">
                                            <div className="input-group">
                                                <button className="btn btn-primary" onClick={() => {setIsShowCertificate(true)}}>
                                                    Xem thông tin chứng nhận ATTP
                                                </button>
                                            </div>
                                        </div>
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

        <ModalDetail isShow={isShowImage} title={"ẢNH CƠ SỞ"} handleClose={handleClose}>
            <div>

            </div>
        </ModalDetail>
        <ModalDetail isShow={isShowOwner} title={"THÔNG TIN CHỦ SỞ HỮU"} handleClose={handleClose}>
            {
                Object.keys(owner).length !== 1 ? (
                    <div className="card">
                        <div className="card-body p-4">
                            <h5 className="my-4"><b>Thông tin chủ</b></h5>
                            <div className="row list-mb20 list-crop align-items-end mb-1">
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Họ và tên đệm</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={owner.firstName} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Tên</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={owner.lastName} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Số điện thoại</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={owner.phoneNumber} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Email</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={owner.email} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Ngày sinh</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={owner.dob} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Số căn cước</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={owner.socialSecurityNum} disabled />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h4>CHƯA THÊM THÔNG TIN CHỦ SỞ HỮU</h4>
                    </div>
                )
            }
        </ModalDetail>
        <ModalDetail isShow={isShowManager} title={"THÔNG TIN QUẢN LÝ"} handleClose={handleClose}>
            {
                Object.keys(manager).length !== 1 ? (
                    <div className="card">
                        <div className="card-body p-4">
                            <h5 className="my-4"><b>Thông tin quản lý</b></h5>
                            <div className="row list-mb20 list-crop align-items-end mb-1">
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Họ và tên đệm</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={manager.firstName} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Tên</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={manager.lastName} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Số điện thoại</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={manager.phoneNumber} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Email</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={manager.email} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Ngày sinh</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={manager.dob} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Số căn cước</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={manager.socialSecurityNum} disabled />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    ) : 
                    (
                    <div>
                        <h4>CHƯA THÊM THÔNG TIN QUẢN LÝ CƠ SỞ</h4>
                    </div>
                )
            }
        </ModalDetail>
        <ModalDetail isShow={isShowLicense} title={"THÔNG TIN GIẤY ĐKKD"} handleClose={handleClose}>
            {
                Object.keys(license).length !== 1 ? (
                    <div className="card">
                        <div className="card-body p-4">
                            <h5 className="my-4"><b>Thông tin giấy ĐKKD</b></h5>
                            <div className="row list-mb20 list-crop align-items-end mb-1">
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Mã</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={license.regno} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Ngày hiệu lưc</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={license.createdDate} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Ngày kết thúc</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={license.expirationDate} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Nơi cấp</label>
                                    {
                                        license.provider === 'QUAN'&&
                                        <div className="input-group">
                                            <input type="text" className="w-100 px-3 py-1" value="Quận" disabled />
                                        </div>
                                    }
                                    {
                                        license.provider === 'THANH_PHO'&&
                                        <div className="input-group">
                                            <input type="text" className="w-100 px-3 py-1" value="Thành phố" disabled />
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h4>CHƯA THÊM THÔNG TIN GIẤY ĐKKD</h4>
                    </div>
                )
            }
        </ModalDetail>
        <ModalDetail isShow={isShowCertificate} title={"THÔNG TIN CHỨNG NHẬN ATTP"} handleClose={handleClose}>
            {
                Object.keys(certificate).length !== 1 ? (
                    <div className="card">
                        <div className="card-body p-4">
                            <h5 className="my-4"><b>Thông tin chứng nhận ATTP</b></h5>
                            <div className="row list-mb20 list-crop align-items-end mb-1">
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Mã</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={certificate.regno} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Ngày hiệu lưc</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={certificate.createdDate} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Ngày kết thúc</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={certificate.expirationDate} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Nơi cấp</label>
                                    {
                                        certificate.provider === 'QUAN'&&
                                        <div className="input-group">
                                            <input type="text" className="w-100 px-3 py-1" value="Quận" disabled />
                                        </div>
                                    }
                                    {
                                        certificate.provider === 'THANH_PHO'&&
                                        <div className="input-group">
                                            <input type="text" className="w-100 px-3 py-1" value="Thành phố" disabled />
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h4>CHƯA THÊM THÔNG TIN CHỨNG NHẬN ATTP</h4>
                    </div>
                )
            }
        </ModalDetail>
        </>
    )
}
DetailBusinessPremises.Layout = LayoutPortal;
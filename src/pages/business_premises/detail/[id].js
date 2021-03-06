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
                            <a className="text-dark-50"><span className="txt">Trang ch???</span></a>
                        </li>
                        <li className="breadcrumb-item text-muted">
                            <a className="text-dark-50"><span className="txt">C?? s??? kinh doanh</span></a>
                        </li>
                        <li className="breadcrumb-item text-muted">
                            <a className="text-dark-50"><span className="txt">Xem chi ti???t c?? s??? kinh doanh</span></a>
                        </li>
                    </ul>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-border card-custom gutter-b example example-compact">
                                <div className="card-header">
                                    <div className="row row-16 align-items-center flex-grow-1">
                                        <div className="col-md">
                                            <div className="card-title">Xem chi ti???t c?? s??? kinh doanh</div>
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
                                    <h5 className="my-4"><b>Th??ng tin c?? s???</b></h5>
                                    <div className="row list-mb20 list-crop align-items-end mb-1">
                                        <div className="col-md-6 col-xl-6 mb-3">
                                            <label className="text-sm-start float-start mb-1">T??n c?? s???</label>
                                            <div className="input-group">
                                                <input type="text" className="w-100 px-3 py-1" value={premissesDetail.name} disabled />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-xl-6 mb-3">
                                            <label className="text-sm-start float-start mb-1">?????a ch???</label>
                                            <div className="input-group">
                                                <input type="text" className="w-100 px-3 py-1" value={premissesDetail.addressGeneral} disabled />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-xl-6 mb-3">
                                            <label className="text-sm-start float-start mb-1">?????a ch??? chi ti???t</label>
                                            <div className="input-group">
                                                <input type="text" className="w-100 px-3 py-1" value={premissesDetail.addressDetail} disabled />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-xl-6 mb-3">
                                            <label className="text-sm-start float-start mb-1">Lo???i h??nh kinh doanh</label>
                                            <div className="input-group">
                                                <input type="text" className="w-100 px-3 py-1" value={premissesDetail.businessType} disabled />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-xl-6 mb-3">
                                            <label className="text-sm-start float-start mb-1">Khu v???c</label>
                                            <div className="input-group">
                                                <input type="text" className="w-100 px-3 py-1" value={premissesDetail.area} disabled />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-xl-6 mb-3">
                                            <div className="input-group">
                                                <button className="btn btn-primary" onClick={() => {setIsShowImage(true)}}>
                                                    Xem ???nh c?? s???
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-body p-4">
                                    <h5 className="my-4"><b>Th??ng tin ch???/ qu???n l??</b></h5>
                                    <div className="row list-mb20 list-crop align-items-end mb-1">
                                        <div className="col-md-6 col-xl-6 mb-3">
                                            <div className="input-group">
                                                <button className="btn btn-primary" onClick={() => {setIsShowOwner(true)}}>
                                                    Xem th??ng tin ch??? s??? h???u
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-xl-6 mb-3">
                                            <div className="input-group">
                                                <button className="btn btn-primary" onClick={() => {setIsShowManager(true)}}>
                                                    Xem th??ng qu???n l??
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-body p-4">
                                    <h5 className="my-4"><b>Th??ng tin ??KKD/ ch???ng nh???n ATTP</b></h5>
                                    <div className="row list-mb20 list-crop align-items-end mb-1">
                                        <div className="col-md-6 col-xl-6 mb-3">
                                            <div className="input-group">
                                                <button className="btn btn-primary" onClick={() => {setIsShowLicense(true)}}>
                                                    Xem th??ng tin ??KKD
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-xl-6 mb-3">
                                            <div className="input-group">
                                                <button className="btn btn-primary" onClick={() => {setIsShowCertificate(true)}}>
                                                    Xem th??ng tin ch???ng nh???n ATTP
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
                                    Quay l???i
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }

        <ModalDetail isShow={isShowImage} title={"???NH C?? S???"} handleClose={handleClose}>
            <div>

            </div>
        </ModalDetail>
        <ModalDetail isShow={isShowOwner} title={"TH??NG TIN CH??? S??? H???U"} handleClose={handleClose}>
            {
                Object.keys(owner).length !== 1 ? (
                    <div className="card">
                        <div className="card-body p-4">
                            <h5 className="my-4"><b>Th??ng tin ch???</b></h5>
                            <div className="row list-mb20 list-crop align-items-end mb-1">
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">H??? v?? t??n ?????m</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={owner.firstName} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">T??n</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={owner.lastName} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">S??? ??i???n tho???i</label>
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
                                    <label className="text-sm-start float-start mb-1">Ng??y sinh</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={owner.dob} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">S??? c??n c?????c</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={owner.socialSecurityNum} disabled />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h4>CH??A TH??M TH??NG TIN CH??? S??? H???U</h4>
                    </div>
                )
            }
        </ModalDetail>
        <ModalDetail isShow={isShowManager} title={"TH??NG TIN QU???N L??"} handleClose={handleClose}>
            {
                Object.keys(manager).length !== 1 ? (
                    <div className="card">
                        <div className="card-body p-4">
                            <h5 className="my-4"><b>Th??ng tin qu???n l??</b></h5>
                            <div className="row list-mb20 list-crop align-items-end mb-1">
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">H??? v?? t??n ?????m</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={manager.firstName} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">T??n</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={manager.lastName} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">S??? ??i???n tho???i</label>
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
                                    <label className="text-sm-start float-start mb-1">Ng??y sinh</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={manager.dob} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">S??? c??n c?????c</label>
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
                        <h4>CH??A TH??M TH??NG TIN QU???N L?? C?? S???</h4>
                    </div>
                )
            }
        </ModalDetail>
        <ModalDetail isShow={isShowLicense} title={"TH??NG TIN GI???Y ??KKD"} handleClose={handleClose}>
            {
                Object.keys(license).length !== 1 ? (
                    <div className="card">
                        <div className="card-body p-4">
                            <h5 className="my-4"><b>Th??ng tin gi???y ??KKD</b></h5>
                            <div className="row list-mb20 list-crop align-items-end mb-1">
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">M??</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={license.regno} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Ng??y hi???u l??c</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={license.createdDate} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Ng??y k???t th??c</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={license.expirationDate} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">N??i c???p</label>
                                    {
                                        license.provider === 'QUAN'&&
                                        <div className="input-group">
                                            <input type="text" className="w-100 px-3 py-1" value="Qu???n" disabled />
                                        </div>
                                    }
                                    {
                                        license.provider === 'THANH_PHO'&&
                                        <div className="input-group">
                                            <input type="text" className="w-100 px-3 py-1" value="Th??nh ph???" disabled />
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h4>CH??A TH??M TH??NG TIN GI???Y ??KKD</h4>
                    </div>
                )
            }
        </ModalDetail>
        <ModalDetail isShow={isShowCertificate} title={"TH??NG TIN CH???NG NH???N ATTP"} handleClose={handleClose}>
            {
                Object.keys(certificate).length !== 1 ? (
                    <div className="card">
                        <div className="card-body p-4">
                            <h5 className="my-4"><b>Th??ng tin ch???ng nh???n ATTP</b></h5>
                            <div className="row list-mb20 list-crop align-items-end mb-1">
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">M??</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={certificate.regno} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Ng??y hi???u l??c</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={certificate.createdDate} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Ng??y k???t th??c</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={certificate.expirationDate} disabled />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">N??i c???p</label>
                                    {
                                        certificate.provider === 'QUAN'&&
                                        <div className="input-group">
                                            <input type="text" className="w-100 px-3 py-1" value="Qu???n" disabled />
                                        </div>
                                    }
                                    {
                                        certificate.provider === 'THANH_PHO'&&
                                        <div className="input-group">
                                            <input type="text" className="w-100 px-3 py-1" value="Th??nh ph???" disabled />
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h4>CH??A TH??M TH??NG TIN CH???NG NH???N ATTP</h4>
                    </div>
                )
            }
        </ModalDetail>
        </>
    )
}
DetailBusinessPremises.Layout = LayoutPortal;
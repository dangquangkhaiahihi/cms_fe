import React, { useState, useEffect }  from "react";
import LayoutPortal from "../../../components/layout/LayoutPortal";
import { useRouter } from "next/dist/client/router";
import { addOrUpdateLicenses, getBusinessPremisesById } from "../../../api/businessPremisesAPI/businessPremisesApi";
import DynamicFormLicense from "../../../components/templates/DynamicForm/DynamicFormLicense";
import ModalDetail from "../../../components/templates/modal/ModalDetail";

export default function AddLicense(props) {
    const router = useRouter();

    const premisesId = router.query.id;
    
    const [editRequest, setEditRequest] = useState("");

    useEffect(() => {
        window["loadJsDefault"]();
        console.log("Call load JS Default by another page");
    }, []);

    const [error, setError] = useState("");
    const [isShowError, setIsShowError] = useState(false);

    //close noti error
    const handleCloseErrorNoti = () => {
        setIsShowError(false)
    }

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

    const [listLicense, setListLicense] = useState([]);
    const updateParentLicense = (props) =>{
        for (const item of props) {
            if(item.licenseTypeCode === "BUSINESS_LICENSE"){
              // item = {...item, providerCode : "THANH_PHO"}
              item.providerCode = "THANH_PHO"
            }
          }
        setListLicense(props)

    }

    //call api to update license
    const handleProceedAddUpdateLicense = async (request) => {
        const data = await addOrUpdateLicenses(request,premisesId);
        if(data.desc === 'SVC-SUCCESS-00') moveToOtherPage("/business_premises");
        else{
            setError(data.result.message);
            setIsShowError(true);
        }
    }

    const handleBackToList = () => {
        console.log("Close");
        moveToOtherPage("/business_premises");
    }

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
                            <a className="text-dark-50"><span className="txt">Thêm ĐKKD/ giấy phép ATTP</span></a>
                        </li>
                    </ul>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-border card-custom gutter-b example example-compact">
                                <div className="card-header">
                                    <div className="row row-16 align-items-center flex-grow-1">
                                        <div className="col-md">
                                            <div className="card-title">Thêm ĐKKD/ giấy phép ATTP</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body p-4">
                            {
                                (editRequest.licenses) &&
                                (<DynamicFormLicense 
                                    listLicenseDto={editRequest.licenses}
                                    updateParentLicense={updateParentLicense}
                                />)
                            }
                        </div>
                        <div className="btn-group block-right my-4">
                            <div className="">
                                <button className="btn btn-danger mx-20" onClick={() => handleBackToList()}>
                                    Quay lại
                                </button>
                            </div>
                            <div className="col-auto block-right">
                                <button className="btn btn-success" onClick={() => handleProceedAddUpdateLicense(listLicense)}>
                                    Xác nhận thay đổi
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
AddLicense.Layout = LayoutPortal;
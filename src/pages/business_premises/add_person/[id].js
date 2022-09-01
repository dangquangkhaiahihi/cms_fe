import React, { useState, useEffect }  from "react";
import LayoutPortal from "../../../components/layout/LayoutPortal";
import { useRouter } from "next/dist/client/router";
import { addOrUpdatePeople, getBusinessPremisesById } from "../../../api/businessPremisesAPI/businessPremisesApi";
import DynamicFormPeople from "../../../components/templates/DynamicForm/DynamicFormPeople";
import ModalDetail from "../../../components/templates/modal/ModalDetail";

export default function AddPeople(props) {
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

    const [listPeople, setListPeople] = useState([]);
    const updateParentPeople = (props) =>{
        setListPeople(props);
    }

    //call api to update People
    const handleProceedAddUpdatePeople = async (request) => {
        const data = await addOrUpdatePeople(request,premisesId);
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
                            <a className="text-dark-50"><span className="txt">Thêm chủ sở hữu/ quản lý</span></a>
                        </li>
                    </ul>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-border card-custom gutter-b example example-compact">
                                <div className="card-header">
                                    <div className="row row-16 align-items-center flex-grow-1">
                                        <div className="col-md">
                                            <div className="card-title">Thêm chủ sở hữu/ quản lý</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body p-4">
                            {
                                (editRequest.people) &&
                                (<DynamicFormPeople 
                                    listPeopleDto={editRequest.people}
                                    updateParentPeople={updateParentPeople}
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
                                <button className="btn btn-success" onClick={() => handleProceedAddUpdatePeople(listPeople)}>
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
AddPeople.Layout = LayoutPortal;
import React, { useState, useEffect }  from "react";
import { useRouter } from "next/dist/client/router";
import { getAreaById, editArea } from "../../../../api/areaAPI/areaApi";
import LayoutPortal from "../../../../components/layout/LayoutPortal";
import ModalDetail from "../../../../components/templates/modal/ModalDetail";

export default function EditArea() {
    const router = useRouter();
    const areaId = router.query.id;

    const [editRequest, setEditRequest] = useState({
        id : areaId,
        code : "",
        name : ""
    });
    const { id, code, name } = editRequest;

    const [error, setError] = useState("");
    const [isShowError, setIsShowError] = useState(false);

    useEffect(() => {
        window["loadJsDefault"]();
        console.log("Call load JS Default by another page");
    }, []);

    useEffect(() => {
        if (areaId) {
            getAreaById(areaId).then(body => {
                if(body.data){
                    setEditRequest(body.data);
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

    //call api to resolve
    const handleProceedUpdate = async (request,id) => {
        const data = await editArea(request,id);
        console.log(data);
        if(data.desc === 'SVC-SUCCESS-00') router.push("/system/area");
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
        console.log(e.target.name);
        console.log(e.target.value);
        console.log(editRequest);
        setEditRequest({ ...editRequest, [e.target.name]: e.target.value });
    };

    return (
        <>
        {
            editRequest && 
            <div className="d-flex flex-column-fluid">
                <div className="container">
                    <ul className="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold p-0 h5">
                        <li className="breadcrumb-item text-muted">
                            <a className="text-dark-50"><span className="txt">Trang ch???</span></a>
                        </li>
                        <li className="breadcrumb-item text-muted">
                            <a className="text-dark-50"><span className="txt">H??? th???ng</span></a>
                        </li>
                        <li className="breadcrumb-item text-muted">
                            <a className="text-dark-50"><span className="txt">Khu v???c</span></a>
                        </li>
                    </ul>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-border card-custom gutter-b example example-compact">
                                <div className="card-header">
                                    <div className="row row-16 align-items-center flex-grow-1">
                                        <div className="col-md">
                                            <div className="card-title">Ch???nh s???a khu v???c</div>
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
                                    <label className="text-sm-start float-start mb-1">M?? khu v???c</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={code} name="code" onChange={(e) => onChange(e)}/>
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">T??n khu v???c</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={name} name="name" onChange={(e) => onChange(e)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="btn-group block-right my-4">
                            <div className="">
                                <button className="btn btn-danger mx-20" onClick={() => handleBackToList()}>
                                    Quay l???i
                                </button>
                            </div>
                            <div className="col-auto block-right">
                                <button className="btn btn-primary" onClick={() => handleProceedUpdate(editRequest,areaId)}>
                                    Thay ?????i
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        <ModalDetail isShow={isShowError} title={"L???I"} handleClose={handleCloseErrorNoti}>
            <h5>{error}</h5>
        </ModalDetail>    
        </>
    )
}
EditArea.Layout = LayoutPortal;
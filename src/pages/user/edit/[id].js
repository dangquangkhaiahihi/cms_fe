import React, { useState, useEffect }  from "react";
import { useRouter } from "next/dist/client/router";
import { getUserDetail, editUser, getAllActiveAreas } from "../../../api/userAPI/userApi";
import LayoutPortal from "../../../components/layout/LayoutPortal";
import ModalDetail from "../../../components/templates/modal/ModalDetail";

export default function EditUser() {
    const router = useRouter();
    const userId = router.query.id;

    const [areaCodeOptions, setAreaCodeOptions] = useState([]);
    console.log("sdad", areaCodeOptions);

    const [editRequest, setEditRequest] = useState({
        id : userId,
        email : "",
        firstName : "",
        lastName : "",
        phoneNumber : "",
        dob : "",
        socialSecurityNum : "",
        areas: [],
        areaCode : "",
        role : ""
    });
    const { id, email, firstName, lastName, phoneNumber, dob, socialSecurityNum, areaCode, role } = editRequest;

    const [error, setError] = useState("");
    const [isShowError, setIsShowError] = useState(false);

    useEffect(() => {
        window["loadJsDefault"]();
        console.log("Call load JS Default by another page");
        getAreas();
    }, []);

    useEffect(() => {
        if (userId) {
            getUserDetail(userId).then(body => {
                if(body.data){
                    setEditRequest(body.data);
                    getAreas();
                }else{
                    router.push("/user");
                }
            });
        }
        editRequest.areaCode = editRequest.areas[0];
    }, [userId]);

    const getAreas = async () => {
        const dummyAreaOptions = [];
        await getAllActiveAreas().then(body => {
            if(body.data){
                body.data.forEach(item => {
                    const areaOption = {
                        name : item.name,
                        code : item.code
                    }
                    dummyAreaOptions.push(areaOption);
                });
            }
        })
        setAreaCodeOptions(dummyAreaOptions);
        window["reloadSelectPicker"]();
    }

    const handleBackToList = () => {
        console.log("Close");
        router.push("/user");
    }

    //call api to resolve
    const handleProceedUpdate = async (request,id) => {
        const data = await editUser(request,id);
        console.log(data);
        if(data.desc === 'SVC-SUCCESS-00'){
            router.push("/user");
        } 
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
                            <a className="text-dark-50"><span className="txt">Qu???n l?? ng?????i d??ng</span></a>
                        </li>
                        <li className="breadcrumb-item text-muted">
                            <a className="text-dark-50"><span className="txt">S???a th??ng tin ng?????i d??ng</span></a>
                        </li>
                    </ul>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-border card-custom gutter-b example example-compact">
                                <div className="card-header">
                                    <div className="row row-16 align-items-center flex-grow-1">
                                        <div className="col-md">
                                            <div className="card-title">S???a th??ng tin ng?????i d??ng</div>
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
                                    <label className="text-sm-start float-start mb-1">H??? v?? t??n ?????m</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={firstName} name="firstName" onChange={(e) => onChange(e)} />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">T??n</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={lastName} name="lastName" onChange={(e) => onChange(e)} />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Ng??y sinh</label>
                                    <div className="input-group">
                                        <input type="date" className="w-100 px-3 py-1" value={dob} name="dob" onChange={(e) => onChange(e)}  />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Email</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={email} name="email" onChange={(e) => onChange(e)}  />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">S??? ??i???n tho???i</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={phoneNumber} name="phoneNumber" onChange={(e) => onChange(e)}  />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">S??? c??n c?????c c??ng d??n</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={socialSecurityNum} name="socialSecurityNum" onChange={(e) => onChange(e)}  />
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Khu v???c qu???n l??</label>
                                    {
                                        (editRequest.role) === "USER" &&
                                        <div className="input-group">
                                            <select className="w-100 px-3 py-1 selectpicker" title="-Ch???n khu v???c-" value={areaCode} name="areaCode" onChange={(e) => onChange(e)} >
                                                {areaCodeOptions.map((item) => (
                                                    <option key={item.code} value={item.code}> {item.name} </option>
                                                ))}
                                            </select>
                                        </div>
                                    }
                                    {
                                        (editRequest.role) === "ADMIN" &&
                                        <div className="input-group">
                                            <input type="text" className="w-100 px-3 py-1" value={"T???t c??? c??c khu v???c"} disabled />
                                        </div>
                                    }
                                </div>
                                <div className="col-md-6 col-xl-6 mb-3">
                                    <label className="text-sm-start float-start mb-1">Quy???n ng?????i d??ng</label>
                                    <div className="input-group">
                                        <input type="text" className="w-100 px-3 py-1" value={role} disabled />
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
                                <button className="btn btn-primary" onClick={() => handleProceedUpdate(editRequest,userId)}>
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
EditUser.Layout = LayoutPortal;
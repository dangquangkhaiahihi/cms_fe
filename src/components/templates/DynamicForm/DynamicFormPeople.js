import React from "react";
import { useState, useEffect } from "react";
import ModalConfirm from "../modal/ModalConfirm";

export default function DynamicFormPeople(props) {
    const [listPeople , setListPeople] = useState([]);
    const [isShowConfirmDetele, setIsShowConfirmDetele] = useState(false);

    useEffect(() => {
      if(props.listPeopleDto){
        const newListPeople = props.listPeopleDto.map(
          (peopleDto, index) => {
            peopleDto["key"] = index + 1;
            peopleDto["positionCode"] = peopleDto.position;
            return peopleDto;
          }
        );
        setListPeople(newListPeople);
        props.updateParentPeople(newListPeople);
      }
    }, []);

    useEffect(() => {
      window["reloadSelectPicker"]();
    }, [listPeople]);

    const onChange = (e,key) => {
      e.preventDefault();
  
      const newListPeople = listPeople.slice(0) ;
  
      let index = -1;
      for (const item of newListPeople) {
          index = index + 1;
          if(item.key === key){
            break;
          }
      }
  
      newListPeople[index] = { ...newListPeople[index], [e.target.name]: e.target.value };
      setListPeople(newListPeople);
      props.updateParentPeople(newListPeople);
    };

    const handleAdd = () => {
      const newListPeople = listPeople;
  
      //tạo 1 object mới có mọi thứ giống person
  
      const person = {
        id: "",
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber:"",
        dob:"",
        socialSecurityNum:"",
        positionCode:"",
        key: listPeople.length + 1,
      };
  
      //gắn biến trên newListPeople vào 1 cloned arr của listPeople, VÀ ADD THÊM 1 object mới add vào
      newListPeople = [
        ...newListPeople,person
      ]; //spread operator
  
      setListPeople(newListPeople);// thay đổi state để re-render
      props.updateParentPeople(newListPeople);
    };

    const [tempKeyForConfirmDelete, setTempKeyForConfirmDelete] = useState("");
    const handleDelete = (item,key) => {
      if(item.id !== ""){
        setTempKeyForConfirmDelete(key)
        setIsShowConfirmDetele(true)
      }else{
        const filteredItems = listPeople.filter(item => item.key !== key)
        // console.log("key : " + key);
        // console.log("aaaaaaaa " + JSON.stringify(filteredItems));
    
        setListPeople(filteredItems);// thay đổi state để re-render
        props.updateParentPeople(filteredItems);
      }
    };

    const handleConfirmDelete = async (confirm) => {
      if (confirm){
        const filteredItems = listPeople.filter(item => item.key !== tempKeyForConfirmDelete)
        setListPeople(filteredItems);// thay đổi state để re-render
        props.updateParentPeople(filteredItems);
        setIsShowConfirmDetele(false)
      }
      else{
        setIsShowConfirmDetele(false)
      }
  }

    return (
        <>
            {
              listPeople.map((item, index) => (
              <div key={index}>
                  <div className="row list-mb20 list-crop align-items-end mb-1">
                    <div className="col-md-6 col-xl-6 mb-3">
                        <label className="text-sm-start float-start mb-1">Vị trí</label>
                        <div className="input-group">
                            <select className="form-control selectpicker" title="-Chọn vị trí-" value={item.positionCode} name="positionCode" onChange={(e) => onChange(e,item.key)} >
                                <option value="" disabled selected>-Chọn vị trí-</option>
                                <option value="OWNER">Chủ sở hữu</option>
                                <option value="MANAGER">Quản lý</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-6 mb-3">
                        <label className="text-sm-start float-start mb-1">Họ và tên đệm</label>
                        <div className="input-group">
                            <input type="text" className="w-100 px-3 py-1" value={item.firstName} name="firstName" onChange={(e) => onChange(e,item.key)}/>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-6 mb-3">
                        <label className="text-sm-start float-start mb-1">Tên</label>
                        <div className="input-group">
                            <input type="text" className="w-100 px-3 py-1" value={item.lastName} name="lastName" onChange={(e) => onChange(e,item.key)}/>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-6 mb-3">
                        <label className="text-sm-start float-start mb-1">Email</label>
                        <div className="input-group">
                            <input type="text" className="w-100 px-3 py-1" value={item.email} name="email" onChange={(e) => onChange(e,item.key)}/>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-6 mb-3">
                        <label className="text-sm-start float-start mb-1">Ngày sinh</label>
                        <div className="input-group">
                            <input type="date" className="w-100 px-3 py-1" value={item.dob} name="dob" onChange={(e) => onChange(e,item.key)}/>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-6 mb-3">
                        <label className="text-sm-start float-start mb-1">Số điện thoại</label>
                        <div className="input-group">
                            <input type="text" className="w-100 px-3 py-1" value={item.phoneNumber} name="phoneNumber" onChange={(e) => onChange(e,item.key)}/>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-6 mb-3">
                        <label className="text-sm-start float-start mb-1">Số căn cước công dân</label>
                        <div className="input-group">
                            <input type="text" className="w-100 px-3 py-1" value={item.socialSecurityNum} name="socialSecurityNum" onChange={(e) => onChange(e,item.key)}/>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-6 mb-3">
                        <label className="text-sm-start float-start mb-1">Ảnh</label>
                        <div className="input-group">
                            <input type="text" className="w-100 px-3 py-1" name="image" readOnly/>
                        </div>
                    </div>
                  </div>
                  <div className="my-4">
                      <button className="btn btn-danger mx-20" onClick={() => handleDelete(item,item.key)}>
                          Xóa bản ghi
                      </button>
                  </div>
                  <br></br>
              </div>
            ))}
            <div className="">
                <button className="btn btn-primary" onClick={handleAdd}>
                    Thêm bản ghi
                </button>
            </div>
            {/* Modal for confirm delete person having id*/}
            <ModalConfirm isShow={isShowConfirmDetele} title={"XÁC NHẬN"} handleClose={handleConfirmDelete}>
                <h5>BẠN CÓ CHẮC MUỐN XÓA <b>CHỦ</b>/ <b>QUẢN LÝ</b> NÀY KHÔNG?</h5>
            </ModalConfirm>
        </>
      );
}
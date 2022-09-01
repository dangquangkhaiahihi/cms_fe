import React from "react";
import { useState, useEffect } from "react";
import ModalConfirm from "../modal/ModalConfirm";

export default function DynamicFormLicense(props) {
    const [listLicense, setListLicense] = useState([]);
    const [isShowConfirmDetele, setIsShowConfirmDetele] = useState(false);

    useEffect(() => {
      if(props.listLicenseDto){
        const newListLicense = props.listLicenseDto.map(
          (licenseDto, index) => {
            licenseDto["key"] = index + 1;
            licenseDto["providerCode"] = licenseDto.provider;
            licenseDto["licenseTypeCode"] = licenseDto.licenseType;
            return licenseDto;
          }
        );
        setListLicense(newListLicense);
        props.updateParentLicense(newListLicense);
      }
    }, []);

    useEffect(() => {
      window["reloadSelectPicker"]();
    }, [listLicense]);

    const onChange = (e,key) => {
      e.preventDefault();
  
      const newListLicense = listLicense.slice(0) ;
  
      let index = -1;
      for (const item of newListLicense) {
        index = index + 1;
        if(item.key === key){
          break;
        }
      }
  
      newListLicense[index] = { ...newListLicense[index], [e.target.name]: e.target.value };
      setListLicense(newListLicense);
      props.updateParentLicense(newListLicense);
    };

    const handleAdd = () => {
      const newListLicense = listLicense;
  
      //tạo 1 object mới có mọi thứ giống license
  
      const license = {
        id: "",
        regno: "",
        createdDate: "",
        expirationDate: "",
        providerCode:"",
        licenseTypeCode:"",
        image:"",
        key: listLicense.length + 1,
      };
  
      //gắn biến trên newListLicense vào 1 cloned arr của listLicense, VÀ ADD THÊM 1 object mới add vào
      newListLicense = [
        ...newListLicense,license
      ]; //spread operator
  
      setListLicense(newListLicense);// thay đổi state để re-render
      props.updateParentLicense(newListLicense);
    };

    const [tempKeyForConfirmDelete, setTempKeyForConfirmDelete] = useState("");
    const handleDelete = (item,key) => {
      if(item.id !== ""){
        setTempKeyForConfirmDelete(key)
        setIsShowConfirmDetele(true)
      }else{
        const filteredItems = listLicense.filter(item => item.key !== key)
        // console.log("key : " + key);
        // console.log("aaaaaaaa " + JSON.stringify(filteredItems));
    
        setListLicense(filteredItems);// thay đổi state để re-render
        props.updateParentLicense(filteredItems);
      }
    };

    const handleConfirmDelete = async (confirm) => {
      if (confirm){
        const filteredItems = listLicense.filter(item => item.key !== tempKeyForConfirmDelete)
        setListLicense(filteredItems);// thay đổi state để re-render
        props.updateParentLicense(filteredItems);
        setIsShowConfirmDetele(false)
      }
      else{
        setIsShowConfirmDetele(false)
      }
  }

    return (
        <>
            {
              listLicense.map((item, index) => (
              <div key={index}>
                  <div className="row list-mb20 list-crop align-items-end mb-1">
                    <div className="col-md-6 col-xl-6 mb-3">
                        <label className="text-sm-start float-start mb-1">Loại giấy tờ</label>
                        {/* <div className="input-group">
                            <input type="text" className="w-100 px-3 py-1" value={item.licenseTypeCode} name="licenseType" onChange={(e) => onChange(e,item.key)}/>
                        </div> */}
                        <div className="input-group">
                            <select className="form-control selectpicker" title="-Chọn loại giấy tờ-" value={item.licenseTypeCode} name="licenseTypeCode" onChange={(e) => onChange(e,item.key)} >
                                <option value="" disabled>-Chọn loại giấy tờ-</option>
                                <option value="FOOD_SAFETY_CERTIFICATE">Giấy chứng nhận an toàn thực phẩm</option>
                                <option value="BUSINESS_LICENSE">Giấy phép kinh doanh</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-6 mb-3">
                        <label className="text-sm-start float-start mb-1">Số đăng ký</label>
                        <div className="input-group">
                            <input type="text" className="w-100 px-3 py-1 form-control" value={item.regno} name="regno" onChange={(e) => onChange(e,item.key)}/>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-6 mb-3">
                        <label className="text-sm-start float-start mb-1">Ngày hiệu lực</label>
                        <div className="input-group">
                            <input type="date" className="w-100 px-3 py-1 form-control" value={item.createdDate} name="createdDate" onChange={(e) => onChange(e,item.key)}/>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-6 mb-3">
                        <label className="text-sm-start float-start mb-1">Ngày hết hạn</label>
                        <div className="input-group">
                            <input type="date" className="w-100 px-3 py-1 form-control" value={item.expirationDate} name="expirationDate" onChange={(e) => onChange(e,item.key)}/>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-6 mb-3">
                        <label className="text-sm-start float-start mb-1">Cấp bởi</label>
                        {/* <div className="input-group">
                            <input type="text" className="w-100 px-3 py-1" value={item.providerCode} name="provider" onChange={(e) => onChange(e,item.key)}/>
                        </div> */}
                        {
                          item.licenseTypeCode === "" &&
                          <input type="text" className="w-100 px-3 py-1 form-control" readOnly/>
                        }
                        {
                          item.licenseTypeCode === 'BUSINESS_LICENSE' &&
                          <div className="input-group">
                              <select className="form-control selectpicker" title="-Chọn nơi cấp-" value={item.providerCode} name="providerCode" onChange={(e) => onChange(e,item.key)} >
                                  <option value="" disabled>-Chọn nơi cấp-</option>
                                  <option value="THANH_PHO">Thành phố</option>
                              </select>
                          </div>
                        }
                        {
                          item.licenseTypeCode === 'FOOD_SAFETY_CERTIFICATE' &&
                          <div className="input-group">
                              <select className="form-control selectpicker" title="-Chọn nơi cấp-" value={item.providerCode} name="providerCode" onChange={(e) => onChange(e,item.key)} >
                                  <option value="" disabled>-Chọn nơi cấp-</option>
                                  <option value="QUAN">Quận</option>
                                  <option value="THANH_PHO">Thành phố</option>
                              </select>
                          </div>
                        }
                    </div>
                    <div className="col-md-6 col-xl-6 mb-3">
                        <label className="text-sm-start float-start mb-1">Ảnh</label>
                        <div className="input-group">
                            {/* <input type="text" className="w-100 px-3 py-1 form-control" name="image" readOnly/> */}
                            <input type='file' className='' onChange={()=>{}} required></input>
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
            {/* Modal for confirm delete license having id*/}
            <ModalConfirm isShow={isShowConfirmDetele} title={"XÁC NHẬN"} handleClose={handleConfirmDelete}>
                <h5>BẠN CÓ CHẮC MUỐN XÓA <b>GIẤY ĐKKD</b>/ <b>GIẤY CHỨNG NHẬN ATTP</b> NÀY KHÔNG?</h5>
            </ModalConfirm>
        </>
      );
}
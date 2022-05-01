import React, { useState } from "react";
import { NotificationManager } from 'react-notifications';
import {changePassword , logout} from "../../api/userAPI/userApi";
import {useRouter} from "next/router";

export default function ChangePassword() {
    const [passwordOld, setPasswordOld] = useState("");
    const [passwordNew, setPasswordNew] = useState("");
    const [rePassword, setRePassword] = useState("");

    const router = useRouter();

    // const [account, setAccount] = useState(JSON.parse(localStorage.getItem("account")));
    

    function changePass() {
        if (rePassword !== passwordNew) {
            NotificationManager.error('Nhập lại mật khẩu không đúng', 'Lỗi', 1000);
        } 
        else {
            const request = {
                passwordOld: passwordOld,
                passwordNew: passwordNew,
                rePassword : rePassword
            }
            changePassword(request).then(body => {
              console.log("aaaaaaaaaaafffffffffffffffggggggggggg",body);
                if (body.desc === 'SVC-SUCCESS-00') {
                    NotificationManager.success('Đổi mật khẩu thành công', 'Success', 1000);
                    onLogout();
                } else {
                  if(body.desc) NotificationManager.error(body.desc, "", 1000);
                  else NotificationManager.error("Chưa đăng nhập", "", 1000);
                }
            });
        }
    }

    function onLogout() {
        localStorage.removeItem("account");
        localStorage.removeItem("access_token");
        logout();
        router.push("/dashboard");
    }

  return (
    <div className="col-md-12">
    <div className="card card-border card-custom gutter-b example example-compact">
      <div className="card-header">
        <div className="row row-16 align-items-center flex-grow-1">
          <div className="col-md">
            <div className="card-title">Thay đổi thông tin mật khẩu</div>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="card-section">
          <div className="form">
            <div className="expand-wrap list-mb-20">
              <div className="row list-mb20 list-crop expand-list">
                <div className="col-xl-5 col-md-6">
                  <div className="form-group">
                    <label>
                      Mật khẩu hiện tại
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control" placeholder="Nhập mật khẩu hiện tại" maxLength="200"
                      onChange={(e) => setPasswordOld(e.target.value)} type="password" value={passwordOld}
                    />
                  </div>
                </div>
                <div className="offset-xl-1 col-xl-5 col-md-6"></div>
                <div className="col-xl-5 col-md-6">
                  <div className="form-group">
                    <label>
                      Mật khẩu mới
                      <span className="text-danger">*</span>
                    </label>
                    <input 
                      className="form-control" placeholder="Nhập mật khẩu mới" maxLength="200"
                      onChange={(e) => setPasswordNew(e.target.value)} type="password" value={passwordNew}
                  />
                  </div>
                </div>
                <div className="offset-xl-1 col-xl-5 col-md-6">
                  <div className="form-group">
                    <label>
                      Nhập lại mật khẩu mới
                      <span className="text-danger">*</span>
                    </label>
                    <input 
                      className="form-control" placeholder="Nhập nhập lại mật khẩu mới" maxLength="200"
                      onChange={(e) => setRePassword(e.target.value)} type="password" value={rePassword}
                     />
                  </div>
                </div>
                <div className="col-xl-5 col-md-6">
                  <label className="font-weight-500">
                    Mật khẩu mới phải thỏa mãn các điều kiện sau:
                  </label>
                  <div className="mt-10 text-dark-50">
                    • Mật khẩu có độ dài từ 08-50 ký tự, trong đó: Có tối thiểu 1 ký tự số, 1 ký tự chữ cái viết thường và 1 ký tự chữ cái viết hoa.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <div className="row">
            <div className="btn-group block-right">
                <div className="">
                    <a href="/portal/dashboard" className="btn btn-secondary">
                    <img src="/ici/media/icons-color/invert/default/key.svg" alt="" className="btn-icon"/>
                    Quay lại
                    </a>
                </div>
                <div className="col-auto block-right">
                    <button className="btn btn-primary" onClick={() => changePass()}>
                    <img src="/ici/media/icons-color/invert/default/key.svg" alt="" className="btn-icon"/>
                    Đổi mật khẩu
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
    )
};
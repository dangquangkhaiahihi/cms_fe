import React, { useState } from "react";
import {useRouter} from "next/router";
import {login} from "../../api/userAPI/userApi";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");

  const submitLogin = () => {
      login(username, password).then((body) => {
      console.log("body");
      console.log(body);
      if (body.code) {
        console.log(body)
        localStorage.setItem("access_token", body.data.token);
        localStorage.setItem("account", JSON.stringify(body.data.account));
        localStorage.setItem("roles", body.data.roles);
        router.push("/dashboard")
      } else {
        setError(body.result.message);
      }
    });
  };

  const keyPress = (e) => {
    e.persist();
    if (e.key === "Enter") {
      submitLogin();
    }
  };
  
  const handleChangeValue = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    if(name === 'username'){
      setUsername(value);
    }
    if(name === 'password'){
      setPassword(value);
    }
    // console.log(value);
  }


  return (
      <div id="kt_body" className="subheader-enabled">
        <div className="login-background" style={{backgroundImage: 'url(media/img/login-bg.jpg)'}} ></div>
        <div className="container d-flex flex-column flex-root">
          <div className="login login-6 login-signin-on login-signin-on d-flex flex-row-fluid" id="kt_login">
            <div className="d-flex flex-column flex-lg-row flex-row-fluid">
              <div className="d-flex w-100 position-relative overflow-hidden login-background-sub justify-content-center">
                <div className="row">
                  <div className="col-md-6">
                    <h1 className="login-title mb-32">
                      Cổng thông tin quản lý nhà hàng Quận Nam Từ Liêm
                    </h1>
                  </div>
                  <div className="col-md-6">
                    <div className="login-wrapper">
                      <div className="login-box-wrapper">
                        <div className="login-box-grad"></div>
                        <div className="box login-box">
                          <div className="form">
                            <div className="h2 font-weight-500 mb-32 text-center">
                              Đăng nhập
                            </div>
                            <div className="form-login-inner list-mb20 list-crop">
                              <div className="form-group">
                                <label>
                                  Tên đăng nhập
                                </label>
                                <input type="text" name='username'
                                       onChange={(e) => handleChangeValue(e)}
                                       onKeyPress={keyPress}
                                       value={username}
                                       className="form-control form-control-lg"
                                       placeholder="Nhập tên đăng nhập hệ thống" />
                              </div>
                              <div className="form-group">
                                <label>
                                  Mật khẩu
                                </label>
                                <input type="password" 
                                      value={password} name='password'
                                       onChange={(e) => handleChangeValue(e)}
                                       onKeyPress={keyPress}
                                       className="form-control form-control-lg"
                                       placeholder="Nhập mật khẩu truy cập hệ thống" />
                              </div>
                              {error && <div className="label label-size-default label-light-danger label-inline" >{error}</div>}
                              <div className="row">
                                <div className="col">
                                  <label className="checkbox">
                                    <input type="checkbox" name="checkbox1" />
                                      <span></span>Ghi nhớ đăng nhập
                                  </label>
                                </div>
                                <div className="col-auto">
                                  <a href="" data-toggle="modal" data-target="#modalPassword">
                                    <div className="text-dark text-hover-primary">Quên mật khẩu?</div>
                                  </a>
                                </div>
                              </div>
                              <button className="btn btn-primary btn-block btn-lg" onClick={() => submitLogin()}>
                                Đăng nhập
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="kt_scrolltop" className="scrolltop">
          <i className="ri-arrow-up-s-line"></i>
        </div>

        <div className="modal fade" id="modalPassword" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
             aria-hidden="true" data-backdrop="static">
          <div className="modal-dialog modal-md modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title h2 b" id="exampleModalLabel">Quên mật khẩu</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <img src="media/icons-color/subdefault/default/24x24-close.svg" alt="" />
                </button>
              </div>

              <div className="modal-body">
                <div className="form list-mb24 list-crop">
                  <div className="text-left">
                    Vui lòng nhập địa chỉ email đã đăng ký. Chúng tôi sẽ gửi lại mật khẩu mới cho bạn.
                  </div>
                  <div className="form-group">
                    <label>
                      Địa chỉ email
                    </label>
                    <input type="text" className="form-control form-control-lg" placeholder="Nhập địa chỉ email" />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <div className="row row-16 list-mb8 list-crop justify-content-end">
                  <div className="auto">
                    <a className="btn btn-secondary btn-block" data-dismiss="modal">
                      Đóng
                    </a>
                  </div>
                  <div className="auto">
                    <a className="btn btn-primary btn-block" data-toggle="modal" data-target="#modalAlert"
                       data-dismiss="modal">
                      Tiếp tục
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>)
};

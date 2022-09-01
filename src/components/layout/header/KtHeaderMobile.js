import React from "react";
export default function KtHeaderMobile({}) {
  return (
      <div id="kt_header_mobile" className="header-mobile align-items-center header-mobile-fixed">

        <a href="index.html">
          <img alt="Logo" src="media/brands/logo.svg"/>
        </a>

        <div className="d-flex align-items-center">

          <button className="btn p-0 brand-toggle burger-icon-left" id="kt_header_mobile_toggle">
            <div className="con">
              <div className="bar arrow-top"></div>
              <div className="bar arrow-middle"></div>
              <div className="bar arrow-bottom"></div>
            </div>
          </button>

          <div className="dropdown">

            <a className="btn btn-hover-text-primary p-0 ml-2" data-toggle="dropdown">
              <div className="avatar-image" style={{backgroundImage: 'url(media/default/avatar.svg)'}}></div>
            </a>

            <div className="dropdown-menu p-0 m-0 dropdown-menu-anim-up dropdown-menu-smd dropdown-menu-right">

              <ul className="navi navi-hover">

                <li className="navi-item">
                  <a href="pages/profile/1-thong-tin-ca-nhan.html" className="navi-link">
                    <i className="navi-icon ri-user-line"></i>
                    <span className="navi-text">Thông tin cá nhân</span>
                  </a>
                </li>
                <li className="navi-item">
                  <a href="pages/profile/2-doi-mk.html" className="navi-link">
                    <i className="navi-icon ri-lock-password-line"></i>
                    <span className="navi-text">Đổi mật khẩu</span>
                  </a>
                </li>
                <li className="navi-item">
                  <a data-toggle="modal" data-target="#modalLogout" className="navi-link">
                    <i className="navi-icon ri-logout-circle-r-line"></i>
                    <span className="navi-text">Đăng xuất</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  );
}

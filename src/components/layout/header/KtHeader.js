import React, {useEffect, useState} from "react";
import Link from "next/link";
import BackgroundImage from '../../../../public/media/default/avatar.svg';
import {useRouter} from "next/router";
import {logout} from "../../../api/userAPI/userApi";
import Logo from "../../../../public/logo.svg";

export default function KtHeader() {
  const classNameStandard = "menu-item menu-item-rel";
  const classNameActive = classNameStandard + " menu-item-active";
  const classNameSubmenu = classNameStandard + " menu-item-submenu";

  const router = useRouter();
  const [account, setAccount] = useState('');

  useEffect(() => {
    setAccount(JSON.parse(localStorage.getItem("account")));
    console.log(BackgroundImage)
  },[])

  function onLogout() {
    localStorage.removeItem("account");
    localStorage.removeItem("access_token");
    logout();
    moveToOtherPage("/dashboard");
  }

  const moveToOtherPage = (path) => {
    router.push(path);
    window["destroySelectpicker"]();
  };

  const checkPathInclude = (path) => {
    return router.asPath.includes(path);
  }

  return (

      <div id="kt_header" className="header">
        <div className="container d-flex align-items-stretch justify-content-between header-upper">
          <div className="d-flex align-items-center">
            <div className="header-logo">
              <Link href={"/"}>
                <a className="brand-logo">
                  <img alt="Logo" src={Logo.src} />
                </a>
              </Link>
            </div>
          </div>

          <div className="topbar">
            <div className="dropdown avatar-dropdown">
              <div className="topbar-item" data-toggle="dropdown">
                <div className="btn btn-icon w-auto d-flex align-items-center btn-lg">
                  <div className="avatar-image" style={{backgroundImage: `url(${BackgroundImage.src})`}}></div>
                  <div className="avatar-text">
                    <div className="h5 text-dark-50">
                      Xin chào
                    </div>
                    <div className="p font-weight-500">{account.fullName}</div>
                  </div>
                </div>
              </div>

              <div className="dropdown-menu p-0 m-0 dropdown-menu-anim-up dropdown-menu-smd dropdown-menu-right">
                <ul className="navi navi-hover">
                  <li className="navi-item">
                    <a href="pages/profile/1-thong-tin-ca-nhan.html" className="navi-link">
                      <i className="navi-icon ri-user-line"></i>
                      <span className="navi-text">Thông tin cá nhân</span>
                    </a>
                  </li>
                  <li className="navi-item">
                    <a className="navi-link" onClick={()=>{moveToOtherPage("/changePassword")}}>
                      <i className="navi-icon ri-lock-password-line"></i>
                      <span className="navi-link">Đổi mật khẩu</span>
                    </a>
                  </li>

                  <li className="navi-item">
                    <div data-toggle="modal" data-target="#modalLogout" className="navi-link">
                      <i className="navi-icon ri-logout-circle-r-line"></i>
                      <span className="navi-text" onClick={() => {onLogout()}}>Đăng xuất</span>
                    </div>
                  </li>

                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="header-bottom">

          <div className="container">

            <div className="header-menu-wrapper header-menu-wrapper-left" id="kt_header_menu_wrapper">

              <div id="kt_header_menu"
                   className="header-menu header-menu-left header-menu-mobile header-menu-layout-default">

                <ul className="menu-nav flex-grow-1 list-mb12 list-crop">

                  <li className={checkPathInclude('/dashboard') ? classNameActive : classNameStandard}>
                    <Link href='/dashboard'>
                      <a className="menu-link">
                        <i className="menu-icon ri-home-3-line"></i>
                        <span className="menu-text">Trang chủ</span>
                      </a>
                    </Link>
                  </li>
                  {
                    account && account.area.length > 1 && 
                    <li className={checkPathInclude('/system') ? classNameSubmenu + ' ' + classNameActive : classNameSubmenu}
                      data-menu-toggle="hover">
                    <a href="javascript:;" className="menu-link menu-toggle">
                      <i className="menu-icon ri-folder-chart-line"></i>
                      <span className="menu-text">Hệ thống</span>
                    </a>
                    <div className="menu-submenu menu-submenu-classic menu-submenu-left">
                      <ul className="menu-subnav">
                        <li className={checkPathInclude('/area') ? "menu-item menu-item-active" : "menu-item"}>

                          <Link href='/system/area'>
                            <a className="menu-link">
                              <span className="menu-text">Khu vực</span>
                            </a>
                          </Link>

                        </li>

                        <li className={checkPathInclude('/business_type') ? "menu-item menu-item-active" : "menu-item"}>

                          <Link href='/system/business_type'>
                            <a className="menu-link">
                              <span className="menu-text">Loại hình kinh doanh</span>
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  }
                  {
                    account && account.area.length > 1 && 
                    <li className={checkPathInclude('/user') ? classNameActive : classNameStandard}>
                      <Link href='/user'>
                        <a className="menu-link">
                          <i className="menu-icon ri-home-3-line"></i>
                          <span className="menu-text">Quản lý người dùng</span>
                        </a>
                      </Link>
                    </li>
                  }
                  <li className={checkPathInclude('/business_premises') ? classNameActive : classNameStandard}>
                    <Link href='/business_premises'>
                      <a className="menu-link">
                        <i className="menu-icon ri-home-3-line"></i>
                        <span className="menu-text">Cơ sở kinh doanh</span>
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

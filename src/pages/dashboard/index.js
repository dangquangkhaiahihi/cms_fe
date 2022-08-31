import React, {useEffect} from "react";
import Head from "next/head";
import LayoutPortal from "../../components/layout/LayoutPortal";

const Dashboard = (props) => {
    useEffect(() => {
        window["loadJsDefault"]();
        console.log("Call load JS Default by another page");
    }, []);

  return (
    <div className="d-flex flex-column-fluid">
    <div className="container">
        <div className="page-title">
            <h2>Gửi thông báo qua email</h2>
        </div>
        <ul className="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold p-0 h5">
            <li className="breadcrumb-item text-muted">
                <a className="text-dark-50">
                    <span className="txt">Trang chủ</span>
                </a>
            </li>
        </ul>


        <div className="row">
            <div className="col-md-12">
                <div className="card card-border card-custom gutter-b example example-compact">
                    
                </div>
            </div>
        </div>
    </div>
</div>
  );
};
Dashboard.Layout = LayoutPortal;
export default Dashboard;

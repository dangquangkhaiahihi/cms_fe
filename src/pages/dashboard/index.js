import React, {useEffect} from "react";
import Head from "next/head";
import LayoutPortal from "../../components/layout/LayoutPortal";

const Dashboard = (props) => {
    useEffect(() => {
        window["loadJsDefault"]();
        console.log("Call load JS Default by another page");
        window["initChart"]();
        console.log("Init data chart JS");
    }, []);

  return (
        <div className="d-flex flex-column-fluid">
            <div className="container">
                <div className="row list-mb24 list-crop pb-24">
                    <div className="col-md-4 card-special card-special-purple">
                        <div className="card-special-inner">
                            <div className="card-special-title mb-12">
                                5631
                            </div>

                            <div className="card-special-sub">
                                Tổng số request đã sử dụng trong năm 2021
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 card-special card-special-primary">
                        <div className="card-special-inner">
                            <div className="card-special-title mb-12">
                                4523
                            </div>
                            <div className="card-special-sub">
                                Tổng số request đã sử dụng trong mức
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 card-special card-special-red">
                        <div className="card-special-inner">
                            <div className="card-special-title mb-12">
                                1108
                            </div>
                            <div className="card-special-sub">
                                Request đã sử dụng vượt mức
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row list-mb24 list-crop">
                    <div className="col-md-4">
                        <div className="card card-custom gutter-b example example-compact">
                            <div className="card-header">
                                <div className="row row-16 align-items-center flex-grow-1">
                                    <div className="col-md">
                                        <div className="card-title">Tỷ trọng sl request sử dụng trong
                                            tháng
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="card-section">
                                    <div id="pieChart"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-8">
                        <div className="card card-custom gutter-b example example-compact">
                            <div className="card-header">
                                <div className="row row-16 align-items-center flex-grow-1">
                                    <div className="col-md">
                                        <div className="card-title">Thống kê tình hình sử dụng request
                                            trong tháng
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="card-section">
                                    <div id="colChart"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
};
Dashboard.Layout = LayoutPortal;
export default Dashboard;

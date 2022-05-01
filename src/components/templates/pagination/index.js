import { event } from "jquery";
import React, {useState, useEffect} from "react";
import ReactPaginate from "react-paginate";

import Paginate from "../../elements/paginate/Paginate";

export default function Pagination(props) {

    const { pageCount, numPerPage, handlePageClick, handleChangeNumOfPage } = props;

    return (
        <div className="record-and-pagination">
            <div className="row align-items-center list-mb16 list-crop justify-content-between">
                <div className="col-md-auto">
                    <div className="record-number">
                        <div className="d-flex align-items-center">
                            <div>Hiển thị</div>
                            <div>
                                <div className="form-group mx-2">
                                    {/* <span>Hiển thị</span> */}
                                    <select className="form-control form-control-sm selectpicker" value={numPerPage} onChange={handleChangeNumOfPage}>
                                        <option value={10}>10</option>
                                        <option value={15}>15</option>
                                        <option value={20}>20</option>
                                        <option value={25}>25</option>
                                    </select>
                                    {/* <span> bản ghi</span> */}
                                </div>
                            </div>
                            <div>{" "} bản ghi</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-auto">
                    <Paginate onPageChange={handlePageClick}
                            pageCount={pageCount}/>
                </div>
            </div>
        </div>
    );
}

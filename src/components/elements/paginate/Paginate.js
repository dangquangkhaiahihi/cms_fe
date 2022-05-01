import ReactPaginate from "react-paginate";
import React from "react";

const Paginate = ({onPageChange,pageCount}) => {
    return (<div className="pagination justify-content-center">
                <div className="d-flex flex-wrap py-2 mr-3">
                <ReactPaginate
                    onPageChange={onPageChange}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    nextLabel=""
                    nextClassName="btn btn-icon btn-sm btn-secondary"
                    nextLinkClassName="ri-arrow-right-s-line"
                    previousClassName="btn btn-icon btn-sm btn-secondary"
                    previousLinkClassName="ri-arrow-left-s-line"
                    previousLabel=""
                    pageClassName=""
                    pageLinkClassName=" page-link btn btn-icon btn-sm border-0 btn-hover-primary"
                    breakLabel={<button className="btn btn-icon btn-sm border-0 disabled btn-disabled" aria-pressed="false" aria-disabled="true">
                    ...
                </button>}
                    breakLinkClassName="disabled btn-disabled"
                    containerClassName="pagination"
                    activeClassName="btn btn-icon btn-sm border-0 btn-hover-primary active"
                    renderOnZeroPageCount={null}
                />
                </div></div>)
};
export default Paginate;
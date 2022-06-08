import React, {useEffect, useState} from "react";
import LayoutPortal from "../../../components/layout/LayoutPortal";
import { searchArea, lockOrUnlockArea } from "../../../api/areaAPI/areaApi";
import SelectForm from "../../../components/elements/selectForm/SelectForm"
import Pagination from "../../../components/templates/pagination";
import { useRouter } from 'next/router'
import Image from "../../../components/elements/image/Image";
import ModalConfirm from "../../../components/templates/modal/ModalConfirm";

const AreaPage = () => {
    const router = useRouter();

    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [numPerPage, setNumPerPage] = useState(10);
    const [pageCount, setPageCount] = useState(0);

    const [requestSearch, setRequestSearch] = useState({
        keyword: "",
        status: ""
    })
    const { keyword, status } = requestSearch;

    const [isShowLock, setIsShowLock] = useState(false);
    const [isShowUnlock, setIsShowUnlock] = useState(false);
    const [areaId, setAreaId] = useState("");

    const [statusOptions, setStatusOptions] = useState([
        {
            value : 1,
            text: "Hoạt động"
        },
        {
            value : 0,
            text: "Khóa"
        },  
    ])

    useEffect(() => {
        window["loadJsDefault"]();
        console.log("Call load JS Default by another page");
    }, []);

    // get list when currentPage, numPerPage change
    useEffect(() => {
        console.log(`currentPage: ${currentPage}, numPerPage: ${numPerPage}, total: ${total}`);
        const numOfPage = total % numPerPage === 0 ? (total / numPerPage) : (total / numPerPage + 1);
        console.log("numOffPage: ", numOfPage);
        setPageCount(numOfPage);
        getList(currentPage, numPerPage);
    }, [currentPage, numPerPage]);
    

    // Get list to table
    const getList = async (page, itemPerPage) => {
        console.log(`page ${page} pagesize ${itemPerPage}`);
        const { data } = await searchArea(page, itemPerPage, requestSearch);
        console.log("data: ", data);
        if (data) {
            setTotal(data.totalElements);
            setList(data.content);
            setPageCount(data.totalPages);
        }
    }

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        console.log("current page : ", currentPage);
        setCurrentPage(event.selected);
    };

    // Handle when change num of page
    const handleChangeNumOfPage = (event) => {
        setNumPerPage(event.target.value);
        setCurrentPage(0);
    }

    //* START LOCK*
    // Click lock
    const handleProceedLock = async (id) => {
        // call api lock/unlock area
        const { data } = await lockOrUnlockArea(id);
        getList(currentPage, numPerPage);
        setIsShowLock(true);
    }

    // Confirm lock
    const handleConfirmLock = async (confirm) => {
        if (confirm)
            await handleProceedLock(areaId);
        handleCloseLock()
        console.log(isShowLock);
    }

    // Close lock
    const handleCloseLock = () => {
        console.log("Close");
        setIsShowLock(false);
    }
    //* END LOCK*

    //* START UNLOCK*
    // Click lock
    const handleProceedUnlock = async (id) => {
        // call api lock/unlock area
        const { data } = await lockOrUnlockArea(id);
        getList(currentPage, numPerPage);
        setIsShowUnlock(true);
    }

    // Confirm lock
    const handleConfirmUnlock = async (confirm) => {
        if (confirm)
            await handleProceedUnlock(areaId);
        handleCloseUnlock()
    }

    // Close lock
    const handleCloseUnlock = () => {
        setIsShowUnlock(false);
    }
    //* END UNLOCK*

    const onChange = (e) => {
        e.preventDefault();
        setRequestSearch({ ...requestSearch, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        getList(currentPage, numPerPage);
    }

  return (

        <div className="d-flex flex-column-fluid">
            <div className="container">
                <div className="page-title">
                    Khu vực
                </div>
                <ul className="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold p-0 h5">
                    <li className="breadcrumb-item text-muted">
                        <a className="text-dark-50">
                            <span className="txt">Trang chủ</span>
                        </a>
                    </li>
                    <li className="breadcrumb-item text-muted">
                        <a className="text-dark-50">
                            <span className="txt">Hệ thống</span>
                        </a>
                    </li>
                    <li className="breadcrumb-item text-muted breadcrumbs-item--active">
                        <a className="text-dark-50">
                            <span className="txt">Khu vực</span>
                        </a>
                    </li>
                </ul>


                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-border card-custom gutter-b example example-compact">
                            {/* form search */}
                            <div className="card-header">
                                <div className="row align-items-center flex-grow-1 list-mb16 list-crop">
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <input type="text" className="form-control input-search" onChange={(e) => onChange(e)}
                                                value={keyword} name="keyword" placeholder="Tìm kiếm"  />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="">
                                            <SelectForm
                                                styleClass="form-control selectpicker mb-3"
                                                title="Trạng thái hoạt động"
                                                defaultValue={2}
                                                defaultTitle="--Tất cả--"
                                                data={statusOptions}
                                                handleChange={onChange}
                                                name="status"
                                            />
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-auto">
                                            <button className="btn btn-primary w-20" onClick={(e) => onSubmit(e)}>
                                                Tìm kiếm
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End form search */}

                            <div className="card-body">
                                <div className="card-section">
                                    <div className="table-wrap table-responsive-new">
                                        <div className="table-top">
                                            <div className="row align-items-center list-mb16 list-crop">
                                                <div className="row row-16 justify-content-md-end align-items-center flex-grow-1">
                                                    <div className="col-auto">
                                                        <button className="btn btn-primary"
                                                        onClick={() => {router.push("/system/area/add")}}>
                                                            Thêm mới
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row align-items-center list-mb16 list-crop">
                                                <div className="col">
                                                    Tổng số bản ghi:
                                                    <span className="font-weight-500 text-primary">{total}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-wrap-inner">
                                            <table className="table table-sticky-ult table-striped table-v-middle">
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            STT
                                                        </th>
                                                        <th className="sort sort-no">
                                                            Mã khu vực
                                                        </th>
                                                        <th className="sort sort-no">
                                                            Tên khu vực
                                                        </th>
                                                        <th className="sort sort-no">
                                                            Trạng thái
                                                        </th>
                                                        <th className="sort sort-no">
                                                            Tác vụ
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        total > 0 ? list.map((item, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{currentPage * numPerPage + index + 1}</td>
                                                                    <td>{item.code}</td>
                                                                    <td>{item.name}</td>
                                                                    <td>
                                                                        {
                                                                            item.status == 0 && (
                                                                                <label className="label label-size-default label-light-danger label-inline">Khóa</label>
                                                                            )
                                                                        }
                                                                        {
                                                                            item.status == 1 && (
                                                                                <label className="label label-size-default label-light-success label-inline">Hoạt động</label>
                                                                            )
                                                                        }
                                                                    </td>
                                                                    <td className="sticky-ult">
                                                                            <div className="text-center">
                                                                                <button className="btn btn-transaprent btn-icon btn-sm" onClick={() => {router.push(`/system/area/detail/${item.id}`)}} data-tooltip="tooltip" title="Xem">
                                                                                    <Image src="/media/icons-color/subdefault/default/info.svg" alt="" styleClass={"btn-icon"} />
                                                                                </button>
                                                                                <button className="btn btn-transaprent btn-icon btn-sm" onClick={() => {router.push(`/system/area/edit/${item.id}`)}} data-tooltip="tooltip" title="Chỉnh sửa">
                                                                                    <Image src="/media/icons-color/subdefault/default/24x24-edit.svg" alt="" styleClass={"btn-icon"} />
                                                                                </button>
                                                                                {
                                                                                    item.status == 0 && 
                                                                                    <button className="btn btn-transaprent btn-icon btn-sm" 
                                                                                        onClick={() => {
                                                                                            setIsShowUnlock(true);
                                                                                            setAreaId(item.id);
                                                                                        }} 
                                                                                        data-tooltip="tooltip" title="Mở khóa">
                                                                                        <Image src="/media/icons-color/info/default/24x24-unlock.svg" alt="" styleClass={"btn-icon"} />
                                                                                    </button>
                                                                                }
                                                                                {
                                                                                    item.status == 1 && 
                                                                                    <button className="btn btn-transaprent btn-icon btn-sm" 
                                                                                        onClick={() => {
                                                                                            setIsShowLock(true);
                                                                                            setAreaId(item.id);
                                                                                        }} 
                                                                                        data-tooltip="tooltip" title="Khóa">
                                                                                        <Image src="/media/icons-color/subdefault/default/24x24-lock.svg" alt="" styleClass={"btn-icon"} />
                                                                                    </button>
                                                                                }
                                                                            </div>
                                                                        </td>
                                                                </tr>
                                                            )
                                                        })
                                                            : (
                                                                <tr>
                                                                    <td colSpan={9}>Không có bản ghi nào</td>
                                                                </tr>
                                                            )
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        <Pagination pageCount={pageCount} numPerPage={numPerPage} 
                                                    handleChangeNumOfPage={handleChangeNumOfPage} handlePageClick={handlePageClick} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal for show area's LOCK*/}
            <ModalConfirm isShow={isShowLock} title={"XÁC NHẬN"} handleClose={handleConfirmLock}>
                <h5>BẠN CÓ CHẮC MUỐN KHÓA KHU VỰC KHÔNG</h5>
            </ModalConfirm>
            {/* Modal for show area's UNLOCK */}
            <ModalConfirm isShow={isShowUnlock} title={"XÁC NHẬN"} handleClose={handleConfirmUnlock}>
                <h5>BẠN CÓ CHẮC MUỐN MỞ KHÓA KHU VỰC KHÔNG</h5>
            </ModalConfirm>
        </div>
);
};
AreaPage.Layout = LayoutPortal;
export default AreaPage;

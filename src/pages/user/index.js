import React, {useEffect, useState} from "react";
import LayoutPortal from "../../components/layout/LayoutPortal";
import { searchUser, getAllActiveAreas, lockOrUnlockUser, resetPassword } from "../../api/userAPI/userApi";
import SelectForm from "../../components/elements/selectForm/SelectForm"
import Pagination from "../../components/templates/pagination";
import { useRouter } from 'next/router'
import Image from "../../components/elements/image/Image";
import ModalConfirm from "../../components/templates/modal/ModalConfirm";

const UserPage = () => {
    const router = useRouter();

    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [numPerPage, setNumPerPage] = useState(10);
    const [pageCount, setPageCount] = useState(0);

    const [requestSearch, setRequestSearch] = useState({
        keyword: "",
        status: "",
        area:"",
        role:""
    })
    console.log("helu anh Khang",requestSearch);
    const { keyword, status, area, role } = requestSearch;

    const [isShowLock, setIsShowLock] = useState(false);
    const [isShowUnlock, setIsShowUnlock] = useState(false);
    const [isShowReset, setIsShowReset] = useState(false);
    const [userId, setUserId] = useState("");

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

    const [roleOptions, setRoleOptions] = useState([
        {
            value : "ADMIN",
            text: "ADMIN"
        },
        {
            value : "USER",
            text: "NGƯỜI DÙNG"
        },  
    ])

    const [areaCodeOptions, setAreaCodeOptions] = useState([]);

    const getAreas = async () => {
        const dummyAreaOptions = [];
        await getAllActiveAreas().then(body => {
            if(body.data){
                body.data.forEach(item => {
                    const areaOption = {
                        text : item.name,
                        value : item.code
                    }
                    dummyAreaOptions.push(areaOption);
                });
            }
        })
        setAreaCodeOptions(dummyAreaOptions);
    }


    useEffect(() => {
        window["loadJsDefault"]();
        console.log("Call load JS Default by another page");
        getList(currentPage, numPerPage);
        setAccount(JSON.parse(localStorage.getItem("account")));
    }, []);

    const [account, setAccount] = useState('');
    useEffect(() => {
        if(account && account.area.length === 1){
            moveToOtherPage("/dashboard")
        }
    }, [account]); 

    useEffect(() => {
        window["reloadSelectPicker"]();
    }, [areaCodeOptions]);

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
        const { data } = await searchUser(page, itemPerPage, requestSearch);
        getAreas();
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
        // call api lock/unlock user
        await lockOrUnlockUser(id);
        getList(currentPage, numPerPage);
        setIsShowLock(true);
    }

    // Confirm lock
    const handleConfirmLock = async (confirm) => {
        if (confirm)
            await handleProceedLock(userId);
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
        await lockOrUnlockUser(id);
        getList(currentPage, numPerPage);
        setIsShowUnlock(true);
    }

    // Confirm lock
    const handleConfirmUnlock = async (confirm) => {
        if (confirm)
            await handleProceedUnlock(userId);
        handleCloseUnlock()
    }

    // Close lock
    const handleCloseUnlock = () => {
        setIsShowUnlock(false);
    }
    //* END UNLOCK*

    const onChange = (e) => {
        e.preventDefault();
        console.log(e.target.name);console.log(e.target.value);
        setRequestSearch({ ...requestSearch, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        getList(currentPage, numPerPage);
    }

    const moveToOtherPage = (path) => {
        router.push(path);
        window["destroySelectpicker"]();
    };


  return (

        <div className="d-flex flex-column-fluid">
            <div className="container">
                <div className="page-title">
                    Người dùng
                </div>
                <ul className="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold p-0 h5">
                    <li className="breadcrumb-item text-muted">
                        <a className="text-dark-50">
                            <span className="txt">Trang chủ</span>
                        </a>
                    </li>
                    <li className="breadcrumb-item text-muted breadcrumbs-item--active">
                        <a className="text-dark-50">
                            <span className="txt">Quản lý người dùng</span>
                        </a>
                    </li>
                </ul>


                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-border card-custom gutter-b example example-compact">
                            {/* form search */}
                            <div className="card-header">
                                <div className="row align-items-center flex-grow-1 list-mb16 list-crop my-4">
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
                                                value={requestSearch.status}
                                                defaultTitle="--Tất cả--"
                                                data={statusOptions}
                                                handleChange={(e) => onChange(e)}
                                                name="status"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="">
                                            <SelectForm
                                                styleClass="form-control selectpicker mb-3"
                                                title="Quyền"
                                                value={requestSearch.role}
                                                defaultTitle="--Tất cả--"
                                                data={roleOptions}
                                                handleChange={(e) => onChange(e)}
                                                name="role"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="">
                                            <SelectForm
                                                styleClass="form-control selectpicker mb-3"
                                                title="Khu vực"
                                                value={area}
                                                defaultTitle="--Tất cả--"
                                                data={areaCodeOptions}
                                                handleChange={(e) => onChange(e)}
                                                name="area"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center list-mb16 list-crop mx-2 my-4">
                                    <div className="col-auto">
                                        <button className="btn btn-primary w-20" onClick={(e) => onSubmit(e)}>
                                            Tìm kiếm
                                        </button>
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
                                                        onClick={() => {moveToOtherPage("/user/add")}}>
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
                                                            Tên người dùng
                                                        </th>
                                                        <th className="sort sort-no">
                                                            Email
                                                        </th>
                                                        <th className="sort sort-no">
                                                            Số điện thoại
                                                        </th>
                                                        <th className="sort sort-no">
                                                            Ngày sinh
                                                        </th>
                                                        <th className="sort sort-no">
                                                            Số chứng minh thư
                                                        </th>
                                                        <th className="sort sort-no">
                                                            Trạng thái
                                                        </th>
                                                        <th className="sort sort-no">
                                                            Khu vực
                                                        </th>
                                                        <th className="sort sort-no">
                                                            Quyền
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
                                                                    <td>{item.fullName}</td>
                                                                    <td>{item.email}</td>
                                                                    <td>{item.phoneNumber}</td>
                                                                    <td>{item.dob}</td>
                                                                    <td>{item.socialSecurityNum}</td>
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
                                                                    <td>
                                                                    {
                                                                        item.areas.length === 1 && item.areas
                                                                    }
                                                                    {
                                                                        item.areas.length > 1 && "Tất cả khu vực"
                                                                    }
                                                                    </td>
                                                                    <td>{item.role}</td>
                                                                    <td className="sticky-ult">
                                                                            <div className="text-center">
                                                                                <button className="btn btn-transaprent btn-icon btn-sm" onClick={() => {moveToOtherPage(`/user/detail/${item.id}`)}} data-tooltip="tooltip" title="Xem">
                                                                                    <Image src="/media/icons-color/subdefault/default/info.svg" alt="" styleClass={"btn-icon"} />
                                                                                </button>
                                                                                <button className="btn btn-transaprent btn-icon btn-sm" onClick={() => {moveToOtherPage(`/user/edit/${item.id}`)}} data-tooltip="tooltip" title="Chỉnh sửa">
                                                                                    <Image src="/media/icons-color/subdefault/default/24x24-edit.svg" alt="" styleClass={"btn-icon"} />
                                                                                </button>
                                                                                {
                                                                                    item.status == 0 && 
                                                                                    <button className="btn btn-transaprent btn-icon btn-sm" 
                                                                                        onClick={() => {
                                                                                            setIsShowUnlock(true);
                                                                                            setUserId(item.id);
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
                                                                                            setUserId(item.id);
                                                                                        }} 
                                                                                        data-tooltip="tooltip" title="Khóa">
                                                                                        <Image src="/media/icons-color/subdefault/default/24x24-lock.svg" alt="" styleClass={"btn-icon"} />
                                                                                    </button>
                                                                                }
                                                                                <button className="btn btn-transaprent btn-icon btn-sm" onClick={() => {}} data-tooltip="tooltip" title="Reset mật khẩu">
                                                                                    <Image src="/media/icons-color/default/default/key.svg" alt="" styleClass={"btn-icon"} />
                                                                                </button>
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
            {/* Modal for show user's LOCK*/}
            <ModalConfirm isShow={isShowLock} title={"XÁC NHẬN"} handleClose={handleConfirmLock}>
                <h5>BẠN CÓ CHẮC MUỐN KHÓA NGƯỜI DÙNG KHÔNG</h5>
            </ModalConfirm>
            {/* Modal for show user's UNLOCK */}
            <ModalConfirm isShow={isShowUnlock} title={"XÁC NHẬN"} handleClose={handleConfirmUnlock}>
                <h5>BẠN CÓ CHẮC MUỐN MỞ KHÓA NGƯỜI DÙNG KHÔNG</h5>
            </ModalConfirm>
            {/* Modal for show user's RESET PASS */}
            {/* <ModalConfirm isShow={isShowReset} title={"XÁC NHẬN"} handleClose={handleConfirmReset}>
                <h5>BẠN CÓ CHẮC MUỐN CÀI LẠI MẬT KHẨU NGƯỜI DÙNG KHÔNG</h5>
            </ModalConfirm> */}
        </div>
);
};
UserPage.Layout = LayoutPortal;
export default UserPage;

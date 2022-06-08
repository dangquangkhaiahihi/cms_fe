import React, {useEffect, useState} from "react";
import LayoutPortal from "../../components/layout/LayoutPortal";
import { searchBusinessPremises, getAllActiveBusinessType } from "../../api/businessPremisesAPI/businessPremisesApi";
import { getAllActiveAreas } from "../../api/userAPI/userApi";
import SelectForm from "../../components/elements/selectForm/SelectForm"
import Pagination from "../../components/templates/pagination";
import { useRouter } from 'next/router'
import Image from "../../components/elements/image/Image";
import ModalConfirm from "../../components/templates/modal/ModalConfirm";

const BusinessPremisesPage = () => {
    const router = useRouter();

    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [numPerPage, setNumPerPage] = useState(10);
    const [pageCount, setPageCount] = useState(0);

    const [requestSearch, setRequestSearch] = useState({
        keyword : "",
        area : "",
        businessType : "",
        foodSafetyCertificateProvidedBy : "",
        licenseStatus : "",
        certificateStatus : "",
        warningStatus : ""
    })
    const { keyword, area, businessType, foodSafetyCertificateProvidedBy, licenseStatus, certificateStatus, warningStatus} = requestSearch;

    const [isShowLock, setIsShowLock] = useState(false);
    const [isShowUnlock, setIsShowUnlock] = useState(false);
    const [areaId, setAreaId] = useState("");

    const [foodSafetyCertificateProvidedByOptions, setFoodSafetyCertificateProvidedByOptions] = useState([
        {
            value : "QUAN",
            text: "QUẬN"
        },
        {
            value : "THANH_PHO",
            text: "THÀNH PHỐ"
        },  
    ])

    const [certificateStatusOptions, setCertificateStatusOptions] = useState([
        {
            value : -1,
            text: "Chưa thêm giấy phép"
        },
        {
            value : 0,
            text: "Hết hiệu lực"
        },
        {
            value : 1,
            text: "Còn hiệu lực"
        },  
    ])

    const [licenseStatusOptions, setLicenseStatusOptions] = useState([
        {
            value : -1,
            text: "Chưa thêm ĐKKD"
        },
        {
            value : 0,
            text: "Hết hiệu lực"
        },
        {
            value : 1,
            text: "Còn hiệu lực"
        },  
    ])

    console.log(licenseStatusOptions);

    const [warningStatusOptions, setWarningStatusOptions] = useState([
        {
            value : 0,
            text: "Có vấn đề"
        },
        {
            value : 1,
            text: "Bình thường"
        },  
    ])

    const [areaOptions, setAreaOptions] = useState([]);
    const [businessTypeOptions, setBusinessTypeOptions] = useState([]);

    useEffect(() => {
        window["loadJsDefault"]();
        console.log("Call load JS Default by another page");
    }, []);

    useEffect(() => {
        getAreas();
        getBusinessTypes();
    }, [list]);

    // get list when currentPage, numPerPage change
    useEffect(() => {
        console.log(`currentPage: ${currentPage}, numPerPage: ${numPerPage}, total: ${total}`);
        const numOfPage = total % numPerPage === 0 ? (total / numPerPage) : (total / numPerPage + 1);
        console.log("numOffPage: ", numOfPage);
        setPageCount(numOfPage);
        getList(currentPage, numPerPage);
    }, [currentPage, numPerPage]);

    const getAreas = async () => {
        const dummyOptions = [];
        await getAllActiveAreas().then(body => {
            if(body.data){
                body.data.forEach(item => {
                    const areaOption = {
                        text : item.name,
                        value : item.code
                    }
                    dummyOptions.push(areaOption);
                });
            }
        })
        setAreaOptions(dummyOptions);
        window["reloadSelectPicker"]();
    }

    const getBusinessTypes = async () => {
        const dummyOptions = [];
        await getAllActiveBusinessType().then(body => {
            if(body.data){
                body.data.forEach(item => {
                    const areaOption = {
                        text : item.name,
                        value : item.code
                    }
                    dummyOptions.push(areaOption);
                });
            }
        })
        setBusinessTypeOptions(dummyOptions);
        window["reloadSelectPicker"]();
    }

    // Get list to table
    const getList = async (page, itemPerPage) => {
        if(JSON.parse(localStorage.getItem("account")).area.length == 1) {
            requestSearch.area = JSON.parse(localStorage.getItem("account")).area[0]
        }
        console.log(`page ${page} pagesize ${itemPerPage}`);
        const { data } = await searchBusinessPremises(page, itemPerPage, requestSearch);
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

    const onChange = (e) => {
        e.preventDefault();
        console.log(e.target.name);
        console.log(e.target.value);
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
                    <h2>Danh sách cơ sở kinh doanh</h2>
                </div>
                <ul className="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold p-0 h5">
                    <li className="breadcrumb-item text-muted">
                        <a className="text-dark-50">
                            <span className="txt">Trang chủ</span>
                        </a>
                    </li>   
                    <li className="breadcrumb-item text-muted breadcrumbs-item--active">
                        <a className="text-dark-50">
                            <span className="txt">Cơ sở kinh doanh</span>
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
                                        <label>Tìm kiếm</label>
                                        <div className="form-group">
                                            <input type="text" className="form-control input-search" onChange={(e) => onChange(e)}
                                                value={keyword} name="keyword" placeholder="Tìm kiếm"  />
                                        </div>
                                    </div>
                                    {
                                        JSON.parse(localStorage.getItem("account")).area.length > 1 &&
                                        <div className="col-md-3">
                                            <label>Khu vực</label>
                                            <div className="">
                                                <SelectForm
                                                    styleClass="form-control selectpicker mb-3"
                                                    title="Khu vực"
                                                    value={requestSearch.area}
                                                    defaultValue = ""
                                                    defaultTitle="--Tất cả--"
                                                    data={areaOptions}
                                                    handleChange={(e) => onChange(e)}
                                                    name="area"
                                                />
                                            </div>
                                        </div>
                                    }
                                    <div className="col-md-3">
                                        <label>Loại hình kinh doanh</label>
                                        <div className="">
                                            <SelectForm
                                                styleClass="form-control selectpicker mb-3"
                                                title="Loại hình kinh doanh"
                                                value={requestSearch.businessType}
                                                defaultTitle="--Tất cả--"
                                                data={businessTypeOptions}
                                                handleChange={(e) => onChange(e)}
                                                name="businessType"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <label>Nơi cấp chứng nhận</label>
                                        <div className="">
                                            <SelectForm
                                                styleClass="form-control selectpicker mb-3"
                                                title="Nơi cấp chứng nhận"
                                                value={requestSearch.foodSafetyCertificateProvidedBy}
                                                defaultTitle="--Tất cả--"
                                                data={foodSafetyCertificateProvidedByOptions}
                                                handleChange={(e) => onChange(e)}
                                                name="foodSafetyCertificateProvidedBy"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <label>Trạng thái ĐKKD</label>
                                        <div className="">
                                            <SelectForm
                                            styleClass="form-control selectpicker mb-3"
                                            title="Trạng thái ĐKKD"
                                            value= {requestSearch.licenseStatus}
                                            defaultTitle="--Tất cả--"
                                            data={licenseStatusOptions}
                                            handleChange={(e) => onChange(e)}
                                            name="licenseStatus"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <label>Trạng thái chứng nhận ATTP</label>
                                        <div className="">
                                            <SelectForm
                                                styleClass="form-control selectpicker mb-3"
                                                title="Trạng thái chứng nhận ATTP"
                                                value={requestSearch.certificateStatus}
                                                defaultTitle="--Tất cả--"
                                                data={certificateStatusOptions}
                                                handleChange={(e) => onChange(e)}
                                                name="certificateStatus"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <label>Trạng thái cảnh báo</label>
                                        <div className="">
                                            <SelectForm
                                                styleClass="form-control selectpicker mb-3"
                                                title="Trạng thái cảnh báo"
                                                value={requestSearch.warningStatus}
                                                defaultTitle="--Tất cả--"
                                                data={warningStatusOptions}
                                                handleChange={(e) => onChange(e)}
                                                name="warningStatus"
                                            />
                                        </div>
                                    </div>
                                    <div className="row justify-content-center my-4">
                                        <div className="col-auto">
                                            <button className="btn btn-primary w-20 " onClick={(e) => onSubmit(e)}>
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
                                            <div className="col-md">
                                                <div className="row row-16 justify-content-md-end align-items-center flex-grow-1">
                                                    <div className="col-auto">
                                                        <button className="btn btn-primary"
                                                        onClick={() => {router.push("/business_premises/add")}}>
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
                                                            Tên cơ sở
                                                        </th>
                                                        <th className="sort sort-no">
                                                            Địa chỉ
                                                        </th>
                                                        <th className="sort sort-no">
                                                            Địa chỉ chi tiết
                                                        </th>
                                                        <th className="sort sort-no">
                                                            Loại hình kinh doanh
                                                        </th>
                                                        <th className="sort sort-no">
                                                            Khu vực
                                                        </th>
                                                        <th className="sort sort-no">
                                                            Chủ
                                                        </th>
                                                        <th className="sort sort-no">
                                                            Quản lý
                                                        </th>
                                                        <th className="sort sort-no">
                                                            Chứng nhận cấp bởi
                                                        </th>
                                                        <th className="sort sort-no">
                                                            Trạng thái ĐKKD
                                                        </th>
                                                        <th className="sort sort-no">
                                                            Trạng thái giấy phép ATTP
                                                        </th>
                                                        <th className="sort sort-no">
                                                            Trạng thái cảnh báo
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
                                                                    <td>{item.name}</td>
                                                                    <td>{item.addressGeneral}</td>
                                                                    <td>{item.addressDetail}</td>
                                                                    <td>{item.businessType}</td>
                                                                    <td>{item.area}</td>
                                                                    <td>{item.ownerInfo}</td>
                                                                    <td>{item.managerInfo}</td>
                                                                    <td>
                                                                        {item.foodSafetyCertificateProvidedBy === 'QUAN' && 'Quận'}
                                                                        {item.foodSafetyCertificateProvidedBy === 'THANH_PHO' && 'Thành phố'}
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            item.licenseStatus == -1 && (
                                                                                <label className="label label-size-default label-warning label-inline">Chưa thêm</label>
                                                                            )
                                                                        }
                                                                        {
                                                                            item.licenseStatus == 0 && (
                                                                                <label className="label label-size-default label-light-danger label-inline">Hết hiệu lực</label>
                                                                            )
                                                                        }
                                                                        {
                                                                            item.licenseStatus == 1 && (
                                                                                <label className="label label-size-default label-light-success label-inline">Còn hiệu lực</label>
                                                                            )
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            item.certificateStatus == -1 && (
                                                                                <label className="label label-size-default label-warning label-inline">Chưa thêm</label>
                                                                            )
                                                                        }
                                                                        {
                                                                            item.certificateStatus == 0 && (
                                                                                <label className="label label-size-default label-light-danger label-inline">Hết hiệu lực</label>
                                                                            )
                                                                        }
                                                                        {
                                                                            item.certificateStatus == 1 && (
                                                                                <label className="label label-size-default label-light-success label-inline">Còn hiệu lực</label>
                                                                            )
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            item.warningStatus == 0 && (
                                                                                <label className="label label-size-default label-light-danger label-inline">Có vấn đề</label>
                                                                            )
                                                                        }
                                                                        {
                                                                            item.warningStatus == 1 && (
                                                                                <label className="label label-size-default label-light-success label-inline">Bình thường</label>
                                                                            )
                                                                        }
                                                                    </td>
                                                                    <td className="sticky-ult">
                                                                            <div className="text-center">
                                                                                <button className="btn btn-transaprent btn-icon btn-sm" onClick={() => {router.push(`/business_premises/detail/${item.id}`)}} data-tooltip="tooltip" title="Xem">
                                                                                    <Image src="media/icons-color/default/default/24x24-information-circle.svg" alt="" styleClass={"btn-icon"} />
                                                                                </button>
                                                                                <button className="btn btn-transaprent btn-icon btn-sm" onClick={() => {router.push(`/business_premises/edit/${item.id}`)}} data-tooltip="tooltip" title="Chỉnh sửa">
                                                                                    <Image src="/media/icons-color/default/default/24x24-edit.svg" alt="" styleClass={"btn-icon"} />
                                                                                </button>
                                                                                <button className="btn btn-transaprent btn-icon btn-sm" onClick={() => {router.push(`/business_premises/add_license/${item.id}`)}} data-tooltip="tooltip" title="Thêm tài liệu">
                                                                                    <Image src="/media/icons-color/default/default/24x24-document.svg" alt="" styleClass={"btn-icon"} />
                                                                                </button>
                                                                                <button className="btn btn-transaprent btn-icon btn-sm" onClick={() => {router.push(`/business_premises/add_person/${item.id}`)}} data-tooltip="tooltip" title="Thêm chủ/ quản lý">
                                                                                    <Image src="/media/icons-color/default/default/24x24-user.svg" alt="" styleClass={"btn-icon"} />
                                                                                </button>
                                                                                <button className="btn btn-transaprent btn-icon btn-sm" onClick={() => {router.push(`/business_premises/inspect/${item.id}`)}} data-tooltip="tooltip" title="Thanh tra">
                                                                                    <Image src="media/icons-color/default/default/info-2.svg" alt="" styleClass={"btn-icon"} />
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
        </div>
);
};
BusinessPremisesPage.Layout = LayoutPortal;
export default BusinessPremisesPage;

import { LIST_NUMBER_OF_PAGE } from "../../../constant";
import SelectForm from "../selectForm/SelectForm";
import Paginate from "../paginate/Paginate";

const renderRow = (row) => {
  return Object.entries(row).map(([key,value])=> {
    console.log("render item",key,value);
    return (
        <td key={key} dangerouslySetInnerHTML={{ __html:value}}></td>
    );
  })
};
const DataTable = ({ totalNumber, headers, contentBody }) => {


  return (
    <div className="table-wrap table-responsive-new">
      <div className="table-top">
        <div className="row align-items-center list-mb16 list-crop">
          <div className="col">
            Tổng số bản ghi:
            <span className="font-weight-500 text-primary">{totalNumber}</span>
          </div>
        </div>
      </div>
      <div className="table-wrap-inner">
        <table className="table table-sticky-ult table-striped">
          <thead>
            <tr>
              {headers &&
                headers.map((item,idx) =>
                  <th key={idx} className={item.styleClass}>{item.title}</th>
                )}
            </tr>
          </thead>
          <tbody>
 {contentBody && contentBody.length > 0 ? (
              contentBody.map((row, idx) => (
                <tr key={idx}>
                  {renderRow(row)}
                </tr>
              ))
            ) : (
              <tr>Data not found or empty</tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="record-and-pagination">
        <div className="row align-items-center list-mb16 list-crop justify-content-between">
          <div className="col-md-auto">
            <div className="record-number">
              <div className="row row-8 align-items-center">
                <div>Hiển thị</div>
                <div>
                  <SelectForm styleClass="form-control form-control-sm selectpicker" defaultTitle={"5"}/>
                </div>
                <div>bản ghi</div>
              </div>
            </div>
          </div>
          <div className="col-md-auto">
            <Paginate onPageChange={() => {}} pageCount={5} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;

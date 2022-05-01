const CardHeader = ({ title }) => {
  return (
    <div className="card-header">
      <div className="row row-16 align-items-center flex-grow-1">
        <div className="col-md">
          <div className="card-title">{title}</div>
        </div>
      </div>
    </div>
  );
};
export default CardHeader;

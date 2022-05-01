const Modal = ({
  id,
  styleClass,
  header,
  body,
  textLeft,
  actionLeft,
  styleClassLeft,
  textRight,
  actionRight,
  styleClassRight,
}) => {
  return (
    <div
      className={styleClass}
      id={id}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-sm modal-dialog-centered"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title h2 b" id="">
              {header}
            </h5>
          </div>
          <div className="modal-body text-center">{body}</div>
          <div className="modal-footer">
            <div className="row list-mb8 list-crop">
              <div className="col">
                <a
                  className="btn btn-secondary btn-block btn-lg"
                  data-dismiss="modal"
                  onClick={actionLeft}
                >
                  {textLeft}
                </a>
              </div>
              <div className="col">
                <a href="#" onClick={actionRight} className={styleClassRight}>
                  {textRight}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;

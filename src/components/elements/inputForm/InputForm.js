import Image from "../image/Image";

const InputForm = ({
  label,
  styleClass,
  placeHolder,
  type = "text",
  icon,
  required = false,
  readOnly = false,
}) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="input-icon">
        <input
          type={type}
          className={styleClass}
          placeholder={placeHolder}
          required={required}
          readOnly={readOnly}
        />
        {icon && (
          <span>
            <Image alt="" src={icon} />
          </span>
        )}
      </div>
    </div>
  );
};

export default InputForm;

const SelectForm = ({
  label = "",
  title = "",
  styleClass = "",
  defaultValue = "",
  defaultTitle = "Tất cả",
  name="",
  value = "",
  icon,
  required = false,
  readOnly = false,
  data,
  handleChange = () => {},
}) => {
  return (
    <div className="">
      <label>{label}</label>
      <select
        className={styleClass}
        title={title}
        // defaultValue=""
        onChange={handleChange}
        value=""
        name={name}
      >
        <option value={defaultValue}>{defaultTitle}</option>
        {data &&
          data.map((item, idx) => (
            <option key={idx} value={item.value}>
              {item.text}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SelectForm;

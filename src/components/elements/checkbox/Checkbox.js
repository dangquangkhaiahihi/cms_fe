const Checkbox = ({ label,name, handleChange}) => {
  return (<label className="checkbox">

      <input type="checkbox" name={name}  />

          <span></span>{label}

  </label>)
};

export default Checkbox;

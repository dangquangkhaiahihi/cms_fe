const Button = ({ children, id, title, styleClass, event = () => {} }) => {
  return (
    <button id={id} className={styleClass} onClick={event}>
      {children}
      {title}
    </button>
  );
};

export default Button;

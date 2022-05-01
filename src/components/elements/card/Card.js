const Card = ({ children, styleName }) => {
  return <div className={`card ${styleName}`}>{children}</div>;
};

export default Card;

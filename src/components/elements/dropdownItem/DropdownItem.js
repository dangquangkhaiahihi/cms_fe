import Link from "next/link";
import Image from "../image/Image";

const DropDownItem = ({ id, title, path, iconPath, isLogout }) => {
  return (
    <li className="navi-item" id={id}>
      <Link href={path}>
        <a
          className="navi-link"
          data-toggle={isLogout && "modal"}
          data-target={isLogout && "#logout"}
        >
          <Image src={iconPath} alt="" styleClass="navi-icon" />
          <span className="navi-text">{title}</span>
        </a>
      </Link>
    </li>
  );
};

export default DropDownItem;

import { MenuItem } from "../../elements/menuItem/MenuItem";
import Link from "next/link";
import Image from "../../elements/image/Image";

export const SubMenu = ({ id, title, iconPath, path, subMenu }) => {
  let hasSubMenu = subMenu && subMenu.length > 0;
  let classNameMenu = hasSubMenu ? "menu-item menu-item-submenu" : "menu-item";
  return (
    <li
      id={id}
      className={classNameMenu}
      aria-haspopup="true"
      data-menu-toggle="hover"
    >
      <Link href={path ? path : "#"}>
        <a className="menu-link menu-toggle">
          <div className="menu-icon">
            <Image src={iconPath} alt="" styleClass="" />
          </div>
          <span className="menu-text">{title}</span>
          {hasSubMenu && <i className="menu-arrow"></i>}
        </a>
      </Link>
      {hasSubMenu && (
        <div className="menu-submenu">
          <i className="menu-arrow"></i>
          <ul className="menu-subnav">
            {subMenu.map((item) => (
              <MenuItem key={item.id} title={item.title} path={item.path} />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

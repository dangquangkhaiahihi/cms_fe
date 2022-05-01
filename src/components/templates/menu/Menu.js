import { SubMenu } from "../subMenu/SubMenu";

const Menu = ({ menu }) => {
  return (
    <ul className="menu-nav">
      {menu &&
        menu.map((item) => (
          <SubMenu
            key={item.id}
            id={item.id}
            title={item.title}
            iconPath={item.iconPath}
            subMenu={item.subMenu}
            path={item.path}
          />
        ))}
    </ul>
  );
};

export default Menu;

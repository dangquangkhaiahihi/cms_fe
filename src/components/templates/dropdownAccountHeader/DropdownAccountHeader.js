import DropDownItem from "../../elements/dropdownItem/DropdownItem";

const fakeData = [
  {
    id: "1",
    title: "Thông tin cá nhân",
    path: "/dashboard/account-info",
    iconPath: "/media/icons-color/subdefault/default/profile.svg",
  },
  {
    id: "2",
    title: "Quên mật khẩu",
    path: "/",
    iconPath: "/media/icons-color/subdefault/default/edit-pass.svg",
  },
  {
    id: "3",
    title: "Đăng xuất",
    path: "/",
    iconPath: "/media/icons-color/subdefault/default/logout.svg",
    isLogout: true,
  },
];

const DropdownAccount = () => {
  return (
    <div className="dropdown-menu p-0 m-0 dropdown-menu-anim-up dropdown-menu-md dropdown-menu-right">
      <ul className="navi navi-hover py-4">
        {fakeData.map((item) => (
          <DropDownItem
            key={item.id}
            id={item.id}
            title={item.title}
            path={item.path}
            iconPath={item.iconPath}
          />
        ))}
      </ul>
    </div>
  );
};

export default DropdownAccount;

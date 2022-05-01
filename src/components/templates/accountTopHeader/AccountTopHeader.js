import DropdownAccount from "../dropdownAccountHeader/DropdownAccountHeader";
import Image from "../../elements/image/Image";

const userInfor = {
  id: "1",
  username: "12321",
  roleName: "Quản trị viên",
  image: "/ekyc_management/media/default/avatar.svg",
};
const hello = "Xin chào!";

const AccountTopHeader = () => {
  return (
    <div className="dropdown avatar-dropdown">
      <div
        className="topbar-item"
        data-toggle="dropdown"
        data-offset="10px,0px"
      >
        <div className="btn btn-icon w-auto d-flex align-items-center btn-lg px-2">
          <div className="avatar-text">
            <div className="h5 text-dark-50 text-right">{hello}</div>
            <div className="p font-weight-500">{userInfor.roleName}</div>
          </div>
          <div
            className="avatar-image"
            style={{
              backgroundImage: `url(${userInfor.image})`,
            }}
          ></div>
          <div className="avatar-arrow">
            <Image
              src="/media/icons-color/subdefault/default/carret-down.svg"
              alt=""
            />
          </div>
        </div>
      </div>
      <DropdownAccount />
    </div>
  );
};

export default AccountTopHeader;

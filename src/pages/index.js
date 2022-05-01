import Dashboard from "./dashboard/index";
import LayoutPortal from "../components/layout/LayoutPortal";

const DefaultPage = () => {
  return <Dashboard />;
};

DefaultPage.Layout = LayoutPortal;
export default DefaultPage;

import React, { useEffect } from "react";
import { capitalizeFirstLetter } from "../../../util/Utils";
import { useRouter } from "next/router";
import Crumb from "../crumb/Crumb";

//Có thể có bảng map giữa tên path sang tên hiển thị
const _defaultGetTextGenerator = (param, query) => null;
const _defaultGetDefaultTextGenerator = (path) => capitalizeFirstLetter(path);

// Pulled out the path part breakdown because its
// going to be used by both `asPath` and `pathname`
const generatePathParts = (pathStr) => {
  const pathWithoutQuery = pathStr.split("?")[0];
  return pathWithoutQuery.split("/").filter((v) => v.length > 0);
};

const Breadcrumb = ({
  getTextGenerator = _defaultGetTextGenerator,
  getDefaultTextGenerator = _defaultGetDefaultTextGenerator,
}) => {
  const router = useRouter();

  const breadcrumbs = React.useMemo(
    function generateBreadcrumbs() {
      const asPathNestedRoutes = generatePathParts(router.asPath);
      const pathnameNestedRoutes = generatePathParts(router.pathname);

      const crumbList = asPathNestedRoutes.map((subpath, idx) => {
        // Pull out and convert "[slug]" into "slug"
        const param = pathnameNestedRoutes[idx];
        // .replace("[", "")
        // .replace("]", "");

        const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
        return {
          href,
          textGenerator: getTextGenerator(param, router.query),
          text: getDefaultTextGenerator(subpath, href),
        };
      });

      return [{ href: "/", text: "Home" }, ...crumbList];
    },
    [
      router.asPath,
      router.pathname,
      router.query,
      getTextGenerator,
      getDefaultTextGenerator,
    ]
  );

  return (
    <ul className="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold p-0 h5">
      {breadcrumbs &&
        breadcrumbs.map((crumb, idx) => (
          <Crumb {...crumb} key={idx} last={idx === breadcrumbs.length - 1} />
        ))}
    </ul>
  );
};
export default Breadcrumb;

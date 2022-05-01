import getConfig from "next/config";

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { publicRuntimeConfig } = getConfig();
console.log("publicRuntimeConfig", publicRuntimeConfig);
const basePath = publicRuntimeConfig.basePath || "";

const Image = ({ styleClass, src, alt }) => {
  const url = basePath + "/" + src;
  return <img className={styleClass} alt={alt} src={url} />;
};

export default Image;

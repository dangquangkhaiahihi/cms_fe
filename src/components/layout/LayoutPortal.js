import KtHeaderMobile from "./header/KtHeaderMobile";
import KtHeader from "./header/KtHeader";
import Head from "next/head";
import Scroll from "../elements/scroll/Scroll";
import MainContent from "./mainContent/MainContent";

function LayoutPortal({ children }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="format-detection" content="telephone=no" />
      </Head>
      <KtHeaderMobile />
      <KtHeader />
      <MainContent>{children}</MainContent>
      <Scroll />
    </>
  );
}

export default LayoutPortal;

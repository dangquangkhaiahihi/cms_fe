import Document, { Html, Head, Main, NextScript } from "next/document";

import getConfig from "next/config";

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
console.log("publicRuntimeConfig", publicRuntimeConfig);
const basePath = publicRuntimeConfig.basePath || "";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content="EKYC for enterprise" />
          <meta property="og:title" content="EKYC title" />
          <meta property="og:description" content="EKYC for enterprise" />
          <meta property="og:url" content="https://abc.com/" />
          <meta property="og:type" content="website" />
          <link
            rel="shortcut icon"
            type="text/html"
            href="/media/favicon/favicon.png" />

           <link rel="preconnect" href="https://fonts.gstatic.com" />

            {/* <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800&display=swap" rel="stylesheet" /> */}
            <link rel="stylesheet" href={`${basePath}/fonts/main/remix-icons/remixicon.css`} />
            <link rel="stylesheet" href={`${basePath}/css/vendors/perfectScrollbar/perfectScrollbar.bundles.css`} />
            <link rel="stylesheet" href={`${basePath}/css/vendors/bootstrapSelect/bootstrapSelect.bundles.css`} />
            <link rel="stylesheet" href={`${basePath}/css/vendors/datetimePicker/datetimePicker.bundles.css`} />
            <link rel="stylesheet" href={`${basePath}/css/vendors/timepicker/timepicker.bundles.css`} />
            <link rel="stylesheet" href={`${basePath}/css/style.css`}  />
            <link rel="stylesheet" href={`${basePath}/css/custom.bundles.css`} />

        </Head>
        <body
          id="kt_body"
          className="header-mobile-fixed subheader-stuck aside-enabled aside-fixed page-loading aside-minimize-hoverable header-fixed"
        >
          <Main />
          <NextScript />

          <script src={`${basePath}/js/vendors/jquery/jquery.bundles.js`} />

          <script src={`${basePath}/js/vendors/metronic/metronic.init.js`} />

          <script src={`${basePath}/js/vendors/metronic/metronic.bundles.js`} />

          <script src={`${basePath}/js/vendors/popper/popper.bundles.js`} />

          <script src={`${basePath}/js/vendors/bootstrap/bootstrap.bundles.js`} />

          <script src={`${basePath}/js/vendors/moment/moment.bundles.js`} />

          <script src={`${basePath}/js/vendors/bootstrapSelect/bootstrapSelect.bundles.js`} />

          <script src={`${basePath}/js/vendors/datetimePicker/datetimePicker.bundles.js`} />

          <script src={`${basePath}/js/vendors/perfectScrollbar/perfectScrollbar.bundles.js`} />

          <script src={`${basePath}/js/vendors/autosize/autosize.bundles.js`} />

          <script src={`${basePath}/js/vendors/timepicker/timepicker.bundles.js`} />

          <script src={`${basePath}/js/vendors/wnumb/wnumb.bundles.js`} />

          <script src={`${basePath}/js/vendors/formvalidation/formvalidation.bundles.js`} />

          <script src={`${basePath}/js/vendors/cleave/cleave.bundles.js`} />

          <script src={`${basePath}/js/vendors/cleave/cleave.init.js`} />
          <script src={`${basePath}/js/vendors/highcharts/highcharts.bundles.js`} />
          <script src={`${basePath}/js/custom.js`} />
          <script src={`${basePath}/js/reloadSelectPicker.js`}></script>
          <script src={`${basePath}/js/destroySelectPicker.js`}></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;

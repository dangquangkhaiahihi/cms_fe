/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./src/components/layout/DefaultLayout.js":
/*!************************************************!*\
  !*** ./src/components/layout/DefaultLayout.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst DefaultLayout = ({ children  })=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: children\n    }, void 0, false)\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DefaultLayout);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9sYXlvdXQvRGVmYXVsdExheW91dC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQTBCO0FBRTFCLE1BQU1DLGFBQWEsR0FBRyxDQUFDLEVBQUVDLFFBQVEsR0FBRSxpQkFBSztrQkFBR0EsUUFBUTtxQkFBSTtBQUFDO0FBQ3hELGlFQUFlRCxhQUFhLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jbXNfZmUvLi9zcmMvY29tcG9uZW50cy9sYXlvdXQvRGVmYXVsdExheW91dC5qcz9hNTg0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmNvbnN0IERlZmF1bHRMYXlvdXQgPSAoeyBjaGlsZHJlbiB9KSA9PiA8PntjaGlsZHJlbn08Lz47XHJcbmV4cG9ydCBkZWZhdWx0IERlZmF1bHRMYXlvdXQ7XHJcbiJdLCJuYW1lcyI6WyJSZWFjdCIsIkRlZmF1bHRMYXlvdXQiLCJjaGlsZHJlbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/layout/DefaultLayout.js\n");

/***/ }),

/***/ "./src/components/router/RouteGuard.js":
/*!*********************************************!*\
  !*** ./src/components/router/RouteGuard.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../constant */ \"./src/constant/index.js\");\n\n\n\nfunction RouteGuard({ children  }) {\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();\n    const { 0: authorized , 1: setAuthorized  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{\n        // on initial load - run auth check\n        authCheck(router.asPath);\n        // on route change start - hide page content by setting authorized to false\n        const hideContent = ()=>setAuthorized(false)\n        ;\n        router.events.on(\"routeChangeStart\", hideContent);\n        // on route change complete - run auth check\n        router.events.on(\"routeChangeComplete\", authCheck);\n        // unsubscribe from events in useEffect return function\n        return ()=>{\n            router.events.off(\"routeChangeStart\", hideContent);\n            router.events.off(\"routeChangeComplete\", authCheck);\n        };\n    }, []);\n    function authCheck(url) {\n        // redirect to login page if accessing a private page and not logged in\n        console.log(url);\n        const publicPaths = [\n            \"/login\"\n        ];\n        const path = url.split(\"?\")[0];\n        console.log(publicPaths, path);\n        const userDetail = localStorage.getItem(\"access_token\");\n        if (!userDetail && !path.includes(\"login\")) {\n            setAuthorized(false);\n            router.push({\n                pathname: \"/login\",\n                query: {\n                    returnUrl: router.asPath\n                }\n            });\n        } else {\n            setAuthorized(true);\n        }\n    }\n    return authorized && children;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RouteGuard);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9yb3V0ZXIvUm91dGVHdWFyZC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBNEM7QUFDSjtBQUNBO0FBRXhDLFNBQVNJLFVBQVUsQ0FBQyxFQUFFQyxRQUFRLEdBQUUsRUFBRTtJQUM5QixNQUFNQyxNQUFNLEdBQUdKLHNEQUFTLEVBQUU7SUFDMUIsTUFBTSxFQU5WLEdBTVdLLFVBQVUsR0FOckIsR0FNdUJDLGFBQWEsTUFBSVIsK0NBQVEsQ0FBQyxLQUFLLENBQUM7SUFFbkRDLGdEQUFTLENBQUMsSUFBTTtRQUNaLG1DQUFtQztRQUNuQ1EsU0FBUyxDQUFDSCxNQUFNLENBQUNJLE1BQU0sQ0FBQyxDQUFDO1FBRXpCLDJFQUEyRTtRQUMzRSxNQUFNQyxXQUFXLEdBQUcsSUFBTUgsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUFDO1FBQy9DRixNQUFNLENBQUNNLE1BQU0sQ0FBQ0MsRUFBRSxDQUFDLGtCQUFrQixFQUFFRixXQUFXLENBQUMsQ0FBQztRQUVsRCw0Q0FBNEM7UUFDNUNMLE1BQU0sQ0FBQ00sTUFBTSxDQUFDQyxFQUFFLENBQUMscUJBQXFCLEVBQUVKLFNBQVMsQ0FBQztRQUVsRCx1REFBdUQ7UUFDdkQsT0FBTyxJQUFNO1lBQ1RILE1BQU0sQ0FBQ00sTUFBTSxDQUFDRSxHQUFHLENBQUMsa0JBQWtCLEVBQUVILFdBQVcsQ0FBQyxDQUFDO1lBQ25ETCxNQUFNLENBQUNNLE1BQU0sQ0FBQ0UsR0FBRyxDQUFDLHFCQUFxQixFQUFFTCxTQUFTLENBQUMsQ0FBQztTQUN2RDtLQUVKLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFUCxTQUFTQSxTQUFTLENBQUNNLEdBQUcsRUFBRTtRQUNwQix1RUFBdUU7UUFDdkVDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDRixHQUFHLENBQUMsQ0FBQztRQUNqQixNQUFNRyxXQUFXLEdBQUc7WUFBQyxRQUFRO1NBQUM7UUFDOUIsTUFBTUMsSUFBSSxHQUFHSixHQUFHLENBQUNLLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUJKLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxXQUFXLEVBQUNDLElBQUksQ0FBQyxDQUFDO1FBQzlCLE1BQU1FLFVBQVUsR0FBR0MsWUFBWSxDQUFDQyxPQUFPLENBQUMsY0FBYyxDQUFDO1FBQ3ZELElBQUksQ0FBQ0YsVUFBVSxJQUFJLENBQUNGLElBQUksQ0FBQ0ssUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3hDaEIsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JCRixNQUFNLENBQUNtQixJQUFJLENBQUM7Z0JBQ1JDLFFBQVEsRUFBRSxRQUFRO2dCQUNsQkMsS0FBSyxFQUFFO29CQUFFQyxTQUFTLEVBQUV0QixNQUFNLENBQUNJLE1BQU07aUJBQUU7YUFDdEMsQ0FBQyxDQUFDO1NBQ04sTUFBTTtZQUNIRixhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdkI7S0FDSjtJQUVELE9BQVFELFVBQVUsSUFBSUYsUUFBUSxDQUFFO0NBQ25DO0FBR0QsaUVBQWVELFVBQVUsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2Ntc19mZS8uL3NyYy9jb21wb25lbnRzL3JvdXRlci9Sb3V0ZUd1YXJkLmpzPzliZGUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9yb3V0ZXInO1xyXG5pbXBvcnQge0tFWV9VU0VSfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRcIjtcclxuXHJcbmZ1bmN0aW9uIFJvdXRlR3VhcmQoeyBjaGlsZHJlbiB9KSB7XHJcbiAgICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcclxuICAgIGNvbnN0IFthdXRob3JpemVkLCBzZXRBdXRob3JpemVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIC8vIG9uIGluaXRpYWwgbG9hZCAtIHJ1biBhdXRoIGNoZWNrXHJcbiAgICAgICAgYXV0aENoZWNrKHJvdXRlci5hc1BhdGgpO1xyXG5cclxuICAgICAgICAvLyBvbiByb3V0ZSBjaGFuZ2Ugc3RhcnQgLSBoaWRlIHBhZ2UgY29udGVudCBieSBzZXR0aW5nIGF1dGhvcml6ZWQgdG8gZmFsc2VcclxuICAgICAgICBjb25zdCBoaWRlQ29udGVudCA9ICgpID0+IHNldEF1dGhvcml6ZWQoZmFsc2UpO1xyXG4gICAgICAgIHJvdXRlci5ldmVudHMub24oJ3JvdXRlQ2hhbmdlU3RhcnQnLCBoaWRlQ29udGVudCk7XHJcblxyXG4gICAgICAgIC8vIG9uIHJvdXRlIGNoYW5nZSBjb21wbGV0ZSAtIHJ1biBhdXRoIGNoZWNrXHJcbiAgICAgICAgcm91dGVyLmV2ZW50cy5vbigncm91dGVDaGFuZ2VDb21wbGV0ZScsIGF1dGhDaGVjaylcclxuXHJcbiAgICAgICAgLy8gdW5zdWJzY3JpYmUgZnJvbSBldmVudHMgaW4gdXNlRWZmZWN0IHJldHVybiBmdW5jdGlvblxyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJvdXRlci5ldmVudHMub2ZmKCdyb3V0ZUNoYW5nZVN0YXJ0JywgaGlkZUNvbnRlbnQpO1xyXG4gICAgICAgICAgICByb3V0ZXIuZXZlbnRzLm9mZigncm91dGVDaGFuZ2VDb21wbGV0ZScsIGF1dGhDaGVjayk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sIFtdKTtcclxuXHJcbiAgICBmdW5jdGlvbiBhdXRoQ2hlY2sodXJsKSB7XHJcbiAgICAgICAgLy8gcmVkaXJlY3QgdG8gbG9naW4gcGFnZSBpZiBhY2Nlc3NpbmcgYSBwcml2YXRlIHBhZ2UgYW5kIG5vdCBsb2dnZWQgaW5cclxuICAgICAgICBjb25zb2xlLmxvZyh1cmwpO1xyXG4gICAgICAgIGNvbnN0IHB1YmxpY1BhdGhzID0gWycvbG9naW4nXTtcclxuICAgICAgICBjb25zdCBwYXRoID0gdXJsLnNwbGl0KCc/JylbMF07XHJcbiAgICAgICAgY29uc29sZS5sb2cocHVibGljUGF0aHMscGF0aCk7XHJcbiAgICAgICAgY29uc3QgdXNlckRldGFpbCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiYWNjZXNzX3Rva2VuXCIpO1xyXG4gICAgICAgIGlmICghdXNlckRldGFpbCAmJiAhcGF0aC5pbmNsdWRlcygnbG9naW4nKSkge1xyXG4gICAgICAgICAgICBzZXRBdXRob3JpemVkKGZhbHNlKTtcclxuICAgICAgICAgICAgcm91dGVyLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgcGF0aG5hbWU6ICcvbG9naW4nLFxyXG4gICAgICAgICAgICAgICAgcXVlcnk6IHsgcmV0dXJuVXJsOiByb3V0ZXIuYXNQYXRoIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2V0QXV0aG9yaXplZCh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChhdXRob3JpemVkICYmIGNoaWxkcmVuKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJvdXRlR3VhcmQ7XHJcbiJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVzZVJvdXRlciIsIktFWV9VU0VSIiwiUm91dGVHdWFyZCIsImNoaWxkcmVuIiwicm91dGVyIiwiYXV0aG9yaXplZCIsInNldEF1dGhvcml6ZWQiLCJhdXRoQ2hlY2siLCJhc1BhdGgiLCJoaWRlQ29udGVudCIsImV2ZW50cyIsIm9uIiwib2ZmIiwidXJsIiwiY29uc29sZSIsImxvZyIsInB1YmxpY1BhdGhzIiwicGF0aCIsInNwbGl0IiwidXNlckRldGFpbCIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJpbmNsdWRlcyIsInB1c2giLCJwYXRobmFtZSIsInF1ZXJ5IiwicmV0dXJuVXJsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/router/RouteGuard.js\n");

/***/ }),

/***/ "./src/constant/index.js":
/*!*******************************!*\
  !*** ./src/constant/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DEFAULT_PAGE\": () => (/* binding */ DEFAULT_PAGE),\n/* harmony export */   \"DEFAULT_PAGE_SIZE\": () => (/* binding */ DEFAULT_PAGE_SIZE),\n/* harmony export */   \"KEY_USER\": () => (/* binding */ KEY_USER),\n/* harmony export */   \"LIST_NUMBER_OF_PAGE\": () => (/* binding */ LIST_NUMBER_OF_PAGE)\n/* harmony export */ });\nconst KEY_USER = \"user\";\nconst DEFAULT_PAGE = 1;\nconst DEFAULT_PAGE_SIZE = 5;\nconst LIST_NUMBER_OF_PAGE = [\n    5,\n    10,\n    20,\n    50,\n    100\n];\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29uc3RhbnQvaW5kZXguanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFPLE1BQU1BLFFBQVEsR0FBRyxNQUFNLENBQUM7QUFFeEIsTUFBTUMsWUFBWSxHQUFHLENBQUMsQ0FBQztBQUN2QixNQUFNQyxpQkFBaUIsR0FBRyxDQUFDLENBQUM7QUFDNUIsTUFBTUMsbUJBQW1CLEdBQUc7QUFBQyxLQUFDO0FBQUUsTUFBRTtBQUFFLE1BQUU7QUFBRSxNQUFFO0FBQUUsT0FBRztDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jbXNfZmUvLi9zcmMvY29uc3RhbnQvaW5kZXguanM/ZmY4NSJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgS0VZX1VTRVIgPSAndXNlcic7XHJcblxyXG5leHBvcnQgY29uc3QgREVGQVVMVF9QQUdFID0gMTtcclxuZXhwb3J0IGNvbnN0IERFRkFVTFRfUEFHRV9TSVpFID0gNTtcclxuZXhwb3J0IGNvbnN0IExJU1RfTlVNQkVSX09GX1BBR0UgPSBbNSwgMTAsIDIwLCA1MCwgMTAwXTtcclxuXHJcbiJdLCJuYW1lcyI6WyJLRVlfVVNFUiIsIkRFRkFVTFRfUEFHRSIsIkRFRkFVTFRfUEFHRV9TSVpFIiwiTElTVF9OVU1CRVJfT0ZfUEFHRSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/constant/index.js\n");

/***/ }),

/***/ "./src/pages/_app.js":
/*!***************************!*\
  !*** ./src/pages/_app.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MyApp)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _redux_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../redux/store */ \"./src/redux/store.js\");\n/* harmony import */ var react_notifications__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-notifications */ \"react-notifications\");\n/* harmony import */ var react_notifications__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_notifications__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _components_layout_DefaultLayout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/layout/DefaultLayout */ \"./src/components/layout/DefaultLayout.js\");\n/* harmony import */ var _components_router_RouteGuard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/router/RouteGuard */ \"./src/components/router/RouteGuard.js\");\n/* harmony import */ var react_notifications_lib_notifications_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-notifications/lib/notifications.css */ \"./node_modules/react-notifications/lib/notifications.css\");\n/* harmony import */ var react_notifications_lib_notifications_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_notifications_lib_notifications_css__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\nfunction MyApp({ Component , pageProps  }) {\n    const store = (0,_redux_store__WEBPACK_IMPORTED_MODULE_2__.useStore)(pageProps.initialReduxState);\n    const Layout = Component.Layout || _components_layout_DefaultLayout__WEBPACK_IMPORTED_MODULE_4__[\"default\"];\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_redux__WEBPACK_IMPORTED_MODULE_1__.Provider, {\n        store: store,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_router_RouteGuard__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Layout, {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                        ...pageProps\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\khaidq\\\\Documents\\\\GitHub\\\\cms_fe\\\\src\\\\pages\\\\_app.js\",\n                        lineNumber: 15,\n                        columnNumber: 17\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_notifications__WEBPACK_IMPORTED_MODULE_3__.NotificationContainer, {}, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\khaidq\\\\Documents\\\\GitHub\\\\cms_fe\\\\src\\\\pages\\\\_app.js\",\n                        lineNumber: 16,\n                        columnNumber: 17\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\khaidq\\\\Documents\\\\GitHub\\\\cms_fe\\\\src\\\\pages\\\\_app.js\",\n                lineNumber: 14,\n                columnNumber: 13\n            }, this)\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\khaidq\\\\Documents\\\\GitHub\\\\cms_fe\\\\src\\\\pages\\\\_app.js\",\n            lineNumber: 13,\n            columnNumber: 9\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\khaidq\\\\Documents\\\\GitHub\\\\cms_fe\\\\src\\\\pages\\\\_app.js\",\n        lineNumber: 12,\n        columnNumber: 5\n    }, this);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUF1QztBQUNHO0FBQ2tCO0FBQ0c7QUFDTjtBQUNOO0FBRXBDLFNBQVNLLEtBQUssQ0FBQyxFQUFFQyxTQUFTLEdBQUVDLFNBQVMsR0FBRSxFQUFFO0lBQ3RELE1BQU1DLEtBQUssR0FBR1Asc0RBQVEsQ0FBQ00sU0FBUyxDQUFDRSxpQkFBaUIsQ0FBQztJQUNuRCxNQUFNQyxNQUFNLEdBQUdKLFNBQVMsQ0FBQ0ksTUFBTSxJQUFJUCx3RUFBYTtJQUNoRCxxQkFDRSw4REFBQ0gsaURBQVE7UUFBQ1EsS0FBSyxFQUFFQSxLQUFLO2tCQUNsQiw0RUFBQ0oscUVBQVU7c0JBQ1AsNEVBQUNNLE1BQU07O2tDQUNILDhEQUFDSixTQUFTO3dCQUFFLEdBQUdDLFNBQVM7Ozs7OzRCQUFJO2tDQUM1Qiw4REFBQ0wsc0VBQXFCOzs7OzRCQUFHOzs7Ozs7b0JBRWxCOzs7OztnQkFDRjs7Ozs7WUFFTixDQUNYO0NBQ0giLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jbXNfZmUvLi9zcmMvcGFnZXMvX2FwcC5qcz84ZmRhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XHJcbmltcG9ydCB7IHVzZVN0b3JlIH0gZnJvbSBcIi4uL3JlZHV4L3N0b3JlXCI7XHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvbkNvbnRhaW5lciB9IGZyb20gXCJyZWFjdC1ub3RpZmljYXRpb25zXCI7XHJcbmltcG9ydCBEZWZhdWx0TGF5b3V0IGZyb20gXCIuLi9jb21wb25lbnRzL2xheW91dC9EZWZhdWx0TGF5b3V0XCI7XHJcbmltcG9ydCBSb3V0ZUd1YXJkIGZyb20gXCIuLi9jb21wb25lbnRzL3JvdXRlci9Sb3V0ZUd1YXJkXCI7XHJcbmltcG9ydCAncmVhY3Qtbm90aWZpY2F0aW9ucy9saWIvbm90aWZpY2F0aW9ucy5jc3MnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTXlBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSB7XHJcbiAgY29uc3Qgc3RvcmUgPSB1c2VTdG9yZShwYWdlUHJvcHMuaW5pdGlhbFJlZHV4U3RhdGUpO1xyXG4gIGNvbnN0IExheW91dCA9IENvbXBvbmVudC5MYXlvdXQgfHwgRGVmYXVsdExheW91dDtcclxuICByZXR1cm4gKFxyXG4gICAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XHJcbiAgICAgICAgPFJvdXRlR3VhcmQ+XHJcbiAgICAgICAgICAgIDxMYXlvdXQ+XHJcbiAgICAgICAgICAgICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XHJcbiAgICAgICAgICAgICAgICA8Tm90aWZpY2F0aW9uQ29udGFpbmVyIC8+XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIDwvTGF5b3V0PlxyXG4gICAgICAgIDwvUm91dGVHdWFyZD5cclxuXHJcbiAgICA8L1Byb3ZpZGVyPlxyXG4gICk7XHJcbn1cclxuXHJcbiJdLCJuYW1lcyI6WyJQcm92aWRlciIsInVzZVN0b3JlIiwiTm90aWZpY2F0aW9uQ29udGFpbmVyIiwiRGVmYXVsdExheW91dCIsIlJvdXRlR3VhcmQiLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsInN0b3JlIiwiaW5pdGlhbFJlZHV4U3RhdGUiLCJMYXlvdXQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/_app.js\n");

/***/ }),

/***/ "./src/redux/reducers/account.js":
/*!***************************************!*\
  !*** ./src/redux/reducers/account.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _type_actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../type/actionTypes */ \"./src/redux/type/actionTypes.js\");\n\nconst initState = {};\nconst account = (state = initState, { type , payload  })=>{\n    switch(type){\n        case _type_actionTypes__WEBPACK_IMPORTED_MODULE_0__.ACCOUNT_LOGIN:\n            return payload;\n        case _type_actionTypes__WEBPACK_IMPORTED_MODULE_0__.ACCOUNT_LOGOUT:\n            return {};\n        default:\n            return state;\n    }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (account);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcmVkdXgvcmVkdWNlcnMvYWNjb3VudC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUE0QztBQUU1QyxNQUFNQyxTQUFTLEdBQUcsRUFBRTtBQUVwQixNQUFNQyxPQUFPLEdBQUcsQ0FBQ0MsS0FBSyxHQUFHRixTQUFTLEVBQUUsRUFBRUcsSUFBSSxHQUFFQyxPQUFPLEdBQUUsR0FBSztJQUN4RCxPQUFRRCxJQUFJO1FBQ1YsS0FBS0osNERBQW1CO1lBQ3BCLE9BQU9LLE9BQU8sQ0FBQztRQUNuQixLQUFLTCw2REFBb0I7WUFDckIsT0FBTyxFQUFFLENBQUM7UUFDZDtZQUNFLE9BQU9HLEtBQUs7S0FDZjtDQUNGO0FBRUQsaUVBQWVELE9BQU8sRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2Ntc19mZS8uL3NyYy9yZWR1eC9yZWR1Y2Vycy9hY2NvdW50LmpzPzc3YzMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi4vdHlwZS9hY3Rpb25UeXBlcydcclxuXHJcbmNvbnN0IGluaXRTdGF0ZSA9IHt9O1xyXG5cclxuY29uc3QgYWNjb3VudCA9IChzdGF0ZSA9IGluaXRTdGF0ZSwgeyB0eXBlLCBwYXlsb2FkIH0pID0+IHtcclxuICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgIGNhc2UgdHlwZXMuQUNDT1VOVF9MT0dJTjpcclxuICAgICAgICByZXR1cm4gcGF5bG9hZDtcclxuICAgIGNhc2UgdHlwZXMuQUNDT1VOVF9MT0dPVVQ6XHJcbiAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0dXJuIHN0YXRlXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhY2NvdW50O1xyXG4iXSwibmFtZXMiOlsidHlwZXMiLCJpbml0U3RhdGUiLCJhY2NvdW50Iiwic3RhdGUiLCJ0eXBlIiwicGF5bG9hZCIsIkFDQ09VTlRfTE9HSU4iLCJBQ0NPVU5UX0xPR09VVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/redux/reducers/account.js\n");

/***/ }),

/***/ "./src/redux/reducers/index.js":
/*!*************************************!*\
  !*** ./src/redux/reducers/index.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _account__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./account */ \"./src/redux/reducers/account.js\");\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,redux__WEBPACK_IMPORTED_MODULE_0__.combineReducers)({\n    account: _account__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n}));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcmVkdXgvcmVkdWNlcnMvaW5kZXguanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUF3QztBQUVSO0FBRWhDLGlFQUFlQSxzREFBZSxDQUFDO0lBQzdCQyxPQUFPO0NBQ1IsQ0FBQyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY21zX2ZlLy4vc3JjL3JlZHV4L3JlZHVjZXJzL2luZGV4LmpzPzM1NjMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSBcInJlZHV4XCI7XHJcblxyXG5pbXBvcnQgYWNjb3VudCBmcm9tIFwiLi9hY2NvdW50XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb21iaW5lUmVkdWNlcnMoe1xyXG4gIGFjY291bnQsXHJcbn0pO1xyXG4iXSwibmFtZXMiOlsiY29tYmluZVJlZHVjZXJzIiwiYWNjb3VudCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/redux/reducers/index.js\n");

/***/ }),

/***/ "./src/redux/store.js":
/*!****************************!*\
  !*** ./src/redux/store.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initializeStore\": () => (/* binding */ initializeStore),\n/* harmony export */   \"useStore\": () => (/* binding */ useStore)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var redux_devtools_extension__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-devtools-extension */ \"redux-devtools-extension\");\n/* harmony import */ var redux_devtools_extension__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(redux_devtools_extension__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux-thunk */ \"redux-thunk\");\n/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(redux_thunk__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _reducers_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reducers/index */ \"./src/redux/reducers/index.js\");\n/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! redux-logger */ \"redux-logger\");\n/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(redux_logger__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\nlet store;\nfunction initStore(initialState) {\n    return (0,redux__WEBPACK_IMPORTED_MODULE_1__.createStore)(_reducers_index__WEBPACK_IMPORTED_MODULE_4__[\"default\"], initialState, (0,redux_devtools_extension__WEBPACK_IMPORTED_MODULE_2__.composeWithDevTools)((0,redux__WEBPACK_IMPORTED_MODULE_1__.applyMiddleware)((redux_thunk__WEBPACK_IMPORTED_MODULE_3___default()), (0,redux_logger__WEBPACK_IMPORTED_MODULE_5__.createLogger)())));\n}\nconst initializeStore = (preloadedState)=>{\n    let _store = store !== null && store !== void 0 ? store : initStore(preloadedState);\n    // After navigating to a page with an initial Redux state, merge that state\n    // with the current state in the store, and create a new store\n    if (preloadedState && store) {\n        _store = initStore({\n            ...store.getState(),\n            ...preloadedState\n        });\n        // Reset the current store\n        store = undefined;\n    }\n    // For SSG and SSR always create a new store\n    if (true) return _store;\n    // Create the store once in the client\n    if (!store) store = _store;\n    return _store;\n};\nfunction useStore(initialState) {\n    const store1 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>initializeStore(initialState)\n    , [\n        initialState\n    ]);\n    return store1;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcmVkdXgvc3RvcmUuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFnQztBQUNxQjtBQUNVO0FBQ3JCO0FBQ0Y7QUFDSTtBQUU1QyxJQUFJTyxLQUFLO0FBRVQsU0FBU0MsU0FBUyxDQUFDQyxZQUFZLEVBQUU7SUFDL0IsT0FBT1Isa0RBQVcsQ0FDaEJJLHVEQUFRLEVBQ1JJLFlBQVksRUFDWk4sNkVBQW1CLENBQUNELHNEQUFlLENBQUNFLG9EQUFlLEVBQUVFLDBEQUFZLEVBQUUsQ0FBQyxDQUFDLENBQ3RFLENBQUM7Q0FDSDtBQUVNLE1BQU1JLGVBQWUsR0FBRyxDQUFDQyxjQUFjLEdBQUs7SUFDakQsSUFBSUMsTUFBTSxHQUFHTCxLQUFLLGFBQUxBLEtBQUssY0FBTEEsS0FBSyxHQUFJQyxTQUFTLENBQUNHLGNBQWMsQ0FBQztJQUUvQywyRUFBMkU7SUFDM0UsOERBQThEO0lBQzlELElBQUlBLGNBQWMsSUFBSUosS0FBSyxFQUFFO1FBQzNCSyxNQUFNLEdBQUdKLFNBQVMsQ0FBQztZQUNqQixHQUFHRCxLQUFLLENBQUNNLFFBQVEsRUFBRTtZQUNuQixHQUFHRixjQUFjO1NBQ2xCLENBQUMsQ0FBQztRQUNILDBCQUEwQjtRQUMxQkosS0FBSyxHQUFHTyxTQUFTLENBQUM7S0FDbkI7SUFFRCw0Q0FBNEM7SUFDNUMsSUFBSSxJQUE2QixFQUFFLE9BQU9GLE1BQU0sQ0FBQztJQUNqRCxzQ0FBc0M7SUFDdEMsSUFBSSxDQUFDTCxLQUFLLEVBQUVBLEtBQUssR0FBR0ssTUFBTSxDQUFDO0lBRTNCLE9BQU9BLE1BQU0sQ0FBQztDQUNmLENBQUM7QUFFSyxTQUFTRyxRQUFRLENBQUNOLFlBQVksRUFBRTtJQUNyQyxNQUFNRixNQUFLLEdBQUdQLDhDQUFPLENBQUMsSUFBTVUsZUFBZSxDQUFDRCxZQUFZLENBQUM7SUFBQSxFQUFFO1FBQUNBLFlBQVk7S0FBQyxDQUFDO0lBQzFFLE9BQU9GLE1BQUssQ0FBQztDQUNkIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY21zX2ZlLy4vc3JjL3JlZHV4L3N0b3JlLmpzP2RkNDkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlIH0gZnJvbSBcInJlZHV4XCI7XHJcbmltcG9ydCB7IGNvbXBvc2VXaXRoRGV2VG9vbHMgfSBmcm9tIFwicmVkdXgtZGV2dG9vbHMtZXh0ZW5zaW9uXCI7XHJcbmltcG9ydCB0aHVua01pZGRsZXdhcmUgZnJvbSBcInJlZHV4LXRodW5rXCI7XHJcbmltcG9ydCByZWR1Y2VycyBmcm9tIFwiLi9yZWR1Y2Vycy9pbmRleFwiO1xyXG5pbXBvcnQgeyBjcmVhdGVMb2dnZXIgfSBmcm9tIFwicmVkdXgtbG9nZ2VyXCI7XHJcblxyXG5sZXQgc3RvcmU7XHJcblxyXG5mdW5jdGlvbiBpbml0U3RvcmUoaW5pdGlhbFN0YXRlKSB7XHJcbiAgcmV0dXJuIGNyZWF0ZVN0b3JlKFxyXG4gICAgcmVkdWNlcnMsXHJcbiAgICBpbml0aWFsU3RhdGUsXHJcbiAgICBjb21wb3NlV2l0aERldlRvb2xzKGFwcGx5TWlkZGxld2FyZSh0aHVua01pZGRsZXdhcmUsIGNyZWF0ZUxvZ2dlcigpKSlcclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZVN0b3JlID0gKHByZWxvYWRlZFN0YXRlKSA9PiB7XHJcbiAgbGV0IF9zdG9yZSA9IHN0b3JlID8/IGluaXRTdG9yZShwcmVsb2FkZWRTdGF0ZSk7XHJcblxyXG4gIC8vIEFmdGVyIG5hdmlnYXRpbmcgdG8gYSBwYWdlIHdpdGggYW4gaW5pdGlhbCBSZWR1eCBzdGF0ZSwgbWVyZ2UgdGhhdCBzdGF0ZVxyXG4gIC8vIHdpdGggdGhlIGN1cnJlbnQgc3RhdGUgaW4gdGhlIHN0b3JlLCBhbmQgY3JlYXRlIGEgbmV3IHN0b3JlXHJcbiAgaWYgKHByZWxvYWRlZFN0YXRlICYmIHN0b3JlKSB7XHJcbiAgICBfc3RvcmUgPSBpbml0U3RvcmUoe1xyXG4gICAgICAuLi5zdG9yZS5nZXRTdGF0ZSgpLFxyXG4gICAgICAuLi5wcmVsb2FkZWRTdGF0ZSxcclxuICAgIH0pO1xyXG4gICAgLy8gUmVzZXQgdGhlIGN1cnJlbnQgc3RvcmVcclxuICAgIHN0b3JlID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLy8gRm9yIFNTRyBhbmQgU1NSIGFsd2F5cyBjcmVhdGUgYSBuZXcgc3RvcmVcclxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIF9zdG9yZTtcclxuICAvLyBDcmVhdGUgdGhlIHN0b3JlIG9uY2UgaW4gdGhlIGNsaWVudFxyXG4gIGlmICghc3RvcmUpIHN0b3JlID0gX3N0b3JlO1xyXG5cclxuICByZXR1cm4gX3N0b3JlO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVzZVN0b3JlKGluaXRpYWxTdGF0ZSkge1xyXG4gIGNvbnN0IHN0b3JlID0gdXNlTWVtbygoKSA9PiBpbml0aWFsaXplU3RvcmUoaW5pdGlhbFN0YXRlKSwgW2luaXRpYWxTdGF0ZV0pO1xyXG4gIHJldHVybiBzdG9yZTtcclxufVxyXG4iXSwibmFtZXMiOlsidXNlTWVtbyIsImNyZWF0ZVN0b3JlIiwiYXBwbHlNaWRkbGV3YXJlIiwiY29tcG9zZVdpdGhEZXZUb29scyIsInRodW5rTWlkZGxld2FyZSIsInJlZHVjZXJzIiwiY3JlYXRlTG9nZ2VyIiwic3RvcmUiLCJpbml0U3RvcmUiLCJpbml0aWFsU3RhdGUiLCJpbml0aWFsaXplU3RvcmUiLCJwcmVsb2FkZWRTdGF0ZSIsIl9zdG9yZSIsImdldFN0YXRlIiwidW5kZWZpbmVkIiwidXNlU3RvcmUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/redux/store.js\n");

/***/ }),

/***/ "./src/redux/type/actionTypes.js":
/*!***************************************!*\
  !*** ./src/redux/type/actionTypes.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ACCOUNT_LOGIN\": () => (/* binding */ ACCOUNT_LOGIN),\n/* harmony export */   \"ACCOUNT_LOGOUT\": () => (/* binding */ ACCOUNT_LOGOUT)\n/* harmony export */ });\n// ACCOUNT\nconst ACCOUNT_LOGIN = \"ACCOUNT_LOGIN\";\nconst ACCOUNT_LOGOUT = \"ACCOUNT_LOGOUT\";\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcmVkdXgvdHlwZS9hY3Rpb25UeXBlcy5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBLFVBQVU7QUFDSCxNQUFNQSxhQUFhLEdBQUcsZUFBZSxDQUFDO0FBQ3RDLE1BQU1DLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2Ntc19mZS8uL3NyYy9yZWR1eC90eXBlL2FjdGlvblR5cGVzLmpzP2UwNWQiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQUNDT1VOVFxyXG5leHBvcnQgY29uc3QgQUNDT1VOVF9MT0dJTiA9ICdBQ0NPVU5UX0xPR0lOJztcclxuZXhwb3J0IGNvbnN0IEFDQ09VTlRfTE9HT1VUID0gJ0FDQ09VTlRfTE9HT1VUJztcclxuIl0sIm5hbWVzIjpbIkFDQ09VTlRfTE9HSU4iLCJBQ0NPVU5UX0xPR09VVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/redux/type/actionTypes.js\n");

/***/ }),

/***/ "./node_modules/react-notifications/lib/notifications.css":
/*!****************************************************************!*\
  !*** ./node_modules/react-notifications/lib/notifications.css ***!
  \****************************************************************/
/***/ (() => {



/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-notifications":
/*!**************************************!*\
  !*** external "react-notifications" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-notifications");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-redux");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("redux");

/***/ }),

/***/ "redux-devtools-extension":
/*!*******************************************!*\
  !*** external "redux-devtools-extension" ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("redux-devtools-extension");

/***/ }),

/***/ "redux-logger":
/*!*******************************!*\
  !*** external "redux-logger" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("redux-logger");

/***/ }),

/***/ "redux-thunk":
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("redux-thunk");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/_app.js"));
module.exports = __webpack_exports__;

})();
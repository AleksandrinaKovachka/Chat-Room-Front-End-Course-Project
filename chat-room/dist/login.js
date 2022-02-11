/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/login.js":
/*!*********************!*\
  !*** ./js/login.js ***!
  \*********************/
/***/ (() => {

eval("const loginForm = document.getElementById(\"login-form\");\r\n\r\nloginForm.addEventListener(\"submit\", (event) => {\r\n    let formData = new FormData(event.target);\r\n    event.preventDefault();\r\n \r\n    const username = formData.get('username');\r\n    const password = formData.get('password');\r\n    \r\n    if(username == \"akovachka@expert.ai\" && password == \"ASDASD\") {\r\n        sessionStorage.setItem(\"username\", username);\r\n        location.href = \"user-chat-room.html\";\r\n    }\r\n    else {\r\n        alert(\"Wrong credentials\");\r\n    }\r\n})//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9sb2dpbi5qcy5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaGF0LXJvb20vLi9qcy9sb2dpbi5qcz9hZjEwIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGxvZ2luRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW4tZm9ybVwiKTtcclxuXHJcbmxvZ2luRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldmVudCkgPT4ge1xyXG4gICAgbGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGV2ZW50LnRhcmdldCk7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gXHJcbiAgICBjb25zdCB1c2VybmFtZSA9IGZvcm1EYXRhLmdldCgndXNlcm5hbWUnKTtcclxuICAgIGNvbnN0IHBhc3N3b3JkID0gZm9ybURhdGEuZ2V0KCdwYXNzd29yZCcpO1xyXG4gICAgXHJcbiAgICBpZih1c2VybmFtZSA9PSBcImFrb3ZhY2hrYUBleHBlcnQuYWlcIiAmJiBwYXNzd29yZCA9PSBcIkFTREFTRFwiKSB7XHJcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcInVzZXJuYW1lXCIsIHVzZXJuYW1lKTtcclxuICAgICAgICBsb2NhdGlvbi5ocmVmID0gXCJ1c2VyLWNoYXQtcm9vbS5odG1sXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBhbGVydChcIldyb25nIGNyZWRlbnRpYWxzXCIpO1xyXG4gICAgfVxyXG59KSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./js/login.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./js/login.js"]();
/******/ 	
/******/ })()
;
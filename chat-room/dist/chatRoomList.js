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

/***/ "./js/chat-room-list.js":
/*!******************************!*\
  !*** ./js/chat-room-list.js ***!
  \******************************/
/***/ (() => {

eval("// get all rooms from database - username is on session storage\r\n\r\nconst rooms = [\"Room1\", \"Room2\", \"Room3\"];\r\n\r\nwindow.onload = event => {\r\n    let roomlist = document.getElementById(\"chat-rooms-list\");\r\n\r\n    rooms.forEach((item, index) => {\r\n        let li = document.createElement(\"li\");\r\n        li.innerHTML = `\r\n        <div id=\"chat-room\">\r\n            <p id=\"room-name\">${item}</p>\r\n            <button id=\"add-room-${index}\" class=\"add-room-class\">Add</button>\r\n        </div>`;\r\n        roomlist.appendChild(li);\r\n\r\n        let addRoomBtn = document.getElementById(`add-room-${index}`);\r\n        addRoomBtn.addEventListener(\"click\", () => {\r\n            //added to rooms of the user - get the name of room\r\n            console.log(item);\r\n            //remove from array\r\n            console.log(\"added\");\r\n            addRoomBtn.textContent = \"Added\";\r\n            addRoomBtn.disabled = true;\r\n        })\r\n    })\r\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9jaGF0LXJvb20tbGlzdC5qcy5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLEtBQUs7QUFDckMsbUNBQW1DLE1BQU07QUFDekM7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELE1BQU07QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2hhdC1yb29tLy4vanMvY2hhdC1yb29tLWxpc3QuanM/ZmVlMSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBnZXQgYWxsIHJvb21zIGZyb20gZGF0YWJhc2UgLSB1c2VybmFtZSBpcyBvbiBzZXNzaW9uIHN0b3JhZ2VcclxuXHJcbmNvbnN0IHJvb21zID0gW1wiUm9vbTFcIiwgXCJSb29tMlwiLCBcIlJvb20zXCJdO1xyXG5cclxud2luZG93Lm9ubG9hZCA9IGV2ZW50ID0+IHtcclxuICAgIGxldCByb29tbGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhdC1yb29tcy1saXN0XCIpO1xyXG5cclxuICAgIHJvb21zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgbGV0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gICAgICAgIGxpLmlubmVySFRNTCA9IGBcclxuICAgICAgICA8ZGl2IGlkPVwiY2hhdC1yb29tXCI+XHJcbiAgICAgICAgICAgIDxwIGlkPVwicm9vbS1uYW1lXCI+JHtpdGVtfTwvcD5cclxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cImFkZC1yb29tLSR7aW5kZXh9XCIgY2xhc3M9XCJhZGQtcm9vbS1jbGFzc1wiPkFkZDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PmA7XHJcbiAgICAgICAgcm9vbWxpc3QuYXBwZW5kQ2hpbGQobGkpO1xyXG5cclxuICAgICAgICBsZXQgYWRkUm9vbUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBhZGQtcm9vbS0ke2luZGV4fWApO1xyXG4gICAgICAgIGFkZFJvb21CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgLy9hZGRlZCB0byByb29tcyBvZiB0aGUgdXNlciAtIGdldCB0aGUgbmFtZSBvZiByb29tXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGl0ZW0pO1xyXG4gICAgICAgICAgICAvL3JlbW92ZSBmcm9tIGFycmF5XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWRkZWRcIik7XHJcbiAgICAgICAgICAgIGFkZFJvb21CdG4udGV4dENvbnRlbnQgPSBcIkFkZGVkXCI7XHJcbiAgICAgICAgICAgIGFkZFJvb21CdG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./js/chat-room-list.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./js/chat-room-list.js"]();
/******/ 	
/******/ })()
;
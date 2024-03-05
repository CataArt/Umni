/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _translate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./translate */ \"./src/translate.ts\");\n/**\n * index ページの初期化処理\n */\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\ndocument.addEventListener('DOMContentLoaded', () => {\n    const editor = document.getElementById('editor');\n    const checkboxes = document.querySelectorAll('input[type=\"checkbox\"][name=\"dictionary\"]');\n    const translateButton = document.getElementById('translateButton');\n    const restoreButton = document.getElementById('restoreButton');\n    const replaceProbabilityInput = document.getElementById('replace_probability');\n    const originalTextArea = document.getElementById('original_text_area');\n    if (editor && translateButton && replaceProbabilityInput && originalTextArea && restoreButton) {\n        translateButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {\n            // 元のテキストを表示\n            originalTextArea.value = editor.value;\n            // チェックされた辞書のvalueを集めた配列を作成\n            const checkedDictionaries = Array.from(checkboxes)\n                .filter(checkbox => checkbox.checked)\n                .map(checkbox => checkbox.value);\n            editor.value = yield (0,_translate__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(editor.value, checkedDictionaries, replaceProbabilityInput.value);\n        }));\n        restoreButton.addEventListener('click', () => {\n            editor.value = originalTextArea.value;\n        });\n    }\n});\n\n\n//# sourceURL=webpack://Umni/./src/index.ts?");

/***/ }),

/***/ "./src/replacements.ts":
/*!*****************************!*\
  !*** ./src/replacements.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   loadReplacements: () => (/* binding */ loadReplacements)\n/* harmony export */ });\n/**\n * 置換用辞書取得\n */\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nfunction loadReplacements(filename) {\n    return __awaiter(this, void 0, void 0, function* () {\n        try {\n            const response = yield fetch(filename);\n            if (!response.ok) {\n                throw new Error(`Failed to fetch ${filename}: ${response.statusText}`);\n            }\n            const text = yield response.text();\n            const lines = text.split('\\n');\n            const replacements = new Map();\n            for (const line of lines) {\n                const parts = line.split(',');\n                if (parts.length !== 2) {\n                    // 不正なフォーマットの行を検出した場合は警告を出すか、エラーを投げる\n                    console.warn(`Ignoring malformed line: ${line}`);\n                    continue;\n                }\n                const [original, replacement] = parts;\n                replacements.set(original, replacement.replace(/[\\n\\r]+/, ''));\n            }\n            return replacements;\n        }\n        catch (error) {\n            console.error(`An error occurred while loading replacements: ${error}`);\n            throw error;\n        }\n    });\n}\n\n\n//# sourceURL=webpack://Umni/./src/replacements.ts?");

/***/ }),

/***/ "./src/translate.ts":
/*!**************************!*\
  !*** ./src/translate.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _replacements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./replacements */ \"./src/replacements.ts\");\n/**\n * 翻訳処理\n */\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\nfunction translate(text, selectedDictionaries, replaceProbabilityInput) {\n    return __awaiter(this, void 0, void 0, function* () {\n        let replacements = new Map();\n        let tempReplacements = new Map();\n        let counter = 1;\n        let replaceProbability = parseInt(replaceProbabilityInput);\n        // チェックされた辞書ファイルを読み込み、置換マップを作成\n        for (const dictName of selectedDictionaries) {\n            const dictReplacements = yield (0,_replacements__WEBPACK_IMPORTED_MODULE_0__.loadReplacements)(dictName);\n            // 一度置換したところを別の置換ルールでさらに置換しないために、一時的な置換マップを作成 \n            // (一時的な置換先は ★★1_aaa★★, ★★2_aaaa★★, ... となり、最後に元の置換先に置換される)\n            dictReplacements.forEach((val, key) => {\n                // 一時的な置換先を生成\n                // 一時的な置換先に数字が含まれるせいで、数字の置換元で置換してしまうことがあるので、あまり出現しない漢数字にしている\n                let tempKey = `★★${counter++}_${'a'.repeat(val.length)}★★`.replace(/1/g, '一').replace(/2/g, '二');\n                // 元の置換基を一時的な置換先にマッピング\n                tempReplacements.set(key, tempKey);\n                // 一時的な置換先を元の置換先にマッピング\n                replacements.set(tempKey, val);\n            });\n        }\n        // 置換元が長い順に優先して置換するためにソート\n        const tempSortedReplacements = Array.from(tempReplacements)\n            .sort((a, b) => b[0].length - a[0].length);\n        tempSortedReplacements.forEach(([original, replacement]) => {\n            if (replacement.length >= 13) {\n                // 変換後の文字列が長い場合、最初のマッチのみ置換 (同じ変換が複数回行われると、くどいので)\n                let replaced = false;\n                text = text.replace(new RegExp(original, 'g'), (match) => {\n                    if (!replaced && Math.random() * 100 <= replaceProbability) {\n                        replaced = true;\n                        return replacement.replace(/[\\n\\r]+/, '').replace(/\\\\n/g, '\\n');\n                    }\n                    else {\n                        return match;\n                    }\n                });\n            }\n            else {\n                // 変換後の文字列が短い場合は全てのマッチを置換\n                text = text.replace(new RegExp(original, 'g'), (match) => {\n                    if (Math.random() * 100 <= replaceProbability) {\n                        return replacement.replace(/[\\n\\r]+/, '').replace(/\\\\n/g, '\\n');\n                    }\n                    else {\n                        return match;\n                    }\n                });\n            }\n        });\n        // 一時的な置換を最終的な置換にする\n        Array.from(replacements)\n            .forEach(([original, replacement]) => {\n            text = text.replace(new RegExp(original, 'g'), replacement.replace(/[\\n\\r]+/, '').replace(/\\\\n/g, '\\n'));\n        });\n        // なんか底底が出てくるので、それを底に置換\n        text = text.replace(/底底/g, '底');\n        return text;\n    });\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (translate);\n\n\n//# sourceURL=webpack://Umni/./src/translate.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
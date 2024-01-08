"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * submit.ts
 */
function submit() {
    const editor = document.getElementById('editor');
    if (editor) {
        editor.value = editor.value.replace(/あ/g, 'い');
    }
}
exports.default = submit;

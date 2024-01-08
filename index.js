"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const submit_1 = __importDefault(require("./submit"));
document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submitButton');
    if (submitButton) {
        submitButton.addEventListener('click', submit_1.default);
    }
});
//document.querySelector('#submitButton').addEventListener('click', submit);
/*function submit(): void {
  const editor = document.getElementById('editor') as HTMLTextAreaElement;
  if (editor) {
    editor.value = editor.value.replace(/あ/g, 'い');
  }
}*/

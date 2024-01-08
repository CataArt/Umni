"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * submit.test.ts
 */
const submit_1 = __importDefault(require("./submit"));
describe('submit function', () => {
    it('replaces all occurrences of あ with い', () => {
        // DOM要素を模倣
        document.body.innerHTML = `<textarea id="editor"></textarea>`;
        const editor = document.getElementById('editor');
        editor.value = 'こんにちは、あああ世界';
        // 関数を実行
        (0, submit_1.default)();
        // 結果を検証
        expect(editor.value).toBe('こんにちは、いいい世界');
    });
});

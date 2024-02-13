/**
 * translate.test.ts
 */
import translate from './src/translate';

describe('translate function', () => {
  it('replaces all occurrences of あ with い', () => {
    // DOM要素を模倣
    document.body.innerHTML = `<textarea id="editor"></textarea>`;

    const editor = document.getElementById('editor') as HTMLTextAreaElement;
    editor.value = 'こんにちは、あああ世界';

    // 関数を実行
    translate();

    // 結果を検証
    expect(editor.value).toBe('こんにちは、いいい世界');
  });
});

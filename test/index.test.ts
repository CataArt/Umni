import '../src/index';
import translate from '../src/translate';

// translate関数のモックをjestで作成
jest.mock('../src/translate', () => ({
  __esModule: true, // ESモジュールとしてモックする場合に必要
  default: jest.fn().mockImplementation(() => Promise.resolve('mocked response'))
}));

describe('index page initialization', () => {
  beforeEach(() => {
    // テストのためのDOM要素のセットアップ
    document.body.innerHTML = `
      <textarea id="editor">text in editor</textarea>
      <input type="checkbox" name="dictionary" value="dictionary1">
      <input type="checkbox" name="dictionary" value="dictionary2">
      <button id="translateButton"></button>
      <input id="replace_probability" value="0.5">
      <textarea id="original_text_area">original text</textarea>
      <button id="restoreButton"></button>
    `;
    
    // indexページのスクリプトをエミュレートするために、DOMContentLoadedイベントを手動で発火
    const event = new Event('DOMContentLoaded', {
      bubbles: true,
      cancelable: true,
    });
    window.document.dispatchEvent(event);
  });

  it('should attach event listener to translate button', () => {
    const translateButton = document.getElementById('translateButton');
    if (translateButton) {
      translateButton.click();
    
      // translate関数が呼び出されたことを確認
      expect(translate).toHaveBeenCalled();
    } else {
      fail('translateButton is null');
    }
  });

  it('should pass correct arguments to translate function on button click', async () => {
    const translateButton = document.getElementById('translateButton');
    const editor = document.getElementById('editor') as HTMLTextAreaElement;
    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="dictionary"]') as NodeListOf<HTMLInputElement>;
    const replaceProbabilityInput = document.getElementById('replace_probability') as HTMLInputElement;
  
    if (translateButton && editor && replaceProbabilityInput) {
      // 非同期のclickイベントをシミュレートする方法を検討する
      translateButton.click();
  
      // 正しい引数でtranslateが呼び出されたかを確認
      const checkedDictionaries = Array.from(checkboxes).filter(c => c.checked).map(c => c.value);
      expect(translate).toHaveBeenCalledWith(editor.value, checkedDictionaries, replaceProbabilityInput.value);
    } else {
      fail('Setup failed: Required elements are null');
    }
  });

  it('戻すボタンを押すとeditorの中身がoriginal_textの中身になるか', () => {
    const restoreButton = document.getElementById('restoreButton');
    if (restoreButton) {
      restoreButton.click();
  
      // テキストが元に戻ったことを確認
      const editor = document.getElementById('editor') as HTMLTextAreaElement;
      const originalTextArea = document.getElementById('original_text_area') as HTMLTextAreaElement;
      expect(editor.value).toBe(originalTextArea.value);
    } else {
      fail('restoreButton is null');
    }
  });

  it('should only pass checked dictionaries to translate function on button click', async () => {
    // チェックボックスを明示的に選択する
    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="dictionary"]') as NodeListOf<HTMLInputElement>;
    // 最初のチェックボックスをチェックする
    if (checkboxes.length > 0) {
      checkboxes[0].checked = true; // 最初のチェックボックスにチェックを入れる
    } else {
      fail('No checkboxes found');
    }
  
    const translateButton = document.getElementById('translateButton');
    const editor = document.getElementById('editor') as HTMLTextAreaElement;
    const replaceProbabilityInput = document.getElementById('replace_probability') as HTMLInputElement;
  
    if (translateButton && editor && replaceProbabilityInput) {
      // translateボタンをクリック
      translateButton.click();
  
      // チェックされた辞書のみがtranslate関数に渡されることを確認
      const checkedDictionaries = Array.from(checkboxes).filter(c => c.checked).map(c => c.value);
      expect(translate).toHaveBeenCalledWith(editor.value, checkedDictionaries, replaceProbabilityInput.value);
      expect(checkedDictionaries.length).toBe(1); // チェックされた辞書は1つだけであることを確認
      expect(checkedDictionaries).toContain('dictionary1'); // チェックされた辞書のvalueが期待通りであることを確認
    } else {
      fail('Setup failed: Required elements are null');
    }
  });  
});

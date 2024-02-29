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
  
    // モック関数の戻り値を設定
    //(translate as jest.Mock).mockResolvedValue('translated text');
  
    if (translateButton && editor && replaceProbabilityInput) {
      // 非同期のclickイベントをシミュレートする方法を検討する
      //await 
      translateButton.click();
  
      // 正しい引数でtranslateが呼び出されたかを確認
      const checkedDictionaries = Array.from(checkboxes).filter(c => c.checked).map(c => c.value);
      expect(translate).toHaveBeenCalledWith(editor.value, checkedDictionaries, replaceProbabilityInput.value);
    } else {
      fail('Setup failed: Required elements are null');
    }
  });
});

import '../src/index';
import translate from '../src/translate';

// translate関数のモックをjestで作成
jest.mock('../src/translate', () => jest.fn());

describe('index page initialization', () => {
  beforeEach(() => {
    // テストのためのDOM要素のセットアップ
    document.body.innerHTML = `
      <textarea id="editor"></textarea>
      <input type="checkbox" name="dictionary" value="dictionary1">
      <input type="checkbox" name="dictionary" value="dictionary2">
      <button id="translateButton"></button>
      <input id="replace_probability" value="0.5">
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

  it('should pass correct arguments to translate function on button click', () => {
    const editor = document.getElementById('editor');
    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="dictionary"]');
    const replaceProbabilityInput = document.getElementById('replace_probability') as HTMLInputElement; 

    const translateButton = document.getElementById('translateButton');
    if (translateButton && replaceProbabilityInput) {
      translateButton.click();
    
      // translate関数が正しい引数で呼び出されたことを確認
      expect(translate).toHaveBeenCalledWith(editor, checkboxes, replaceProbabilityInput.value);
    } else if (!translateButton) {
        fail('translateButton is null');
    } else {
        fail('replaceProbabilityInput is null');
    }    
  });
});

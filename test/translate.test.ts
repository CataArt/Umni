import translate from '../src/translate';
import { loadReplacements } from '../src/replacements';

// loadReplacements と Math.random のモックを設定
jest.mock('../src/replacements');
jest.spyOn(global.Math, 'random').mockReturnValue(0.5); // 常に50%の確率で置換が行われるように設定

describe('辞書を選択する機能', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = ''; // DOMクリーンアップ
  });

  it.each([
    ['dict1', new Map([['original1', 'replacement1']]), 'original1original2', 'replacement1original2'],
    ['dict2', new Map([['original2', 'replacement2']]), 'original1original2', 'original1replacement2'],
  ])('replaces text using replacements from %s', async (dictName, replacementsMap, originalText, expectedReplacement) => {
    (loadReplacements as jest.Mock).mockResolvedValue(replacementsMap);

    document.body.innerHTML = `
      <textarea id="editor">${originalText}</textarea>
      <input type="checkbox" name="dictionary" value="${dictName}" checked>
    `;
    const editor = document.getElementById('editor') as HTMLTextAreaElement;
    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="dictionary"]') as NodeListOf<HTMLInputElement>;

    await translate(editor, checkboxes, '50');

    expect(editor.value).toContain(expectedReplacement);
    expect(loadReplacements).toHaveBeenCalledWith(dictName);
  });
});

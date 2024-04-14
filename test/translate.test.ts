import translate from '../src/translate';
import { loadReplacements } from '../src/replacements';

// loadReplacements と Math.random のモックを設定
jest.mock('../src/replacements');
jest.spyOn(global.Math, 'random').mockReturnValue(1); // 100%の確率で置換が行われるように設定


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
    const checkedDictionaries = Array.from(checkboxes).filter(c => c.checked).map(c => c.value);

    const translatedText = await translate(editor.value, checkedDictionaries, '100');

    expect(translatedText).toContain(expectedReplacement);
    expect(loadReplacements).toHaveBeenCalledWith(dictName);
  });
});

describe('置換元が長い順に優先して置換されるテスト', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('長い置換元が短い置換元よりも優先されて置換されること', async () => {
    const replacementsMap = new Map([
      ['short', 'S'],
      ['longes', 'L'],
      ['longest', 'LG'],
    ]);
    const originalText = 'longest short longes longest';
    const expectedText = 'LG S L LG';
    jest.spyOn(global.Math, 'random').mockReturnValue(0); // 100%の確率で置換が行われるように設定

    (loadReplacements as jest.Mock).mockResolvedValue(replacementsMap);

    const translatedText = await translate(originalText, ['dict'], '100');

    expect(translatedText).toBe(expectedText);
  });
});

describe('置換先の長さによる挙動のテスト', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = ''; // DOMクリーンアップ
  });

  it.each([
    ['短い置換先', new Map([['short', 'short2']]), 'shortText', 'short2Text', 100],
    ['長い置換先', new Map([['long', 'longReplacementThatIsVeryLong']]), 'longText', 'longReplacementThatIsVeryLongText', 100],
    // randomValue の受け付ける範囲が 1-100 なのに気をつける (本当は0の時に例外を出すなりするのが良い)
    ['短い置換先で置換なし', new Map([['short', 'short2']]), 'shortText', 'shortText', 1],
    ['長い置換先で置換なし', new Map([['long', 'longReplacementThatIsVeryLong']]), 'longText', 'longText', 1],
  ])('%s', async (description, replacementsMap, originalText, expectedText, randomValue) => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
    (loadReplacements as jest.Mock).mockResolvedValue(replacementsMap);

    const translatedText = await translate(originalText, ['dict'], randomValue.toString());
    expect(translatedText).toBe(expectedText);
  });
});

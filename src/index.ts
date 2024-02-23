/**
 * index ページの初期化処理
 */

import translate from './translate';

document.addEventListener('DOMContentLoaded', () => {
  const editor = document.getElementById('editor') as HTMLTextAreaElement | null;
  const checkboxes = document.querySelectorAll('input[type="checkbox"][name="dictionary"]') as NodeListOf<HTMLInputElement>;
  const translateButton = document.getElementById('translateButton') as HTMLButtonElement | null;
  const replaceProbabilityInput = document.getElementById('replace_probability') as HTMLInputElement | null;
  if (editor && translateButton && replaceProbabilityInput) {
    translateButton.addEventListener('click', async () => {
      // チェックされた辞書のvalueを集めた配列を作成
      const checkedDictionaries = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
      editor.value = await translate(editor.value, checkedDictionaries, replaceProbabilityInput.value);
    });
  }
});
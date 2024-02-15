/**
 * index ページの初期化処理
 */

import translate from './translate';

document.addEventListener('DOMContentLoaded', () => {
  const editor = document.getElementById('editor') as HTMLTextAreaElement | null;
  const checkboxes = document.querySelectorAll('input[type="checkbox"][name="dictionary"]') as NodeListOf<HTMLInputElement>;
  const translateButton = document.getElementById('translateButton') as HTMLButtonElement | null;
  if (editor && translateButton) {
    translateButton.addEventListener('click', () => translate(editor, checkboxes));
  }
});
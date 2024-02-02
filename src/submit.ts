import { loadReplacements } from './replacements';

async function submit(): Promise<void> {
  const editor = document.getElementById('editor') as HTMLTextAreaElement;
  const checkboxes = document.querySelectorAll('input[type="checkbox"][name="dictionary"]') as NodeListOf<HTMLInputElement>;
  let replacements = new Map<string, string>();

  for (const checkbox of checkboxes) {
    if (checkbox.checked) {
      const dictReplacements = await loadReplacements(checkbox.value);
      dictReplacements.forEach((val, key) => replacements.set(key, val));
    }
  }

  if (editor) {
    let value = editor.value;

    // マップを配列に変換し、元の言葉の長さに基づいて降順でソート
    const sortedReplacements = Array.from(replacements)
      .sort((a, b) => b[0].length - a[0].length);

      sortedReplacements.forEach(([original, replacement]) => {
        if (replacement.length >= 8) {
          // 変換後の文字列が5文字以上の場合、最初のマッチのみ置換
          value = value.replace(new RegExp(original), replacement.replace(/[\n\r]+/, '').replace(/\\n/g, '\n'));
        } else {
          // それ以外の場合は全てのマッチを置換
          value = value.replace(new RegExp(original, 'g'), replacement.replace(/[\n\r]+/, '').replace(/\\n/g, '\n'));
        }
      });
      value = value.replace(/底底/g, '底');

      /*
    sortedReplacements.forEach(([original, replacement]) => {
      value = value.replace(new RegExp(original, 'g'), replacement.replace(/[\n\r]+/, '').replace(/\\n/g, '\n'));
    });
    */
    editor.value = value;
  }
}
  export default submit;
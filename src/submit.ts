import { loadReplacements } from './replacements';

async function submit(): Promise<void> {
  const editor = document.getElementById('editor') as HTMLTextAreaElement;
  const checkboxes = document.querySelectorAll('input[type="checkbox"][name="dictionary"]') as NodeListOf<HTMLInputElement>;
  let replacements = new Map<string, string>();
  let tempReplacements = new Map<string, string>();
  let counter = 1;

  for (const checkbox of checkboxes) {
    if (checkbox.checked) {
      const dictReplacements = await loadReplacements(checkbox.value);
      dictReplacements.forEach((val, key) => {
        const tempKey = `[[${counter++}_${'a'.repeat(val.length)}]]`; // 一時的なキーを生成
        replacements.set(tempKey, val);
        tempReplacements.set(key, tempKey); // 元のキーを一時的なキーにマッピング
      });    
    }
  }

  if (editor) {
    let value = editor.value;

    // マップを配列に変換し、元の言葉の長さに基づいて降順でソート
    const tempSortedReplacements = Array.from(tempReplacements)
      .sort((a, b) => b[0].length - a[0].length);

    tempSortedReplacements.forEach(([original, replacement]) => {
      if (replacement.length >= 12) {
        // 変換後の文字列が8文字以上の場合、最初のマッチのみ置換
        value = value.replace(new RegExp(original), replacement.replace(/[\n\r]+/, '').replace(/\\n/g, '\n'));
      } else {
        // それ以外の場合は全てのマッチを置換
        value = value.replace(new RegExp(original, 'g'), replacement.replace(/[\n\r]+/, '').replace(/\\n/g, '\n'));
      }
    });

    // 一時的な置換を最終的な置換に変更
    Array.from(replacements)
      .forEach(([original, replacement]) => {
        const tempKey = tempReplacements.get(original);
        if (tempKey) {
          value = value.replace(new RegExp(tempKey, 'g'), replacement.replace(/[\n\r]+/, '').replace(/\\n/g, '\n'));

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
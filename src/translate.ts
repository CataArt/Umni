/**
 * 翻訳処理
 */

import { loadReplacements } from './replacements';

async function translate(text: string, selectedDictionaries: string[], replaceProbabilityInput: string): Promise<string> {
  let replacements = new Map<string, string>();
  let tempReplacements = new Map<string, string>();
  let counter = 1;
  let replaceProbability = parseInt(replaceProbabilityInput) || 50;

  // チェックされた辞書ファイルを読み込み、置換マップを作成
  for (const dictName of selectedDictionaries) {
    const dictReplacements = await loadReplacements(dictName);

    // 一度置換したところを別の置換ルールでさらに置換しないために、一時的な置換マップを作成 
    // (一時的な置換先は ★★1_aaa★★, ★★2_aaaa★★, ... となり、最後に元の置換先に置換される)
    dictReplacements.forEach((val, key) => {
      // 一時的な置換先を生成
      // 一時的な置換先に数字が含まれるせいで、数字の置換元で置換してしまうことがあるので、あまり出現しない漢数字にしている
      let tempKey = `★★${counter++}_${'a'.repeat(val.length)}★★`.replace(/1/g, '一').replace(/2/g, '二');
      // 元の置換基を一時的な置換先にマッピング
      tempReplacements.set(key, tempKey); 
      // 一時的な置換先を元の置換先にマッピング
      replacements.set(tempKey, val);
    });    
  }

  // 置換元が長い順に優先して置換するためにソート
  const tempSortedReplacements = Array.from(tempReplacements)
    .sort((a, b) => b[0].length - a[0].length);

  tempSortedReplacements.forEach(([original, replacement]) => {
    if (replacement.length >= 13) {
      // 変換後の文字列が長い場合、最初のマッチのみ置換 (同じ変換が複数回行われると、くどいので)
      let replaced = false;
      text = text.replace(new RegExp(original, 'g'), (match) => {
        if (!replaced && Math.random() * 100 <= replaceProbability) {
          replaced = true;
          return replacement.replace(/[\n\r]+/, '').replace(/\\n/g, '\n');
        } else {
          return match;
        }
      });
    } else {
      // 変換後の文字列が短い場合は全てのマッチを置換
      text = text.replace(new RegExp(original, 'g'), (match) => {
        if (Math.random() * 100 <= replaceProbability) {
          return replacement.replace(/[\n\r]+/, '').replace(/\\n/g, '\n');
        } else {
          return match;
        }
      });
    }
  });

  // 一時的な置換を最終的な置換にする
  Array.from(replacements)
    .forEach(([original, replacement]) => {
      text = text.replace(new RegExp(original, 'g'), replacement.replace(/[\n\r]+/, '').replace(/\\n/g, '\n'));
    });

  // なんか底底が出てくるので、それを底に置換
  text = text.replace(/底底/g, '底');
  return text;
}
  export default translate;
/**
 * 置換用辞書取得
 */

// ファイル名が特定の形式に一致することを示すカスタム型を定義
type CsvFileName = string;

// 置換辞書のエントリを表すインターフェース
interface ReplacementEntry {
  original: string;
  replacement: string;
}

export async function loadReplacements(filename: CsvFileName): Promise<Map<string, string>> {
  try {
    const response = await fetch(filename);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${filename}: ${response.statusText}`);
    }
    const text = await response.text();
    const lines = text.split('\n');
    const replacements = new Map<string, string>();

    for (const line of lines) {
      const parts = line.split(',');
      if (parts.length !== 2) {
        // 不正なフォーマットの行を検出した場合は警告を出すか、エラーを投げる
        console.warn(`Ignoring malformed line: ${line}`);
        continue;
      }
      const [original, replacement] = parts as [string, string];
      replacements.set(original, replacement.replace(/[\n\r]+/, ''));
    }

    return replacements;
  } catch (error) {
    // エラーハンドリングの強化
    console.error(`An error occurred while loading replacements: ${error}`);
    throw error;
  }
}
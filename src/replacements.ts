export async function loadReplacements(filename: string): Promise<Map<string, string>> {
  const response = await fetch(filename);
  const text = await response.text();
  const lines = text.split('\n');
  const replacements = new Map<string, string>();

  for (const line of lines) {
    const [original, replacement] = line.split(',');
    replacements.set(original, replacement);
  }

  return replacements;
}
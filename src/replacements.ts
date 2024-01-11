export async function loadReplacements(): Promise<Map<string, string>> {
    const response = await fetch('replacements.csv');
    const text = await response.text();
    const lines = text.split('\n');
    const replacements = new Map<string, string>();
  
    for (const line of lines) {
      const [original, replacement] = line.split(',');
      replacements.set(original, replacement);
    }
  
    return replacements;
  }
  
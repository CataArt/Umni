import { loadReplacements } from './replacements';

async function submit(): Promise<void> {
  const editor = document.getElementById('editor') as HTMLTextAreaElement;
  const dict1 = document.getElementById('dict1') as HTMLInputElement;
  const dict2 = document.getElementById('dict2') as HTMLInputElement;
  let replacements = new Map<string, string>();

  if (dict1.checked) {
    const dict1Replacements = await loadReplacements(dict1.value);
    dict1Replacements.forEach((val, key) => replacements.set(key, val));
  }
  if (dict2.checked) {
    const dict2Replacements = await loadReplacements(dict2.value);
    dict2Replacements.forEach((val, key) => replacements.set(key, val));
  }

  if (editor) {
    let value = editor.value;
    replacements.forEach((replacement, original) => {
      value = value.replace(new RegExp(original, 'g'), replacement);
    });
    editor.value = value;
  }
}

  export default submit;
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
    replacements.forEach((replacement, original) => {
      value = value.replace(new RegExp(original, 'g'), replacement.replace(/[\n\r]+/, ''));
    });
    editor.value = value;
  }
}
  export default submit;
import { loadReplacements } from './replacements';

async function submit(): Promise<void> {
  const editor = document.getElementById('editor') as HTMLTextAreaElement;
  if (editor) {
    const replacements = await loadReplacements();
    let value = editor.value;

    replacements.forEach((replacement, original) => {
      value = value.replace(new RegExp(original, 'g'), replacement);
    });

    editor.value = value;
  }
}
  export default submit;
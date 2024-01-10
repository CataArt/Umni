/**
 * submit.ts
 */
function submit(): void {
    const editor = document.getElementById('editor') as HTMLTextAreaElement;
    if (editor) {
      editor.value = editor.value.replace(/あ/g, 'い');
    }
  }
  export default submit;
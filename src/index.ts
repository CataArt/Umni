import submit from './submit';

document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submitButton');
    if (submitButton) {
      submitButton.addEventListener('click', submit);
    }
  });

//document.querySelector('#submitButton').addEventListener('click', submit);
/*function submit(): void {
  const editor = document.getElementById('editor') as HTMLTextAreaElement;
  if (editor) {
    editor.value = editor.value.replace(/あ/g, 'い');
  }
}*/

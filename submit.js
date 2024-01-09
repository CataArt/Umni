/**
 * submit.ts
 */
function submit() {
    const editor = document.getElementById('editor');
    if (editor) {
        editor.value = editor.value.replace(/あ/g, 'い');
    }
}
export default submit;

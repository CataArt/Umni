"use strict";
alert("1");
function submit() {
    const editor = document.getElementById('editor');
    if (editor) {
        editor.value = editor.value.replace(/あ/g, 'い');
    }
}

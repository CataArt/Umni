import submit from './submit';

document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submitButton');
    if (submitButton) {
      submitButton.addEventListener('click', submit);
    }
  });
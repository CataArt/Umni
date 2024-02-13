import submit from './submit';

document.addEventListener('DOMContentLoaded', () => {
  const submitButton = document.getElementById('submitButton') as HTMLButtonElement | null;
  if (submitButton) {
    submitButton.addEventListener('click', submit);
   }
});
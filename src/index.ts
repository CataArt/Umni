import translate from './translate';

document.addEventListener('DOMContentLoaded', () => {
  const translateButton = document.getElementById('translateButton') as HTMLButtonElement | null;
  if (translateButton) {
    translateButton.addEventListener('click', translate);
   }
});
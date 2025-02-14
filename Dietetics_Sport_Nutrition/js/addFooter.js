document.addEventListener('DOMContentLoaded', () => {
fetch("/components/footer.html")
  .then(response => response.text())
  .then(stringResponse => {
    const domParser = new DOMParser();
    const footerDocument = domParser.parseFromString(stringResponse, 'text/html');

    footerDocument.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
      document.head.appendChild(link.cloneNode(true));
    });

    const footerContent = footerDocument.querySelector('footer');
    if (footerContent) {
      document.querySelector('footer').innerHTML = footerContent.innerHTML;
    }
  })
  .catch(error => {
    console.error(error);
  });
});

document.addEventListener('DOMContentLoaded', () => {
fetch("/Dietetics_Sport_Nutrition/components/footer.html")
  .then(response => response.text())
  .then(stringResponse => {
    const domParser = new DOMParser();
    const footerDocument = domParser.parseFromString(stringResponse, 'text/html');
    console.log("Hola");
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

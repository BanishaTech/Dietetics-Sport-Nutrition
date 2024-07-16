document.addEventListener('DOMContentLoaded', () => {
fetch("/Dietetics_Sport_Nutrition/components/header.html")
  .then(response => response.text())
  .then(stringResponse => {
    const domParser = new DOMParser();
    const headerDocument = domParser.parseFromString(stringResponse, 'text/html');
    
    headerDocument.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
      document.head.appendChild(link.cloneNode(true));
    });

    const headerContent = headerDocument.querySelector('header');
    if (headerContent) {
      document.querySelector('header').innerHTML = headerContent.innerHTML;
    }
  })
  .catch(error => {
    console.error(error);
  });
});

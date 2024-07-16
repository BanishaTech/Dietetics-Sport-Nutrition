document.addEventListener('DOMContentLoaded', () => {
fetch("/Dietetics_Sport_Nutrition/components/button_navigation.html")
  .then(response => response.text())
  .then(stringResponse => {
    const domParser = new DOMParser();
    const buttonNavigationDocument = domParser.parseFromString(stringResponse, 'text/html');
    console.log("Hola");
    buttonNavigationDocument.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
      document.head.appendChild(link.cloneNode(true));
    });

    const buttonNavigationContent = buttonNavigationDocument.querySelector('.button-navigation');
    if (buttonNavigationContent) {
      document.querySelector('.button-navigation').innerHTML = buttonNavigationContent.innerHTML;
    }
  })
  .catch(error => {
    console.error(error);
  });
});

document.addEventListener('DOMContentLoaded', () => {
fetch("/components/header.html")
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

    headerDocument.querySelectorAll("script").forEach(script => {
      document.head.appendChild(script.cloneNode(true));
    });

    const input = document.querySelector('.searchlist');
    input.onkeypress = function(event) {
        console.log("Executing");
        if (event.key === 'Enter') {
          window.location.href = ("/searchResults/search_results.html?search="+ input.value);
           executeSearch();
        }
    };
  })
  .catch(error => {
    console.error(error);
  });
});


 // La función que se ejecutará cuando se presione Enter
function executeSearch() {
    const input = document.querySelector('.searchlist');
    console.log(`Execute search ${input.value}`);
       fetch(`http://localhost:1500/search?question=${input.value}`).then(response => response.json())
    .then(jsonData => {
        console.log(jsonData);
      })
}
document.addEventListener('DOMContentLoaded', async (event) => {
    let currentUrl = window.location.search;
    // Create a URLSearchParams object from the current URL
    let urlParams = new URLSearchParams(currentUrl);
    // Get the value of the 'search' parameter
    let idValue = urlParams.get('search');
    if (idValue == null) {
        return
    }



fetch(`http://localhost:1500/search?question=${idValue}`)
    .then(response => response.json())
    .then(jsonData => {
        console.log(jsonData)
        // document.body.innerHTML = fillTemplate(document.body, jsonData);
    });
});
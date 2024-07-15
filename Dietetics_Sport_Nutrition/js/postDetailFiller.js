

function fillTemplate(node, data) {
  return node.innerHTML.replace(/{{\s*(.*?)\s*}}/g, (match, key) => data[key.trim()]);
}

document.addEventListener('DOMContentLoaded', async (event) => {
    let currentUrl = window.location.search;
    // Create a URLSearchParams object from the current URL
    let urlParams = new URLSearchParams(currentUrl);
    // Get the value of the 'id' parameter
    let idValue = urlParams.get('id');
    if (idValue == null) {
    return
    }

    console.log("ID")

  fetch(`http://localhost:1500/dieteticsPostsDetail?id=${idValue}`)
    .then(response => response.json())
    .then(jsonData => {
      console.log(jsonData)
      document.body.innerHTML = fillTemplate(document.body, jsonData);

    //   const imageContainer = document.querySelector('.containerImageSection');
    //   for (i = 0; i < jsonData.length; i++) {
    //     let node = listItem.cloneNode(true);
    //     jsonData[i].image += "?i=" + i;
    //     node.innerHTML = fillTemplate(node, jsonData[i]);
    //     imageContainer.appendChild(node);
    //   }

    });
});
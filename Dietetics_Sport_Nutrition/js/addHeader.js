
var listItem = ""


async function getListItem() {
  try {
   
    const response = await fetch('/components/listItem/list_item.html');
    const text = await response.text();
    console.log(text);

    const parser = new DOMParser();
    const listItemHtml = parser.parseFromString(text, 'text/html');
    console.log(listItemHtml);

    const photoContent = listItemHtml.querySelector('.photo-content');
    console.log(photoContent);
    return photoContent;
  } catch (error) {
    console.error('Error al obtener el contenido:', error);
  }
}


function fillTemplate(node, data) {
  return node.innerHTML.replace(/{{\s*(.*?)\s*}}/g, (match, key) => data[key.trim()]);
}

// La función que se ejecutará cuando se presione Enter
function executeSearch() {
  const input = document.querySelector('.searchlist');
  if (input.value != null && input.value != undefined) {
    console.log(`Execute search ${input.value}`);
    fetch(`http://localhost:1500/search?question=${input.value}`).then(response => response.json())
      .then(jsonData => {
        console.log(jsonData);
      const imageContainer = document.querySelector('.containerImageSection');
      console.log("imageContainer")
      imageContainer.innerHTML = "";
      for (i = 0; i < jsonData.length; i++) {
        let node = listItem.cloneNode(true);
        jsonData[i].image += "?i=" + i;
        node.innerHTML = fillTemplate(node, jsonData[i]);
        imageContainer.appendChild(node);
        console.log("Holatt")
      }
      })
  }
}


document.addEventListener('DOMContentLoaded', () => {
  fetch("/components/header.html")
    .then(response => response.text())
    .then(async (stringResponse) => {
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

      listItem = await getListItem();

      const input = document.querySelector('.searchlist');
      input.onkeypress = function (event) {
        console.log("Executing");
        if (event.key === 'Enter') {
          if (window.location.pathname !== "/searchResults/search_results.html") {
            window.location.href = ("/searchResults/search_results.html?search=" + input.value);
          } else {
            executeSearch();
          }

        }
      };
    })
    .catch(error => {
      console.error(error);
    });
});
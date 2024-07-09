

function fillTemplate(node, data) {
  return node.innerHTML.replace(/{{\s*(.*?)\s*}}/g, (match, key) => data[key.trim()]);
}


async function getListItem() {
  try {
    // Realizar la solicitud fetch y esperar la respuesta
    const response = await fetch('list_item.html');

    const text = await response.text();
    console.log(text);

    // Parsear el texto como un documento HTML usando DOMParser
    const parser = new DOMParser();
    const listItemHtml = parser.parseFromString(text, 'text/html');
    console.log(listItemHtml);

    // Encontrar el elemento deseado dentro del documento HTML parseado
    const photoContent = listItemHtml.querySelector('.photo-content');
    console.log(photoContent);

    // Clonar el elemento encontrado y añadirlo al body
    return photoContent;
  } catch (error) {
    console.error('Error al obtener el contenido:', error);
  }
}

document.addEventListener('DOMContentLoaded', async (event) => {

  const listItem = await getListItem();
  fetch('http://localhost:1500/dieteticsPosts/')
    .then(response => response.json())
    .then(jsonData => {
      console.log(jsonData)
      // coger el div del index.html uno nuevo que crees con una clase que crees en el css
      for (i = 0; i < jsonData.length; i++) {
        let node = listItem.cloneNode(true);
        jsonData[i].image += "?i=" + i;
        node.innerHTML = fillTemplate(node, jsonData[i]);
        // No añadir en el body sino en el div que crees
        document.body.appendChild(node);
      }

    });
});
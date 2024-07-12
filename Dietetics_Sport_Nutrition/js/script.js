

function fillTemplate(node, data) {
  return node.innerHTML.replace(/{{\s*(.*?)\s*}}/g, (match, key) => data[key.trim()]);
}

async function getListItem() {
  try {
   
    const response = await fetch('list_item.html');
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

document.addEventListener('DOMContentLoaded', async (event) => {

  const listItem = await getListItem();
  fetch('http://localhost:1500/dieteticsPosts/')
    .then(response => response.json())
    .then(jsonData => {
      console.log(jsonData)

      const imageContainer = document.querySelector('.containerImageSection');
      for (i = 0; i < jsonData.length; i++) {
        let node = listItem.cloneNode(true);
        jsonData[i].image += "?i=" + i;
        node.innerHTML = fillTemplate(node, jsonData[i]);
        imageContainer.appendChild(node);
      }

    });
});
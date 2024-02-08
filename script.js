const form = document.getElementById("search-form");
const searcInput = document.getElementById("search");

const baseUrl = "https://pixabay.com/api/";
const apiKey = "42245605-0dbdc35c679b3a5690c43970e";

function imgSearch() {
  let searchWord = document.getElementById("search").value;
  let colors = document.getElementById("colorSlider").value;

  fetch(
    `${baseUrl}?key=${apiKey}&q=${searchWord}&image_type=photo&orientation=horizontal&safesearch=true&per_page=10&colors=${colors}`
  )
    .then((response) => response.json())
    .then((data) => {
      const resultContainer = document.getElementById("result");
      resultContainer.innerHTML = "";

      data.hits.forEach((hit) => {
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");

        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("image-wrapper");

        const image = document.createElement("img");
        image.src = hit.largeImageURL;
        image.width = 400;
        image.alt = hit.tags;

        const tags = document.createElement("p");
        tags.classList.add("tags");
        tags.textContent = hit.tags;

        const photographer = document.createElement("p");
        photographer.classList.add("photographer");
        photographer.textContent = `Photographer: ${hit.user}`;

        imageWrapper.appendChild(image);
        imageContainer.appendChild(imageWrapper);
        imageContainer.appendChild(tags);
        imageContainer.appendChild(photographer);

        resultContainer.appendChild(imageContainer);
        console.log(baseUrl);
      });
    })
    .finally(() => {
      form.reset();
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = searcInput.value;

  if (searchTerm && searchTerm !== "") {
    imgSearch();
  } else {
    window.location.reload();
  }
});

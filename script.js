const form = document.getElementById("search-form");
const searchInput = document.getElementById("search");
const colorSlider = document.getElementById("colorSlider");

const nextPageButton = document.getElementById("next-page-button");
const prevPageButton = document.getElementById("prev-page-button");
const buttonContainer = document.querySelector(".button-container");

const baseUrl = "https://pixabay.com/api/";
const apiKey = "42245605-0dbdc35c679b3a5690c43970e";

const resultContainer = document.getElementById("result");

let currentPage = 1;
let perPage = 10;
let searchWord = "";
let colors = "";
let pictureCount = 0;

function imgSearch() {
  updateButtonContainerVisibility(true);

  fetch(
    `${baseUrl}?key=${apiKey}&q=${searchWord}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${currentPage}&colors=${colors}`
  )
    .then((response) => response.json())
    .then((data) => {
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
      });
    })
    .finally(() => {
      pictureCount = resultContainer.children.length;
      updatePageButtonsState();
    });
}

function loadNextPage() {
  currentPage++;
  imgSearch();
}

function loadPrevPage() {
  if (currentPage > 1) {
    currentPage--;
    imgSearch();
  }
}

function updatePageButtonsState() {
  prevPageButton.disabled = currentPage === 1;
  nextPageButton.disabled = pictureCount < 10;
}

function updateButtonContainerVisibility(show) {
  buttonContainer.style.display = show ? "block" : "none";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentPage = 1;
  searchWord = searchInput.value;
  colors = colorSlider.value;
  imgSearch();
});

nextPageButton.addEventListener("click", () => {
  loadNextPage();
});

prevPageButton.addEventListener("click", () => {
  loadPrevPage();
});

updateButtonContainerVisibility(false);
updatePageButtonsState();

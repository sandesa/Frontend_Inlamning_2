const form = document.getElementById("search-form");
const searcInput = document.getElementById("search");

const baseUrl = "https://pixabay.com/api/";
const apiKey = "42245605-0dbdc35c679b3a5690c43970e";

function imgSearch() {
  let searchWord = document.getElementById("search").value;
  fetch(
    `${baseUrl}?key=${apiKey}&q=${searchWord}&image_type=photo&orientation=horizontal&safesearch=true`
  )
    .then((response) => response.json())
    .then((data) => {
      const images = data.hits.map((hit) => {
        return `<img src="${hit.largeImageURL}" width="400"/>`;
      });

      document.getElementById("result").innerHTML = images.join("");
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

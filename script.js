const form = document.getElementById("search-form");
const searcInput = document.getElementById("search");

const baseUrl = "https://pixabay.com/api/";
const apiKey = "42245605-0dbdc35c679b3a5690c43970e";

function imgSearch() {
  let searchWord = document.getElementById("search").value;
  fetch(
    `${baseUrl}?key=${apiKey}&q=${searchWord}&image_type=photo&orientation=horizontal&safesearch=true`
  ).then((response) => {
    response
      .json()
      .then((data) => {
        const hitsNumber = Math.round(Math.random() * (20 - 1) + 1);
        const largeImageURL = data.hits[hitsNumber].largeImageURL;
        const img = "<img src='" + largeImageURL + "'width=400/>";
        document.getElementById("result").innerHTML = img;
      })
      .finally(() => {
        form.reset();
      });
    console.log(result);
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

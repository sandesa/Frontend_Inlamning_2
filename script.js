function imageSearch() {
  console.log("Hello world");

  var keyWord = document.getElementById("keyWord").value;
  var apiKey = "42245605-0dbdc35c679b3a5690c43970e";
  var url =
    "https://pixabay.com/api/?key=" +
    apiKey +
    "&q=" +
    encodeURIComponent(keyWord);

  $.getJSON(url, function (data) {
    console.log(data.totalHits);
  });
}
console.log(url);

var get_url = "https://pixabay.com/api/";
var api_key = "42245605-0dbdc35c679b3a5690c43970e";
var q = keyWord;
var per_page = 10;

var url = get_url + "?key=" + api_key + q + per_page;

$.get(secondUrl, function (data, status) {
  console.log(data);

  for (var i = 0; i < data.hits.length; i++) {
    let pic = data.hits[i].webformatURL;
    $("#results").append("<img class='img' src='" + pic + "'>");
  }
});

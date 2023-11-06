const API_KEY = "f15e3b78ab011b4f0ae84e1556ee2de9";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const url =
  "https://api.themoviedb.org/3/search/movie?api_key=f15e3b78ab011b4f0ae84e1556ee2de9";

const input = document.querySelector("#input");
const button = document.querySelector("#search");
const movieSearch = document.querySelector("#movie-search");

function movieSection(movies) {
  return movies.map((movie) => {
    if (movie.poster_path) {
      return `<img src=${IMG_URL + movie.poster_path} data-movie-id=${
        movie.id
      }/>`;
    }
  });
}

function movieContainer(movies) {
  const movie = document.createElement("div");
  movie.setAttribute("class", "movie");

  const movieTemplate = `
    <section class="section">
        ${movieSection(movies)}
    </section>`;

  movie.innerHTML = movieTemplate;
  return movie;
}

function renderSearchMovies(data) {
  movieSearch.innerHTML = "";
  const movies = data.results;
  const movieBlock = movieContainer(movies);
  movieSearch.appendChild(movieBlock);
  console.log("Data :", data);
}

button.onclick = function (event) {
  event.preventDefault();
  const value = input.value;

  const newUrl = url + "&query=" + value;

  fetch(newUrl)
    .then((res) => res.json())
    .then(renderSearchMovies)
    .catch((error) => {
      console.log("Error :", error);
    });

  input.value = "";
  console.log("Value :", value);
};

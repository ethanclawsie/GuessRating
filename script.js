let movies = [];

async function loadMovies() {
  try {
    const response = await fetch("movies.txt");
    if (!response.ok) {
      throw new Error("Failed to fetch movie data");
    }
    const data = await response.text();
    const lines = data.split("\n");
    movies = lines.map((line) => {
      const [title, rating] = line.split(" - ");
      return { title, rating: parseFloat(rating) };
    });

    const [movie1, movie2] = getRandomDistinctMovies(movies);

    document.getElementById("movie1").innerText = movie1.title;
    document.getElementById("movie2").innerText = movie2.title;
  } catch (error) {
    console.error("Error loading movie data:", error);
  }
}

function getRandomDistinctMovies(movies) {
  let movie1, movie2;
  do {
    movie1 = getRandomMovie(movies);
    movie2 = getRandomMovie(movies);
  } while (movie1.rating === movie2.rating);

  return [movie1, movie2];
}

function getRandomMovie(movies) {
  return movies[Math.floor(Math.random() * movies.length)];
}

function makeGuess(selectedMovie) {
  const movie1Title = document.getElementById("movie1").innerText;
  const movie2Title = document.getElementById("movie2").innerText;

  const movie1Rating = movies.find(
    (movie) => movie.title === movie1Title
  ).rating;
  const movie2Rating = movies.find(
    (movie) => movie.title === movie2Title
  ).rating;

  let resultText = "";

  if (
    (selectedMovie === 1 && movie1Rating > movie2Rating) ||
    (selectedMovie === 2 && movie2Rating > movie1Rating)
  ) {
    resultText = "Correct!";
  } else {
    resultText = "Wrong. Try again!";
  }

  document.getElementById("result").innerText = resultText;
  loadMovies();
}

// Load initial movies
loadMovies();

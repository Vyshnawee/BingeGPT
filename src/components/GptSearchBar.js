import React from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/langConstant";
import { useRef } from "react";
import genAI from "../utils/genAI";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const handleGptSeachClick = async () => {
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query: " +
      searchText.current.value +
      ". only give me names of 5 movies, comma separated.";

    const result = await genAI.generateContent(gptQuery);

    console.log(result?.response?.text());
    const gptMovies = result?.response?.text().split(",");
    console.log(gptMovies);

    const promiseArray = gptMovies.map((movie) => searchMovie(movie)); //result is array of promises
    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);
    dispatch(
      addGptMovieResult({
        movieNames: gptMovies,
        movieResults: tmdbResults,
      }),
    );
  };

  const searchMovie = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS,
    );
    const json = await data.json();
    return json.results;
  };

  return (
    <div className="pt-[0.3%] flex justify-center relative z-0">
      <form
        className=" w-1/2 grid grid-cols-12 z-50"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-2 py-4 m-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSeachClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;

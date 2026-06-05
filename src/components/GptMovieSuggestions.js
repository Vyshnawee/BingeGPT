import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);
  if (!movieResults) return null;

  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-80">
      {movieNames.map((movieName, ind) => (
        <MovieList
          key={movieName}
          title={movieName}
          movies={movieResults[ind]}
        />
      ))}
    </div>
  );
};

export default GptMovieSuggestions;

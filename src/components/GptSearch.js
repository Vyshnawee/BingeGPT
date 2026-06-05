import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BACKGROUND } from "../utils/constants";

const GptSearch = () => {
  return (
    <div className="pt-[20%]">
      <div className="fixed -z-10">
        <img src={BACKGROUND} alt="bg"></img>
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};

export default GptSearch;

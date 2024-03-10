import { useEffect, useState } from "react";
import axios from "axios";
export const GetLastPage = async () => {
  try {
    const res = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
    );
    const filteredList = res.data.results.filter((item) => {
      const pokemonId = item.url.split("/").slice(-2, -1)[0];
      return pokemonId < 10000;
    });
    const count = filteredList.length;
    return count;
  } catch (e) {
    console.log(e);
  }
};

import axios from "axios";
import { useEffect, useState } from "react";
import { Pagination } from "../components/pagination";
import { Card } from "../components/card";
import { Loader } from "../components/loader";
import { Nav } from "../components/nav";
import background1 from "../assets/background1.webp";
import background2 from "../assets/background2.jpeg";
import background3 from "../assets/background3.jpg";
// import { PaginationNumbers } from "../components/paginationnumbers";

export const Dex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=9"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [selectedImage, setSelectedImage] = useState();
  // const [count, setCount] = useState();
  useEffect(() => {
    const backgroundImages = [background1, background2, background3];
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    setSelectedImage(backgroundImages[randomIndex]); //for randomly changing bg image
  }, []);

  useEffect(() => loadPokemonList(), [currentPageUrl]);
  const loadPokemonList = () => {
    setLoading(true);
    axios.get(currentPageUrl).then((res) => {
      setLoading(false);
      setNextPageUrl(res.data.next);
      setPrevPageUrl(res.data.previous);
      setPokemonList(res.data.results);
      // setCount(res.data.count);
    });
  };
  const gotoNextPage = () => {
    setCurrentPageUrl(nextPageUrl); //the next page url becomes the current page url when the button is pressed
  };
  const gotoPrevPage = () => {
    setCurrentPageUrl(prevPageUrl); //the prev page url becomes the current page url when the button is pressed
  };
  return (
    <body
      style={{
        backgroundImage: `linear-gradient(
      rgba(242, 247, 250, 0.9),
      rgba(242, 247, 250, 0.8)
    ),url(${selectedImage})`,
      }}
    >
      <Nav />
      <div className="pagination-buttons">
        <Pagination
          gotoNextPage={nextPageUrl ? gotoNextPage : null}
          gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
        />
      </div>
      <section className="dex-area">
        {loading ? (
          <Loader />
        ) : (
          pokemonList.map((x, key) => <Card pokename={x} key={key} />) //pass name and url of each pokemon to card
        )}
      </section>
      {/* <div className="pagination-numbers">
        <PaginationNumbers count={count} />
      </div> */}
    </body>
  );
};

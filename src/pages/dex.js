import axios from "axios";
import { useEffect, useState } from "react";
import { Pagination } from "../components/pagination";
import { Card } from "../components/card";
import { Loader } from "../components/loader";
import { Nav } from "../components/nav";
import background1 from "../assets/background1.jpg";
import background2 from "../assets/background2.jpg";
import background3 from "../assets/background3.jpg";
import background4 from "../assets/background4.jpg";
import background5 from "../assets/background5.jpg";
import background6 from "../assets/background6.jpg";
import { PaginationNumbers } from "../components/paginationnumbers";
import { GetLastPage } from "../components/getmaxpage";

export const Dex = () => {
  const limit = 9;
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const backgroundImages = [
      background1,
      background2,
      background3,
      background4,
      background5,
      background6,
    ];
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    setSelectedImage(backgroundImages[randomIndex]); //for randomly changing bg image
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const count = await GetLastPage();
        setCount(count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => loadPokemonList(), [currentPageUrl]);

  const maxPageNumber = Math.ceil(count / limit);

  const loadPokemonList = () => {
    setLoading(true);
    axios.get(currentPageUrl).then((res) => {
      setLoading(false);
      setNextPageUrl(res.data.next);
      setPrevPageUrl(res.data.previous);
      const filteredList = res.data.results.filter((item) => {
        const pokemonId = item.url.split("/").slice(-2, -1)[0];
        if (pokemonId < 10000) return true;
        else setNextPageUrl(null);
      });
      setPokemonList(filteredList);
      getCurrentPageNumber();
      // setCount(res.data.count);
    });
  };

  const gotoNextPage = () => {
    setCurrentPageUrl(nextPageUrl); //the next page url becomes the current page url when the button is pressed
  };
  const gotoPrevPage = () => {
    setCurrentPageUrl(prevPageUrl); //the prev page url becomes the current page url when the button is pressed
  };

  const getCurrentPageNumber = () => {
    const offsetNumber = currentPageUrl
      ? currentPageUrl.match(/offset=(\d+)/) //get an array that contains the exact match and the captured value
      : null;
    if (offsetNumber && offsetNumber[1]) {
      // Calculate the page number based on the offset and limit
      const offset = parseInt(offsetNumber[1], 10);
      setPageNumber(offset / limit + 1);
    }
  };

  const pageChangeHandler = (newPageNumber) => {
    setPageNumber(newPageNumber);
    const offset = limit * (newPageNumber - 1);
    setCurrentPageUrl(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
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
      <div className="pagination-numbers">
        <PaginationNumbers
          maxPageNumber={maxPageNumber}
          pageNumber={pageNumber}
          onPageNumberChange={pageChangeHandler}
        />
      </div>
    </body>
  );
};

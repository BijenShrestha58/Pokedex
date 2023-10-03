import axios from "axios";
import { useEffect, useState } from "react";
import { Type } from "./type";
import { typeColors } from "./typecolors";
import { Loader } from "./loader";

export const Card = ({ pokename }) => {
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(false);
  const [imageSource, setImageSource] = useState();

  const capitalizeFirstLetter = (string) => {
    return string && string.charAt(0).toUpperCase() + string.slice(1);
  };
  const handleMouseEnter = () => {
    setImageSource(
      pokemon.sprites?.versions["generation-v"]["black-white"].animated
        .front_default
    );
  };
  const handleMouseLeave = () => {
    setImageSource(
      pokemon.sprites?.versions["generation-v"]["black-white"].front_default
    );
  };
  useEffect(() => loadPokemon(), []);
  const loadPokemon = () => {
    setLoading(true);
    axios.get(pokename.url).then((res) => {
      setLoading(false);
      setPokemon(res.data);
      setImageSource(
        res.data.sprites?.versions["generation-v"]["black-white"].front_default
      );
    });
  };
  const typeColor = pokemon.types && typeColors[pokemon.types[0]?.type.name];
  const boxShadow = `${typeColor}40 -5px 5px, ${typeColor}30 -10px 10px, ${typeColor}20 -15px 15px, ${typeColor}10 -20px 20px, ${typeColor}05 -25px 25px, inset 0 0 0 .5px ${typeColor}`;
  const getPokemonId = (id) => {
    if (id < 10) return "#00" + id;
    else if (id < 100) return "#0" + id;
    else return "#" + id;
  };
  //   console.log(typeColor);

  return (
    <>
      <div
        className="card"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ boxShadow: boxShadow }}
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <img className="dex-sprite" src={imageSource} />
            <div className="pokemon-id-and-name">
              <div className="pokemon-id">{getPokemonId(pokemon.id)}</div>
              <div>{capitalizeFirstLetter(pokemon.name)}</div>
            </div>
            <div className="types">
              {pokemon.types?.map((v, key) => (
                <Type key={key} name={v.type?.name} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

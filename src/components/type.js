import { typeColors } from "../helpers/typecolors";
import { CapitalizeFirstLetter } from "../helpers/capitalizefirstletter";

export const Type = ({ name }) => {
  const backgroundColor = typeColors[name];
  return (
    <>
      <div className="type" style={{ backgroundColor: backgroundColor }}>
        {CapitalizeFirstLetter(name)}
      </div>
    </>
  );
};

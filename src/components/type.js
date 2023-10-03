import { typeColors } from "./typecolors";
export const Type = ({ name }) => {
  const capitalizeFirstLetter = (string) => {
    return string && string.charAt(0).toUpperCase() + string.slice(1);
  };
  const backgroundColor = typeColors[name];
  return (
    <>
      <div className="type" style={{ backgroundColor: backgroundColor }}>
        {capitalizeFirstLetter(name)}
      </div>
    </>
  );
};

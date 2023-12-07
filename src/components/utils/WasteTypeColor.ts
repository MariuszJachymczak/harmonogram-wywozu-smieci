import wasteTypeColors from "../../data/WasteTypeColors";

const WasteTypeColor = (wasteType: string) => {
  switch (wasteType) {
    case "Szklo":
      return wasteTypeColors.glass;
    case "Plastik":
      return wasteTypeColors.plasticWaste;
    case "Makulatura":
      return wasteTypeColors.paperWaste;
    default:
      return "black";
  }
};
export default WasteTypeColor;

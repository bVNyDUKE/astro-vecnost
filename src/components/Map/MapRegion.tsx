import { useState } from "react";

export default function MapRegion({
  svgPath,
  fillColor,
  strokeColor,
  hoverColor,
  strokeWidth,
  handleClick,
  selected,
  className,
}: {
  svgPath: string;
  fillColor: string;
  strokeColor: string;
  hoverColor: string;
  strokeWidth: string;
  handleClick: () => void;
  selected: boolean;
  className: string;
}) {
  const style = { strokeWidth };
  const [hovered, setHovered] = useState(false);
  const fill = selected ? "#F79489" : hovered ? hoverColor : fillColor;

  return (
    <path
      d={svgPath}
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      fill={fill}
      stroke={strokeColor}
      style={style}
      className={className}
    />
  );
}

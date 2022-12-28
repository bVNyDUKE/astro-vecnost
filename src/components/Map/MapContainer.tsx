import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { IOkrug, PersonsPerOkrugStat } from "../../types";
import MapRegion from "./MapRegion";
import { Okruzi } from "./MapData";

const getFillColor = (count: number): string => {
  switch (true) {
    case count > 0 && count <= 100:
      return "#f6eee0";
    case count > 100 && count <= 1000:
      return "#e4b7a0";
    case count > 1000 && count <= 3000:
      return "#c38370";
    case count > 5000:
      return "#A45C40";
    default:
      return "#f9f1f0";
  }
};

export default function MapContainer({
  selectedOkrugId,
  setSelectedOkrug,
  setShowModal,
  personsPerOkrug,
}: {
  selectedOkrugId: number | null;
  setSelectedOkrug: Dispatch<SetStateAction<IOkrug | null>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  personsPerOkrug: PersonsPerOkrugStat[] | null;
}) {
  const ref = useRef<SVGSVGElement | null>(null);
  const [width, setWidth] = useState(544);
  const [height, setHeight] = useState(792);
  const [windowHeight, setWindowHeight] = useState(10);

  const resizeSVG = useCallback(() => {
    const svgBondingBox = ref.current?.getBBox();
    if (svgBondingBox) {
      setWidth(svgBondingBox.x + svgBondingBox.width + svgBondingBox.x);
      setHeight(svgBondingBox.y + svgBondingBox.height + svgBondingBox.y);
      setWindowHeight(window.outerHeight);
    }
  }, []);

  useEffect(() => {
    resizeSVG();
    window.addEventListener("resize", resizeSVG);
    return () => window.removeEventListener("resize", resizeSVG);
  }, [resizeSVG]);

  //not sure if this is better without useMemo
  const okrugData = useMemo(() => {
    return Okruzi.map((okrug) => {
      let count = personsPerOkrug?.find((x) => okrug.id === x.okrug_id)?.count;
      return {
        id: okrug.id,
        name: okrug.name,
        count: count ?? 0,
        path: okrug.path,
        fillColor: getFillColor(count ?? 0),
      };
    });
  }, [personsPerOkrug]);

  const handleClick = (okrug: IOkrug) => {
    if (selectedOkrugId === okrug.id) {
      setShowModal((prev) => !prev);
    } else {
      setSelectedOkrug(okrug);
    }
  };

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      height={windowHeight - 250}
      ref={ref}
      className="px-2 lg:h-[100vh] lg:w-1/2"
    >
      <g>
        {okrugData.map((okrug) => (
          <MapRegion
            svgPath={okrug.path}
            handleClick={() => okrug.count > 0 && handleClick(okrug)}
            selected={selectedOkrugId === okrug.id}
            fillColor={okrug.fillColor}
            hoverColor={okrug.count > 0 ? "#fadcd9" : "#f9f1f0"}
            strokeColor={"#000"}
            key={okrug.id}
            strokeWidth={selectedOkrugId === okrug.id ? "2px" : "1px"}
            className={okrug.count > 0 ? "hover:cursor-pointer" : ""}
          />
        ))}
      </g>
    </svg>
  );
}

import {
  useEffect,
  useRef,
  useState,
  Children,
  isValidElement,
  cloneElement,
  useCallback,
} from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import type { IGraveLocations } from "types";

type PerOkrugStat = {
  id: number;
  name: string;
  mapId: string;
  count: number;
  fillColor: string;
};

interface IMapProps extends google.maps.MapOptions {
  locations: IGraveLocations[];
  stats: PerOkrugStat[];
  children?: React.ReactNode;
}

const center = { lat: 44.628924, lng: 20.643159 };
const zoom = 8;
const Map = ({ children, locations, stats }: IMapProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      const map = new window.google.maps.Map(ref.current, {
        center,
        zoom,
        mapId: "a579ad6779525e65",
      });

      const okrugLayer = map.getFeatureLayer(
        google.maps.FeatureType.ADMINISTRATIVE_AREA_LEVEL_2
      );

      okrugLayer.addListener("click", (event: any) => {
        let feature = event.features[0] as google.maps.PlaceFeature;
        if (!feature.placeId) return;
      });

      okrugLayer.style = (styleOpts) => {
        const feat = styleOpts.feature as google.maps.PlaceFeature;
        const okrugData = stats.find((x) => x.mapId === feat.placeId);

        if (!okrugData) {
          return null;
        }

        const fillColor =
          okrugData.count !== 0 ? okrugData.fillColor : undefined;
        const strokeColor = okrugData.count !== 0 ? "black" : undefined;
        const strokeOpacity = strokeColor !== undefined ? 1.0 : undefined;

        return {
          fillColor,
          strokeColor,
          strokeOpacity,
          fillOpacity: 0.5,
        };
      };

      const infoWindow = new google.maps.InfoWindow({
        content: "",
      });

      const markers = locations.map((location, i) => {
        const label = ++i;
        const marker = new google.maps.Marker({
          position: location.position,
          label: label.toString(),
        });

        const infoContent = `<div class="py-4 px-2">
          <h1 class="font-bold text-lg">${location.name}</h1>
          <a class="underline hover:cursor-pointer" href="/pretraga?ime=all&groblje=${location.id}">Pretrazi ovo groblje</h1>
            </div>`;

        marker.addListener("click", () => {
          infoWindow.setContent(infoContent);
          infoWindow.open(map, marker);
        });

        return marker;
      });

      new MarkerClusterer({ map: map, markers });
      setMap(map);
    }
  }, [ref, stats, map, locations]);

  return (
    <>
      <div ref={ref} style={{ flexGrow: "1", height: "100%" }} />
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          // set the map prop on the child component
          // @ts-ignore
          return cloneElement(child, { map });
        }
      })}
    </>
  );
};

const LoadingScreen = ({ status }: { status: Status }) => (
  <div className="flex h-full w-full items-center justify-center bg-gray-200">
    <p className="text-lg font-bold">{status}</p>
  </div>
);

type MapPageProps = {
  data: IGraveLocations[] | null;
  stats: PerOkrugStat[];
};

const MapPage: React.FC<MapPageProps> = ({ data, stats }) => {
  if (data === null) {
    return <div>Error</div>;
  }

  return (
    <div className="flex h-screen">
      <Wrapper
        apiKey={import.meta.env.PUBLIC_MAPS_KEY}
        region="RS"
        language="sr"
        version="beta"
        render={(status: Status) => <LoadingScreen status={status} />}
      >
        <Map center={center} zoom={zoom} locations={data} stats={stats} />
      </Wrapper>
    </div>
  );
};

export default MapPage;

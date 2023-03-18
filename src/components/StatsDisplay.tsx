import { useState, useEffect, useCallback } from "react";
import type { NameStat, LastnameStat, Graveyards, IOkrug } from "types";
import { NamesGraph, LastnameGraph } from "components/Graphs";
import { Cross, Spinner } from "components/Icons";
import SideDrawer from "components/SideDrawer";
import { sp } from "supabase";

export const StatPage: React.FC<{ selectedOkrug: IOkrug }> = ({
  selectedOkrug,
}) => {
  const [nameStats, setNameStats] = useState<[] | NameStat[]>([]);
  const [lastnameStats, setLastnameStats] = useState<[] | LastnameStat[]>([]);
  const [grobljeStats, setGrobljStats] = useState<[] | Graveyards[]>([]);
  const [showModal, setShowModal] = useState(false);

  const getOkrugData = useCallback(async (okrugid: number) => {
    const [
      { data: graveyardData },
      { data: nameData },
      { data: lastnameData },
    ] = await Promise.all([
      sp.rpc("graveyards_per_okrug", { okrugid }),
      sp.rpc("top_names", {
        okrugid,
      }),
      sp.rpc("top_lastnames", {
        okrugid,
      }),
    ]);

    graveyardData && setGrobljStats(graveyardData);
    nameData && setNameStats(nameData);
    lastnameData && setLastnameStats(lastnameData);
  }, []);

  useEffect(() => {
    if (selectedOkrug?.id) {
      getOkrugData(selectedOkrug.id);
      setShowModal(true);
    }
  }, [getOkrugData, selectedOkrug?.id]);

  const statsAvailable =
    grobljeStats &&
    grobljeStats.length !== 0 &&
    nameStats &&
    nameStats.length !== 0;

  return (
    <SideDrawer show={showModal}>
      <div className="absolute z-10 w-full border-y bg-white py-2">
        <Cross
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-2 h-5 w-5 border text-gray-500 shadow-sm"
        />
        <p className="text-center text-xl font-bold">Podaci okruga</p>
      </div>
      <div className="mt-14">
        <p className="mt-4 text-center text-2xl font-bold">
          {selectedOkrug?.name}
        </p>
        {statsAvailable ? (
          <div className="sm:mt-10">
            <div className="relative h-[25vh]">
              <NamesGraph nameStats={nameStats} />
            </div>
            <div className="relative mt-10 h-[25vh]">
              <LastnameGraph lastnameStats={lastnameStats} />
            </div>
            <div className="justify-center p-10">
              <p className="mb-5 text-2xl font-bold">Groblja</p>
              <ul className="box-border space-y-1">
                {grobljeStats.map((graveyard) => (
                  <a
                    key={graveyard.id}
                    href={`/pretraga?groblje=${graveyard.id}`}
                  >
                    <li className="box-border border p-8 hover:cursor-pointer hover:shadow-md">
                      <a>{graveyard.name}</a>
                    </li>
                  </a>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="mt-20 flex items-center justify-center">
            <Spinner height="h-20" width="w-20" />
          </div>
        )}
      </div>
    </SideDrawer>
  );
};

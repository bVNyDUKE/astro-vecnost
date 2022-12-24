import { useState, useMemo } from "react";
import type { Region } from "../types";

const RightArrow = () => <span>&#9654;</span>;
const DownArrow = () => <span>&#9660;</span>;

const IndexList = ({
  data,
  title,
}: {
  data: Region[] | null;
  title: string;
}) => {
  return (
    <div className="mt-5 mb-5 font-serif">
      <h2 className="ml-5 text-3xl">{title}</h2>
      <ul className="mt-2 ml-7 list-inside">
        {data &&
          data.map((entry) => <IndexEntry key={entry.id} entry={entry} />)}
      </ul>
    </div>
  );
};

const IndexEntry = ({ entry }: { entry: Region }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen((open) => !open);

  const subListData = useMemo(() => {
    if ("okrug" in entry) {
      return entry.okrug;
    }
    if ("opstina" in entry) {
      return entry.opstina;
    }
    if ("groblje" in entry) {
      return entry.groblje;
    }
    return false;
  }, [entry]);

  const subListName = useMemo(() => {
    if ("okrug" in entry) {
      return "Okruzi";
    }
    if ("opstina" in entry) {
      return "Opštine";
    }
    if ("groblje" in entry) {
      return "Groblja";
    }
    return false;
  }, [entry]);

  if (subListName) {
    return (
      <li>
        <span className="hover:cursor-pointer" onClick={handleClick}>
          {open ? <DownArrow /> : <RightArrow />}{" "}
          <span className="ml-2">{entry.name}</span>
        </span>
        {open && (
          <div>
            {subListData && (
              <IndexList data={subListData} title={subListName} />
            )}
          </div>
        )}
      </li>
    );
  }
  return <li>{entry.name}</li>;
};

export default function DataList({ data }: { data: Region[] | null }) {
  console.log(data);
  return (
    <div className="container mx-auto max-w-lg">
      <h1 className="mb-10 text-center font-serif text-4xl">Indeks Mesta</h1>
      <IndexList data={data} title="Regioni" />
    </div>
  );
}

import { Cross } from "./Icons";

interface OptionDropdownProps {
  label: string;
  options: { id: string; name: string }[];
  choice: string | null;
  setChoice: (choice: string) => void;
  clearChoice: () => void;
}

export default function OptionDropdown({
  label,
  options,
  choice,
  setChoice,
  clearChoice,
}: OptionDropdownProps) {
  if (choice !== null) {
    return (
      <div
        className="flex w-1/3 flex-grow items-center justify-between bg-white p-2 text-center text-sm capitalize hover:cursor-pointer"
        onClick={clearChoice}
      >
        <div className="flex w-full justify-center">
          <span className="truncate">
            {options.find((option) => option.id == choice)?.name}
          </span>
        </div>
        <div>
          <Cross />
        </div>
      </div>
    );
  }

  if (options.length === 0) {
    return null;
  }

  return (
    <select
      onChange={(e) => setChoice(e.target.value)}
      className="w-1/3 bg-white p-2 text-center text-sm capitalize"
    >
      <option className="text-clip text-xs" value="0" label={label} />
      {options.map((option) => (
        <option
          className="text-clip text-xs"
          key={option.id}
          value={option.id}
          label={option.name}
        />
      ))}
    </select>
  );
}

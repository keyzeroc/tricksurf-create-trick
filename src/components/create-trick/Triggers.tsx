import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Maps } from "./CreateRoute";
import { useTheme } from "../theme/theme-provider";
const noImageSrc = "./no-image.jpg";

export interface TriggerData {
  id: number;
  map_id: number;
  name: string;
  passthrough: number;
  image_url: string;
  trick_count: number;
}

type TriggersProps = {
  onSelect: (trigger: TriggerData) => void;
  map: Maps;
};

export default function Triggers({ onSelect, map }: TriggersProps) {
  const themeCtx = useTheme();
  const [searchValue, setSearchValue] = useState("");
  const [triggers, setTriggers] = useState<TriggerData[]>([]);
  const [filteredTriggers, setFilteredTriggers] = useState<TriggerData[]>([]);

  const { isPending, error } = useQuery({
    queryKey: [map],
    queryFn: () =>
      fetch(
        `https://raw.githubusercontent.com/anominy/trick-surf-data-dump/main/trick-surf/maps/${map}/triggers.min.json`
      )
        .then((res) => res.json())
        .then((data) => {
          setTriggers(data);
          return data;
        }),
  });

  useEffect(() => {
    if (!triggers) {
      return;
    }
    setFilteredTriggers(
      triggers.filter((trigger: TriggerData) =>
        trigger.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue, triggers]);

  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="font-bold uppercase">Triggers:</h2>
      <Input
        placeholder="type to search"
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        value={searchValue}
      />
      <ul className="flex flex-wrap gap-2 justify-center">
        {isPending && <p>Loading triggers...</p>}
        {error && <p>{"An error has occurred: " + error.message}</p>}
        {!isPending &&
          !error &&
          filteredTriggers.map((trigger) => (
            <li
              key={trigger.name}
              className="border border-border rounded-md max-w-[160px] shrink-0 hover:bg-primary"
            >
              <button onClick={() => onSelect(trigger)}>
                <img
                  className={`max-h-[120px] rounded-t-md ${!trigger.image_url && themeCtx.theme === "dark" ? "invert" : ""}`}
                  src={trigger.image_url || noImageSrc}
                  alt={trigger.name}
                />
                <span>{trigger.name}</span>
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

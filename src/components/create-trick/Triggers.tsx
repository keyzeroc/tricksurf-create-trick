import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

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
};

export default function Triggers({ onSelect }: TriggersProps) {
  const [searchValue, setSearchValue] = useState("");
  const [filteredTriggers, setFilteredTriggers] = useState<TriggerData[]>([]);

  const {
    isPending,
    error,
    data: triggers,
  } = useQuery({
    queryKey: ["triggers"],
    queryFn: () =>
      fetch(
        "https://raw.githubusercontent.com/anominy/trick-surf-data-dump/main/trick-surf/maps/8/triggers.min.json"
      ).then((res) => res.json()),
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
  }, [searchValue, isPending]);

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
                  className="max-h-[120px] rounded-t-md"
                  src={trigger.image_url}
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

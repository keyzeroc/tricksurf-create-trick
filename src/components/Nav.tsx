import { Maps } from "./create-trick/CreateRoute";
import Selector from "./create-trick/Selector";
import { ModeToggle } from "./theme/theme-toggle";

type NavProps = {
  onSelectMap: (selectedMap: string) => void;
};

export default function Nav({ onSelectMap }: NavProps) {
  return (
    <nav className="w-full p-4 border-b border-b-border">
      <ul className="flex items-center gap-2">
        <li className="font-bold text-xl">Select Map:</li>
        <Selector
          onSelect={onSelectMap}
          values={Object.getOwnPropertyNames(Maps).filter((prop) =>
            isNaN(parseInt(prop))
          )}
          label={"Map"}
        />
        <li className="ml-auto">
          <ModeToggle />
        </li>
      </ul>
    </nav>
  );
}

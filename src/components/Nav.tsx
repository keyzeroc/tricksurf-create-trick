import { ModeToggle } from "./theme/theme-toggle";

type Props = {};

export default function Nav({}: Props) {
  return (
    <nav className="w-full p-4 border-b border-b-border">
      <ul className="flex items-center">
        <li className="font-bold text-lg">TrickCreate</li>
        <li className="ml-auto">
          <ModeToggle />
        </li>
      </ul>
    </nav>
  );
}

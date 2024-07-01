import Selector from "./Selector";

type Props = {
  onSelectTier: (tier: string) => void;
  onSelectStartJump: (jump: string) => void;
  onSelectStartSpeed: (speed: string) => void;
};

export default function TrickSelectors({
  onSelectTier,
  onSelectStartJump,
  onSelectStartSpeed,
}: Props) {
  const data = [
    {
      label: "Tier",
      function: onSelectTier,
      values: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    },
    {
      label: "Start Jump",
      function: onSelectStartJump,
      values: ["yes", "no", "optional"],
    },
    {
      label: "Start Speed",
      function: onSelectStartSpeed,
      values: ["pre", "maxvel"],
    },
  ];
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold uppercase">Trick settings:</h2>
      <div className="flex flex-col md:flex-row gap-2">
        {data.map((select) => (
          <div key={"s:" + select.label} className="flex gap-2 items-center">
            <span>{`${select.label}:`}</span>
            <Selector
              onSelect={select.function}
              values={select.values}
              label={select.label}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

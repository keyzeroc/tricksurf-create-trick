import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TrickRouteTrigger } from "./CreateRoute";

type CurrentRouteProps = {
  route: TrickRouteTrigger[];
  onRemove: (triggerIndex: number) => void;
  onAddBhop: (triggerIndex: number, bhops: number) => void;
};

export default function CurrentRoute({
  route,
  onRemove,
  onAddBhop,
}: CurrentRouteProps) {
  return (
    <div>
      <h2 className="font-bold uppercase text-center">Current Route:</h2>
      <ul className="flex gap-2 flex-wrap">
        {route.map((trigger, index) => (
          <li
            key={"rt: " + index}
            className="border border-border rounded-md flex flex-col gap-1 text-center"
          >
            <img
              className="max-h-[120px] rounded-t-md"
              src={trigger.image_url}
              alt={trigger.name}
            />
            <span>{trigger.name}</span>

            <div className="flex items-center gap-1">
              <span>Bhops</span>
              <Input
                onChangeCapture={(e) =>
                  onAddBhop(index, Number(e.currentTarget.value))
                }
                min={0}
                className="flex-1 max-w-20"
                type="number"
              />
            </div>

            <Button
              className="hover:bg-red-800"
              onClick={() => onRemove(index)}
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

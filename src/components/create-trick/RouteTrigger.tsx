import { useSortable } from "@dnd-kit/sortable";
import { TrickRouteTrigger } from "./CreateRoute";
import { CSS } from "@dnd-kit/utilities";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Grip } from "lucide-react";
import { useTheme } from "../theme/theme-provider";
const noImageSrc = "./no-image.jpg";

type Props = {
  trigger: TrickRouteTrigger;
  onChangeJumps: (uid: string, jumps: number) => void;
  onRemove: (uid: string) => void;
};

export default function RouteTrigger({
  trigger,
  onChangeJumps,
  onRemove,
}: Props) {
  const themeCtx = useTheme();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: trigger.uid });

  // shit ain't animating at all bruh... (is it because element unmounts ?)
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li className="max-w-[160px] border border-border rounded-md flex flex-col gap-1 text-center hover:scale-105">
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className="relative"
      >
        <Grip className="absolute right-1" color="#fff" />
        <img
          className={`max-h-[120px] rounded-t-md ${!trigger.image_url && themeCtx.theme === "dark" ? "invert" : ""}`}
          src={trigger.image_url || noImageSrc}
          alt={trigger.name}
        />
      </div>
      <span>{trigger.name}</span>
      <div className="flex flex-col gap-2 mt-auto">
        <div className="flex items-center gap-2 px-1">
          <span>Jumps</span>
          <Input
            onChangeCapture={(e) =>
              onChangeJumps(trigger.uid, Number(e.currentTarget.value))
            }
            min={0}
            className="flex-1 max-w-20"
            type="number"
          />
        </div>
        <Button
          className="hover:bg-red-800 w-full"
          onClick={() => onRemove(trigger.uid)}
        >
          Remove
        </Button>
      </div>
    </li>
  );
}

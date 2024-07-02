import { useSortable } from "@dnd-kit/sortable";
import { TrickRouteTrigger } from "./CreateRoute";
import { CSS } from "@dnd-kit/utilities";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Grip } from "lucide-react";

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
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: trigger.uid });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li className="border border-border rounded-md flex flex-col gap-1 text-center hover:scale-105">
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className="relative"
      >
        <Grip className="absolute right-2" color="#fff" />
        <img
          className="max-h-[120px] rounded-t-md"
          src={trigger.image_url}
          alt={trigger.name}
        />
      </div>
      <span>{trigger.name}</span>
      <div className="flex items-center gap-1">
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
        className="hover:bg-red-800"
        onClick={() => onRemove(trigger.uid)}
      >
        Remove
      </Button>
    </li>
  );
}

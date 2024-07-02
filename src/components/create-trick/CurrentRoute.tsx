import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { TrickRouteTrigger } from "./CreateRoute";
import { SortableContext } from "@dnd-kit/sortable";
import RouteTrigger from "./RouteTrigger";

type CurrentRouteProps = {
  route: TrickRouteTrigger[];
  onRemove: (uid: string) => void;
  onChangeJumps: (uid: string, bhops: number) => void;
  onReorderRoute: (activeId: string, overId: string) => void;
};

export default function CurrentRoute({
  route,
  onRemove,
  onChangeJumps,
  onReorderRoute,
}: CurrentRouteProps) {
  
  const handleDrag = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      onReorderRoute(active.id as string, over.id as string);
    }
  };

  return (
    <div>
      <h2 className="font-bold uppercase text-center">Current Route:</h2>
      <ul className="flex gap-2 flex-wrap">
        <DndContext onDragEnd={handleDrag}>
          <SortableContext items={route}>
            {route.map((trigger) => (
              <RouteTrigger
                key={trigger.uid}
                trigger={trigger}
                onChangeJumps={onChangeJumps}
                onRemove={onRemove}
              />
            ))}
          </SortableContext>
        </DndContext>
      </ul>
    </div>
  );
}

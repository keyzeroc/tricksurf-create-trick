import { useEffect, useState } from "react";
import FinalTrickInfo from "./FinalTrickInfo";
import Triggers from "./Triggers";
import { TriggerData } from "./Triggers";
import CurrentRoute from "./CurrentRoute";
import TrickSelectors from "./TrickSelectors";
import { arrayMove } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";

export interface TrickRouteTrigger extends TriggerData {
  uid: string;
  jumps: number;
}

export default function CreateRoute() {
  const [tier, setTier] = useState("1");
  const [jump, setJump] = useState("yes");
  const [startSpeed, setStartSpeed] = useState("pre");
  const [route, setRoute] = useState<TrickRouteTrigger[]>([]);

  const [trickString, setTrickString] = useState("");

  useEffect(() => {
    updateTextArea();
  }, [tier, jump, startSpeed, route]);

  const handleTriggerAdd = (trigger: TriggerData) => {
    setRoute((prevRoute) => [
      ...prevRoute,
      { ...trigger, uid: uuidv4(), jumps: 0 },
    ]);
  };
  const handleTriggerRemove = (uid: string) => {
    setRoute((prevRoute) => prevRoute.filter((trigger) => trigger.uid !== uid));
  };

  const handleTriggerChangeJumps = (uid: string, jumps: number) => {
    setRoute((prevRoute) => {
      return prevRoute.map((trigger) => {
        if (trigger.uid === uid) {
          return { ...trigger, jumps };
        }
        return trigger;
      });
    });
  };

  const handleReorderRoute = (
    activeId: number | string,
    overId: number | string
  ) => {
    setRoute((prevRoute: TrickRouteTrigger[]) => {
      const oldIndex = prevRoute.findIndex(
        (trigger) => trigger.uid === activeId
      );
      const newIndex = prevRoute.findIndex(
        (trigger) => trigger.uid === overId
      );
      return arrayMove(prevRoute, oldIndex, newIndex);
    });
  };

  const updateTextArea = () => {
    const mappedRoute = route.map(
      (trigger, index) =>
        `${index + 1}: ${trigger.name} (G: ${trigger.passthrough}) ${trigger?.jumps && trigger?.jumps !== 0 ? "[J: x" + trigger?.jumps + "]" : ""}`
    );

    const result = `Tier: ${tier}\nStart Jump: ${jump}\nStart Speed: ${startSpeed}\n\n${mappedRoute.join("\n")}`;
    setTrickString(result);
  };

  return (
    <div className="flex flex-col gap-4">
      <TrickSelectors
        onSelectTier={setTier}
        onSelectStartJump={setJump}
        onSelectStartSpeed={setStartSpeed}
      />
      <Triggers onSelect={handleTriggerAdd} />
      <hr />
      <CurrentRoute
        route={route}
        onRemove={handleTriggerRemove}
        onChangeJumps={handleTriggerChangeJumps}
        onReorderRoute={handleReorderRoute}
      />
      <hr />
      <FinalTrickInfo value={trickString} />
    </div>
  );
}

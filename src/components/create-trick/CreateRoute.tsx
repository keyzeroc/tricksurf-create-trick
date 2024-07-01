import { useEffect, useState } from "react";
import FinalTrickInfo from "./FinalTrickInfo";
import Triggers from "./Triggers";
import { TriggerData } from "./Triggers";
import CurrentRoute from "./CurrentRoute";
import TrickSelectors from "./TrickSelectors";

export interface TrickRouteTrigger extends TriggerData {
  bhop?: number;
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
    setRoute((prevRoute) => [...prevRoute, trigger]);
  };
  const handleTriggerRemove = (triggerIndex: number) => {
    setRoute((prevRoute) => {
      let arrayBackup = [...prevRoute];
      arrayBackup.splice(triggerIndex, 1);
      return arrayBackup;
    });
  };
  const handleTriggerAddBhop = (triggerIndex: number, bhops: number) => {
    setRoute((prevRoute) => {
      return prevRoute.map((trigger, index) => {
        if (index === triggerIndex) {
          return { ...trigger, bhop: bhops };
        }
        return trigger;
      });
    });
  };

  const updateTextArea = () => {
    const mappedRoute = route.map(
      (trigger, index) =>
        `${index + 1}: ${trigger.name} (G: ${trigger.passthrough}) ${trigger?.bhop && trigger?.bhop !== 0 ? "[J: x" + trigger?.bhop + "]" : ""}`
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
        onAddBhop={handleTriggerAddBhop}
      />
      <hr />
      <FinalTrickInfo value={trickString} />
    </div>
  );
}

import { useAutosizeTextArea } from "@/hooks/useAutoSizeTextArea";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useRef } from "react";

type FinalTrickInfoProps = {
  value: string;
};

export default function FinalTrickInfo({ value }: FinalTrickInfoProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);
  const writeToClipBoard = async () => {
    await navigator.clipboard.writeText(value);
  };
  return (
    <div className="flex flex-col gap-2">
      <Textarea className="overflow-hidden" value={value} readOnly ref={textAreaRef} rows={1}/>
      <Button onClick={writeToClipBoard}>Copy to clipboard</Button>
    </div>
  );
}

import MSpinner from "./MSpinner";
import { WordDefinitionInterface, getWordDefinition } from "../api/requests";
import { useRef, useState } from "react";

export default function ({ item }: { item: string }) {
  const [definition, setDefinition] = useState<WordDefinitionInterface | null>(
    null
  );
  const thisElementRef = useRef<HTMLSpanElement>(null);

  const defineWord = async () => {
    setDefinition(await getWordDefinition(item));
  };

  const onMouseEnter = async () => {
    console.log("Mouse enter " + item);

    setTimeout(async () => {
      if (thisElementRef?.current?.matches(":hover")) {
        await defineWord();
      }
    }, 400);
  };

  const onTouchStart = async () => {
    console.log("Touch start " + item);
    await defineWord();
  };

  return (
    <span
      id={item}
      className="has-tooltip"
      onMouseEnter={onMouseEnter}
      onTouchStart={onTouchStart}
      ref={thisElementRef}
    >
      <span className="tooltip rounded shadow-lg p-1 bg-gray-100 -mt-20">
        {definition && (
          <div>
            {definition.definitions.length > 0 ? (
              <div className="font-bold text-emerald-700">Määritelmät: </div>
            ) : (
              <div>Sanalle ei löytynyt määritelmää</div>
            )}
            {definition.definitions.map((def) => (
              <div>
                <b>{def.title}</b> - {def.definition}
              </div>
            ))}
            {definition.suggestions && (
              <div>
                <div className="font-bold text-emerald-700">Ehdotukset:</div>
                <div>{definition.suggestions.join(",")}</div>
              </div>
            )}
          </div>
        )}
        {!definition && (
          <div>
            <MSpinner />
          </div>
        )}
      </span>
      <span className="hover:text-emerald-700">{item}</span>
    </span>
  );
}

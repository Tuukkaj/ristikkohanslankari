import WordDefinition from "./WordDefinition";

export default function WordDefinitionsBlock({
  definitions,
}: {
  definitions: string[];
}) {
  return definitions.map((item, index) => (
    <span className="inline-block">
      <WordDefinition item={item} />
      {definitions.length - 1 == index ? "" : <span className="mr-1">,</span>}
    </span>
  ));
}

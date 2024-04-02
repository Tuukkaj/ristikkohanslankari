export interface SearchWordResult {
  results: string[];
  filteredResults: string[];
}

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export async function getWords(
  search: string,
  length: number | null,
  regexp: string | null
): Promise<SearchWordResult> {
  let url = `${SERVER_URL}/word-search?search=${search}`;

  if (length) {
    url += `&length=${length}`;
  }

  if (regexp) {
    url += `&regexp=${regexp}`;
  }

  try {
    const res = await fetch(url);

    console.log(res);

    return res.json();
  } catch (e) {
    console.error(e);
    throw new Error("Failed to search words");
  }
}

export interface WordDefinitionInterface {
  definitions: [{ title: string; definition: string }];
  suggestions: string[];
}

export async function getWordDefinition(
  word: string
): Promise<WordDefinitionInterface> {
  const strippedWord = word.match(/(\w+)/g)?.[0];
  const url = `${SERVER_URL}/word-definition?word=${strippedWord}`;

  try {
    const res = await fetch(url);
    const json = await res.json();
    console.log(json);
    return json;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to define word");
  }
}

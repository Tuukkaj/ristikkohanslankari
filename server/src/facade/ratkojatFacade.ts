import xrayImport from "x-ray";
const xray = xrayImport();

interface RatkojatSearchOptions {
  lengthQuery: number | null;
  regexpQuery: string | null;
}

interface RatkojatSearchResult {
  results: string[];
  filteredResults: string[] | null;
}

export async function searchRatkojat(
  searchArg: string,
  options: RatkojatSearchOptions
): Promise<RatkojatSearchResult> {
  const results = await fetchResults(searchArg);
  const filteredResults = filter(results, options);
  return { results, filteredResults };
}

function filter(results: string[], options: RatkojatSearchOptions) {
  if (options.lengthQuery) {
    return lengthFilter(results, options.lengthQuery);
  }

  if (options.regexpQuery) {
    return regexpFilter(results, options.regexpQuery);
  }

  return null;
}

function lengthFilter(results: string[], lengthFilter: number) {
  return results.filter(
    (item) => replaceNonSearchableCharacters(item).length === lengthFilter
  );
}

function regexpFilter(results: string[], regexpQuery: string) {
  const regexp = new RegExp(regexpQuery, "i");
  return results.filter((item) =>
    regexp.test(replaceNonSearchableCharacters(item))
  );
}

function replaceNonSearchableCharacters(word: string) {
  return word.replace("-", "").replace("?", "");
}

async function fetchResults(search: string) {
  try {
    return await xray(`https://www.ratkojat.fi/hae?s=${search}&mode=2`, [
      ".wi",
    ]);
  } catch (e) {
    console.error("Error occured during scraping");
    console.error(e);
  }
}

import { useState, FormEvent } from "react";
import MButton from "./components/MButton";
import MTextInput from "./components/MTextInput";
import { SearchWordResult, getWords } from "./api/requests";
import MSpinner from "./components/MSpinner";
import WordDefinitionsBlock from "./components/WordDefinitionsBlock";

function App() {
  const [search, setSearch] = useState("");
  const [length, setLength] = useState<number | null>(null);
  const [regexp, setRegexp] = useState<string | null>(null);
  const [results, setResults] = useState<SearchWordResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeLength = (e: FormEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value);
    setRegexp(null);
    if (value) {
      setLength(value);
    } else {
      setLength(null);
    }
  };

  const onChangeRegexp = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setLength(null);
    if (value) {
      setRegexp(value);
    } else {
      setRegexp(null);
    }
  };

  const onChangeSearch = (e: FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const onClickSearch = async () => {
    const form = document.getElementById("search-form") as HTMLFormElement;

    if (!form.checkValidity()) {
      return;
    }

    setResults(null);
    setIsLoading(true);

    const words = await getWords(search, length, regexp);
    setResults(words);
    setIsLoading(false);
  };

  return (
    <div>
      <div className="grid-col-1 mt-10 mx-4">
        <div className="text-3xl font-bold text-gray-700">
          ristikkohanslankari{" "}
          <span className="has-tooltip">
            <span className="tooltip rounded shadow-lg p-1 bg-gray-100 mt-10 text-base text-emerald-700">
              Sivusto hankkii sanojen ratkaisut Ratkojat.fi:stä. Sanojen
              määrittely haetaan kielitoimistonsanakirja.fi:stä.
            </span>
            <svg
              className="h-8 w-8 inline"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />{" "}
              <line x1="12" y1="16" x2="12" y2="12" />{" "}
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </span>
        </div>
      </div>
      <form onSubmit={(e) => e.preventDefault()} id="search-form">
        <div className="mt-5 mx-4 shadow-xl bg-white rounded-lg p-5">
          <div className="grid grid-cols-2 mt-2 gap-3">
            <MTextInput
              required={true}
              title={"Hae Ratkojat.fi:stä"}
              value={search}
              id={"ratkojat-search"}
              placeholder={"Haku"}
              onChange={onChangeSearch}
            />
          </div>
          <div className="grid lg:grid-cols-2 xs:grid-cols-1 mt-2 gap-3">
            <MTextInput
              title={"Tulosten pituus"}
              value={length}
              id={"length-query"}
              placeholder={"Tuloksista löydettyjen sanojen pituus"}
              onChange={onChangeLength}
            />
            <MTextInput
              title={"Tulosten Regexp"}
              value={regexp}
              id={"regexp-query"}
              placeholder={"Tuloksista sanojen tulee noudattaa tätä RegExpiä"}
              onChange={onChangeRegexp}
            />
          </div>
          <div className="grid grid-col-2 mt-2">
            <MButton text={"Hae"} onClick={onClickSearch} />
          </div>
        </div>
      </form>
      {(results || isLoading) && (
        <div className="mt-5 mx-4 shadow-xl bg-white rounded-lg p-5">
          {!results && isLoading && <MSpinner />}
          {results && (
            <div>
              <>
                <p className="font-bold text-emerald-700">
                  Siivilöidyt tulokset
                </p>
                <div>
                  <WordDefinitionsBlock definitions={results.filteredResults} />
                </div>
                <hr className="my-2"></hr>
              </>
              <p className="font-bold text-emerald-700">Kaikki tulokset</p>
              <WordDefinitionsBlock definitions={results.results} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

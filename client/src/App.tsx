import { useState, FormEvent } from "react";
import MButton from "./components/MButton";
import MTextInput from "./components/MTextInput";
import { SearchWordResult, getWords } from "./api/requests";
import MSpinner from "./components/MSpinner";
import WordDefinition from "./components/WordDefinition";

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
      <div className="grid-col-1 mt-10 mx-20">
        <div className="text-3xl font-bold text-gray-700">
          ristikkohanslankari
        </div>
      </div>
      <form onSubmit={(e) => e.preventDefault()} id="search-form">
        <div className="mt-5 mx-20 shadow-xl bg-white rounded-lg p-5">
          <div className="grid grid-cols-2 mt-2 gap-6">
            <MTextInput
              required={true}
              title={"Hae Ratkojat.fi:stä"}
              value={search}
              id={"ratkojat-search"}
              placeholder={"Haku"}
              onChange={onChangeSearch}
            />
          </div>
          <div className="grid grid-cols-2 mt-2 gap-6">
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
        <div className="mt-5 mx-20 shadow-xl bg-white rounded-lg p-5">
          {!results && isLoading && <MSpinner />}
          {results && (
            <div>
              {(length || regexp) && (
                <>
                  <p className="font-bold text-emerald-700">
                    Siivilöidyt tulokset
                  </p>
                  <div>
                    {results?.filteredResults.map((item) => (
                      <span className="m-1">
                        <WordDefinition item={item} />
                      </span>
                    ))}
                  </div>
                  <hr className="my-2"></hr>
                </>
              )}
              <p className="font-bold text-emerald-700">Kaikki tulokset</p>
              {results?.results.join(", ")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

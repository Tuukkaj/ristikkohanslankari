import { newPage } from "../util/puppeteerUtil";

export async function searchWordDefinition(word: string) {
  const page = await newPage();

  await page.goto(
    `https://www.kielitoimistonsanakirja.fi/#/${word}?searchMode=all`,
    {
      waitUntil: "networkidle0",
    }
  );

  const scraped = await page.evaluate(() => {
    const wordTitles = [...document.querySelectorAll(".dict-entry-header")].map(
      (item) => item.textContent
    );

    const wordDefinitions = [
      ...document.querySelectorAll(".dict-definitions"),
    ].map((item) => item.textContent);

    const definitions = [...Array(wordTitles.length).keys()].map((index) => {
      return {
        title: wordTitles[index],
        definition: wordDefinitions[index],
      };
    });

    const suggestions = [...document.querySelectorAll(".suggestion-text")].map(
      (item) => item.textContent
    );

    return {
      definitions,
      suggestions,
    };
  });

  await page.close();

  return scraped;
}

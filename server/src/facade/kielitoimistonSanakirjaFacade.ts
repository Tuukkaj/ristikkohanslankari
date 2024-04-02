import { newPage } from "../util/puppeteerUtil";

export async function searchWordDefinition(word: string) {
  const page = await newPage();
  console.log("Defining word", word);

  await page.goto(
    `https://www.kielitoimistonsanakirja.fi/#/${encodeURIComponent(word)}?searchMode=all`,
    {
      waitUntil: "networkidle0",
    }
  );

  const scraped = await page.evaluate(() => {
    // @ts-ignore Ran inside puppeteer
    const wordTitles = [...document.querySelectorAll(".dict-entry-header")].map(
      (item) => item.textContent?.match(/\D+/) // Capture all non digits from the start
    );

    const wordDefinitions = [
      // @ts-ignore Ran inside puppeteer
      ...document.querySelectorAll(".sense-container-grid"),
    ].map((item) => item.textContent?.replaceAll("Näytä kaikki esimerkit", "")); // Remove all non defining words

    const definitions = [...Array(wordTitles.length).keys()].map((index) => {
      return {
        title: wordTitles[index],
        definition: wordDefinitions[index],
      };
    });
    // @ts-ignore Ran inside puppeteer
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

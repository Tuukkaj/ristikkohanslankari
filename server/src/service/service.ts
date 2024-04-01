import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { searchRatkojat } from "../facade/ratkojatFacade";
import { searchWordDefinition } from "../facade/kielitoimistonSanakirjaFacade";

export async function wordSearch(req: Request, res: Response) {
  const { search, length, regexp } = matchedData(req);

  if (length && regexp) {
    console.error(
      "Length and filter paramenters cannot be given at the same time"
    );

    return res
      .status(400)
      .send("Length and regexp cant be given at the same time");
  }

  const words = await searchRatkojat(String(search), {
    lengthQuery: Number(length || null),
    regexpQuery: String(regexp || null),
  });

  return res.json(words);
}

export async function wordDefinition(req: Request, res: Response) {
  const { word } = matchedData(req);

  const wordDefinitions = await searchWordDefinition(word);
  return res.json(wordDefinitions);
}

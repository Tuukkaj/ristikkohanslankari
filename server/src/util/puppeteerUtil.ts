import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
  executablePath: "/usr/bin/google-chrome",
  args: ["--no-sandbox"],
});
export async function newPage() {
  return browser.newPage();
}

process.on("SIGINT", async function () {
  console.log("Got SIGINT. Killing puppeteer browser");
  await browser.close();
});

process.on("SIGINT", async function () {
  console.log("Got SIGINT. Killing puppeteer browser");
  await browser.close();
});

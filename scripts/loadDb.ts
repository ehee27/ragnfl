import { DataAPIClient } from "@datastax/astra-db-ts";
import { PuppeteerWebBaseLoader } from "langchain/document_loaders/web/puppeteer";
import OpenAI from "openai";

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import "dotenv/config";
// determines similarity of vectors - LOOK IT UP
type SimilarityMetric = "dot_product" | "cosine" | "euclidean";

const {
  ASTRA_DB_NAMESPACE,
  ASTRA_DB_COLLECTION,
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN,
  OPENAI_API_KEY,
} = process.env;

// connect to openai
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
// the data we want to scrape
const nflData = [
  "https://en.wikipedia.org/wiki/National_Football_League",
  "https://www.espn.com/nfl/nfl-free-agency/",
  "https://www.espn.com/nfl/insider/story/_/id/44038857/2025-nfl-offseason-trade-offers-stafford-kupp-deebo-landry-godchaux-allen-jackson",
  "https://www.espn.com/nfl/story/_/id/43812803/2025-nfl-franchise-tag-tracker-kansas-city-chiefs-tag-pro-bowl-guard-trey-smith",
  "https://www.espn.com/nfl/story/_/id/43996011/32-players-move-teams-2025-offseason-trade-free-agency",
  "https://www.espn.com/nfl/insider/story/_/id/43860621/2025-nfl-free-agency-best-team-fits-ranking-top-50-players-available-offseason",
];

// connect to our DB
const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN); // constructor
// connect to the actual DB endpoint
const db = client.db(ASTRA_DB_API_ENDPOINT, { namespace: ASTRA_DB_NAMESPACE });

// split the data into chunks to create vectors
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 512,
  chunkOverlap: 100,
});

// now that we've connected and set chunk configs, we create a specific collection in our DB
const createCollection = async (
  similarityMetric: SimilarityMetric = "dot_product"
) => {
  // create the collection - set the vector params
  const res = await db.createCollection(ASTRA_DB_COLLECTION, {
    vector: { dimension: 1536, metric: similarityMetric },
  });
  console.log("This.......", res);
};

// load the data from our URLs above, chunk them up, and then create vector embeddings for our DB
const loadSampleData = async () => {
  // call the collection we just created above
  const collection = await db.collection(ASTRA_DB_COLLECTION);
  // "nflData" is referencing the collection we actually created in DataStax... "on the other side of ASTRA_DB_COLLECTION"
  // for every url we find in our collection... scrape it, split it, and create chunks array
  for await (const url of nflData) {
    const content = await scrapePage(url);
    const chunks = await splitter.splitText(content);
    // now for each chunk, create a vector embedding
    for await (const chunk of chunks) {
      const embedding = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: chunk,
        encoding_format: "float",
      });
      // drill down into the vector .data then the .embedding - which is an array of numbers
      const vector = embedding.data[0].embedding;
      // insert the vector embedding in our collection
      const res = await collection.insertOne({
        $vector: vector,
        text: chunk,
      });
      console.log("This is the response.....", res);
    }
  }
};

// function to scrape our urls
const scrapePage = async (url: string) => {
  const loader = new PuppeteerWebBaseLoader(url, {
    launchOptions: {
      headless: true,
    },
    gotoOptions: {
      waitUntil: "domcontentloaded",
    },
    evaluate: async (page, browser) => {
      const result = await page.evaluate(() => document.body.innerHTML);
      await browser.close();
      return result;
    },
  });
  // remove everything that's not plain text
  return (await loader.scrape())?.replace(/<[^>]*>?/gm, "");
};

// call our functions
createCollection().then(() => loadSampleData());

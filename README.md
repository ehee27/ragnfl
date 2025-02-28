https://www.youtube.com/watch?v=d-VKYF4Zow0&t=1816s

Setup our next project - delete the main directories and custom build our own
Create an account with Datastax
Create our API and Scripts directory
Create a script file loadDb.ts
Add the "seed" script to package.json and install ts-node to run it
Bring in all env vars. import dotenv/config and destructure our env vars

\*\*\* Do some research on SimilarityMetrics (dot_product, cosign, eucleadean)

Configure our db vars

1. client
2. db
3. splitter (characterSplitter)

Function to create the actual collection
set vector configs
set sample data

Create Scraping Function with Puppeteer

Call collection function and chain .then loadSampleData

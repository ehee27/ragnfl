// she had originally used OpenATStream and StreamingTestResponse to stream our final response however those were depricated. I've used "streamText" and had to modify the final response. I'll leave her methods commented out. Also had to update initial OpenAI instance to openaiClient as to not conflict with the module import {openai} from "@ai-sdk/openai"

// sending data from our DB and using openai to make it readable
import OpenAI from "openai";
import { streamText } from "ai";
import { DataAPIClient } from "@datastax/astra-db-ts";
import { openai } from "@ai-sdk/openai";

const {
  ASTRA_DB_NAMESPACE,
  ASTRA_DB_COLLECTION,
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN,
  OPENAI_API_KEY,
} = process.env;

// connect to openai
const openaiClient = new OpenAI({
  apiKey: OPENAI_API_KEY,
});
// connect to our DB
const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN); // constructor
// connect to the actual DB endpoint
const db = client.db(ASTRA_DB_API_ENDPOINT, { namespace: ASTRA_DB_NAMESPACE });

export async function POST(req: Request) {
  try {
    // get ALL messages from our fontend input req
    const { messages } = await req.json();
    // we want the last or most recent message
    const recentMessage = messages[messages?.length - 1].content;

    let docContext = "";

    // create the embedding from our recent message
    const embedding = await openaiClient.embeddings.create({
      model: "text-embedding-3-small",
      input: recentMessage,
      encoding_format: "float",
    });

    // now try to find the appropriate info in our DB to form a response
    try {
      // access the collection
      const collection = await db.collection(ASTRA_DB_COLLECTION);
      // find the similar data to whatever our recentMessage asked
      const matchingData = collection.find(null, {
        sort: {
          $vector: embedding.data[0].embedding,
        },
        limit: 10,
      });
      // convert data to array called documents
      const documents = await matchingData.toArray();
      // if docs exists map the .text data
      const docsMap = documents?.map((doc) => doc.text);
      // assign value to the context we'll feed to openai
      docContext = JSON.stringify(docsMap);
    } catch (error) {
      console.log(`Error Querying db... ${error}`);
      docContext = "";
    }
    // defining the "template" means we're specifying how we want the LLM to interpret and respond to the "context" (data) we're feeding it
    const template = {
      role: "system",
      content: `You are an AI assistant who knows everything about NFL free agency news. Use the below context to augment what you know about NFL free agency. The context will provide you with the most recent page data from ESPN.com. If the context doesn't include the information you need answer based on your existing knowledge and don't mention the source of your information or what the context does or doesn't include. Format responses using markdown where applicable and don't return images.
    -----------------
    START CONTEXT
    ${docContext}
    END CONTEXT
    -----------------
    QUESTION: ${recentMessage}
    -----------------`,
    };
    // feed the template into openai and create "chat.completions"
    // messages params takes our template and the messages from the frontend input
    const result = streamText({
      model: openai("gpt-4"),
      system: template.content,
      //prompt - docs naming convention
      messages,
    });
    return result.toDataStreamResponse();
  } catch (error) {
    throw error;
  }
}

// initial method using depricated tools
// import { OpenAIStream, StreamingTextResponse } from "ai";
// const response = await openaiClient.chat.completions.create({
//   model: "gpt-4",
//   stream: true,
//   messages: [template, ...messages],
// });

// const stream = OpenAIStream(response);
// return new StreamingTextResponse(stream);

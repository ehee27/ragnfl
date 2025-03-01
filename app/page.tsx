"use client";

import Image from "next/image";
import logo from "./assets/NFL-logo.png";
import { useChat } from "ai/react";
import { Message } from "ai";

import Bubble from "./components/Bubble";
import Loading from "./components/Loader";
import PromptSuggestionRpw from "./components/PromptSuggestionRow";
import { Button } from "@/components/ui/button";
import { useRef, useEffect } from "react";

const Home = () => {
  const {
    append,
    isLoading,
    messages,
    input,
    handleInputChange,
    handleSubmit,
  } = useChat();
  const noMessages = !messages || messages.length === 0;

  // scrolling functionality
  const chatParent = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const domNode = chatParent.current;
    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight;
    }
  });

  // handling the input prompt
  const handlePrompt = (promptText: string) => {
    const message: Message = {
      id: crypto.randomUUID(),
      content: promptText,
      role: "user",
    };
    append(message);
  };
  console.log("These....", messages);

  return (
    <main className="flex flex-col mx-auto max-w-5xl px-2 md:px-10 h-screen max-h-dvh bg-zinc-100">
      <header className="flex items-center p-4 w-full mx-auto">
        <Image src={logo} alt="RAG NFL logo" width="100" />
        <h1 className="text-5xl text-zinc-600 font-bold font-audiowide">
          RAG NFL
        </h1>
      </header>
      <section className="flex flex-col gap-4 justify-center items-center bg-white rounded-xl px-10 py-10 shadow shadow-zinc-400">
        <p className="text-sm text-zinc-500">
          This RAG App has been trained on NFL free agency. It understands the
          overall framework, rules and timeframes of the process. It's also up
          to date on the latest news, signings and negotiations of the 2025 free
          agent period. Feel free to interact via the prompt to learn more.{" "}
        </p>
        <form
          className="flex gap-2 w-full mx-auto items-center mt-3"
          onSubmit={handleSubmit}
        >
          <input
            className="rounded-md px-5 py-2 border-zinc-100 w-[75%] shadow-inner shadow-zinc-400"
            onChange={handleInputChange}
            value={input}
            placeholder="Let's rap about free agency..."
          />
          <Button
            className="rounded-md bg-blue-400 text-white w-[25%] h-[100%] shadow shadow-zinc-400 hover:bg-blue-600 hover:cursor-pointer transition-all duration-200"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </section>
      <section className="container px-0 pb-10 flex flex-col flex-grow gap-4 mx-auto mt-3">
        <ul
          ref={chatParent}
          className="h-1 p-4 flex-grow rounded-lg overflow-y-auto flex flex-col gap-4"
        >
          {messages.map((m, index) => (
            <>
              {m.role === "user" ? (
                <li key={index} className="flex flex-row">
                  <div className="rounded-xl p-4 bg-background shadow-md flex">
                    <p className="text-zinc-500 text-sm">{m.content}</p>
                  </div>
                </li>
              ) : (
                <li key={index} className="flex flex-row-reverse">
                  <div className="rounded-xl p-4 bg-background shadow-md flex w-3/4">
                    <p className="text-zinc-500 text-sm">
                      <span className="font-bold text-green-700">Answer: </span>
                      {m.content}
                    </p>
                  </div>
                </li>
              )}
            </>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Home;

/* <section className="container px-0 pb-10 flex flex-col flex-grow gap-4 mx-auto max-w-3xl">
        {noMessages ? (
          <></>
        ) : (
          <>
            {messages.map((message, i) => (
              <Bubble key={`message-${i}`} message={message} />
            ))}
            {isLoading && <Loading />}
          </>
        )}
      </section> */

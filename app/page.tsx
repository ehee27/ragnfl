"use client";

import Image from "next/image";
import logo from "./assets/logo.webp";
import { useChat } from "ai/react";
import { Message } from "ai";

import Bubble from "./components/Bubble";
import Loading from "./components/Loader";
import PromptSuggestionRpw from "./components/PromptSuggestionRow";

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

  const handlePrompt = (promptText) => {
    const message: Message = {
      id: crypto.randomUUID(),
      content: promptText,
      role: "user",
    };
    append(message);
  };

  return (
    <main className="flex flex-col gap-4 justify-center items-center min-h-screen bg-zinc-100">
      <section className="flex flex-col gap-2 justify-center items-center bg-white rounded-xl px-10 py-10 shadow">
        <Image src={logo} alt="RAG NFL logo" width="100" />
        {noMessages ? (
          <>
            <p className="text-sm">
              The place to find all your <span className="font-black">NFL</span>{" "}
              data!
            </p>
            <br />
            <PromptSuggestionRpw onPromptClick={handlePrompt} />
          </>
        ) : (
          <>
            {messages.map((message, i) => (
              <Bubble key={`message-${i}`} message={message} />
            ))}
            {isLoading && <Loading />}
          </>
        )}
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <input
            className="rounded-xl p-2 border-2 border-zinc-100"
            onChange={handleInputChange}
            value={input}
            placeholder="Ask me anything about the NFL..."
          />
          <input
            type="submit"
            className="rounded-xl p-2 bg-sky-600 text-white"
          />
        </form>
      </section>
    </main>
  );
};

export default Home;

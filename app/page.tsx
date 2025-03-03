"use client";

import Image from "next/image";
import logo from "./assets/NFL-logo.png";
import Chat from "./components/Chat";
import Footer from "./components/Footer";

const Home = () => {
  return (
    <main className="flex flex-col mx-auto max-w-5xl px-2 md:px-10 h-screen max-h-dvh bg-zinc-100">
      <header className="flex items-center py-2 px-1 w-full mx-auto">
        <Image src={logo} alt="RAG NFL logo" className="w-15 md:w-30" />
        <h1 className="text-3xl md:text-5xl text-zinc-600 font-bold font-audiowide">
          NFL RAG
        </h1>
      </header>
      <section className="flex flex-col gap-4 justify-center items-center bg-white rounded-t-md px-6 md:px-10 pt-8 pb-3 shadow shadow-zinc-300">
        <p className="text-sm text-zinc-500">
          This RAG App has been trained on NFL free agency and the draft
          combine. It has comprehensive knowledge of free agency rules and
          timeframes, as well as news and any moves currently being made.
          Addtionally, it can provide information on the draft combine, which
          players are living up to their hype and which players are rising on
          draft boards. Feel free to interact via the prompt to learn more.{" "}
        </p>
      </section>
      <Chat />
      <Footer />
    </main>
  );
};

export default Home;

{
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
</section>;

{
  messages.map((m, i) => (
    <>
      {m.role === "user" ? (
        <li key={m.id} className="flex flex-row">
          <div className="rounded-xl p-4 bg-background shadow-md flex">
            <p className="text-zinc-500 text-sm">{m.content}</p>
          </div>
        </li>
      ) : (
        <li key={m.id} className="flex flex-row-reverse">
          <div className="rounded-xl p-4 bg-background shadow-md flex w-3/4">
            <p className="text-zinc-500 text-sm">
              <span className="font-bold text-green-700">Answer: </span>
              {m.content}
            </p>
          </div>
        </li>
      )}
    </>
  ));
} */
}

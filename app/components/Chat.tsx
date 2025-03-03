// import { useChat } from "ai/react";
import { useChat } from "@ai-sdk/react";
import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  // scrolling functionality
  const chatParent = useRef<HTMLUListElement>(null);
  //
  useEffect(() => {
    const domNode = chatParent.current;
    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight;
    }
  });
  return (
    <>
      <section className="flex flex-col gap-4 justify-center items-center bg-white rounded-b-md px-6 md:px-10 pb-8 pt-2 shadow shadow-zinc-300">
        <form className="flex gap-2 w-full mx-auto items-center mt-3">
          <input
            className="rounded-md px-5 py-2 border-zinc-100 w-[75%] shadow-inner shadow-zinc-400 text-zinc-500"
            onChange={handleInputChange}
            value={input}
            placeholder="Let's rap about free agency..."
          />
          <Button
            className="rounded-md bg-blue-900 text-white w-[25%] h-[100%] shadow shadow-zinc-500 hover:bg-blue-700 hover:cursor-pointer transition-all duration-200"
            type="submit"
            onClick={handleSubmit}
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
          {messages?.map((message) => (
            <div key={message.id}>
              {message.role === "user" ? (
                <li className="flex flex-row">
                  <div className="flex rounded-xl p-3 bg-white shadow shadow-zinc-300">
                    <p className="text-zinc-500 text-sm">{message.content}</p>
                  </div>
                </li>
              ) : (
                <li className="flex flex-row-reverse">
                  <div className="flex rounded-xl p-3 bg-white shadow shadow-zinc-300 w-3/4">
                    <p className="text-zinc-500 text-sm">
                      <span className="font-bold text-blue-700">Answer: </span>
                      {message.content}
                    </p>
                  </div>
                </li>
              )}
            </div>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Chat;

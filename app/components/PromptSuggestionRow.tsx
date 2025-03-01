import PromptSuggestionButton from "./PromptSuggestionButton";

const PromptSuggestionRpw = ({ onPromptClick }) => {
  const prompts = [
    "What are the dates of free agency?",
    "What free agents signings are complete?",
    "Who has used the franchise tag?",
  ];
  return (
    <div className="flex flex-col gap-2 justify-center items-center p-3 g-zinc-400 text-zinc-800">
      {prompts.map((prompt, i) => (
        <PromptSuggestionButton
          key={`suggestion-${i}`}
          text={prompt}
          onClick={() => onPromptClick(prompt)}
        />
      ))}
    </div>
  );
};

export default PromptSuggestionRpw;

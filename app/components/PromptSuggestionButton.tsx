const PromptSuggestionButton = ({ onClick, text }) => {
  return (
    <button
      className="rounded-xl p-2 bg-zinc-300 text-white shadow shadow-zinc-500"
      onClick={onClick}
    >
      {text}
    </button>
  );
};
export default PromptSuggestionButton;

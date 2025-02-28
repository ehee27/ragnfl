const PromptSuggestionButton = ({ onClick, text }) => {
  return (
    <button className="rounded-xl p-2 bg-sky-600 text-white" onClick={onClick}>
      {text}
    </button>
  );
};
export default PromptSuggestionButton;

const Bubble = ({ message }) => {
  const { content, role } = message;
  return (
    <div className="flex flex-col justify-center items-center p-3 g-zinc-400 text-zinc-800">
      {content}
    </div>
  );
};

export default Bubble;

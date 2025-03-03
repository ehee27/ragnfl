const year = new Date().getFullYear();
const Footer = () => {
  return (
    <footer className="flex items-center p-5 h-10 bg-black/90 text-sm text-white md:-mx-10">
      Copyright {year} NFL RAG
    </footer>
  );
};

export default Footer;

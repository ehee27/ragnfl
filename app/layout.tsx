import "./globals.css";

export const metadata = {
  title: "NFL RAG App | Scott Lucas",
  description: "A RAG app with custom NFL Data",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;

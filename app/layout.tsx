import "./globals.css";

export const metadata = {
  title: "RAG-NFL",
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

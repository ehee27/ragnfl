import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-3">
      <div className="border-b pb-2">
        <p>Sorry the page you've requested does not exist.</p>
      </div>

      <Link className="font-bold text-blue-700 pt-2" href={"/"}>
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;

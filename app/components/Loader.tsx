import logo from "../assets/logo.webp";
import Image from "next/image";
const Loading = () => {
  return (
    <div>
      <Image className="animate-ping" src={logo} alt="logo" width={50} />
    </div>
  );
};

export default Loading;

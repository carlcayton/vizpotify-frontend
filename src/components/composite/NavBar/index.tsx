import navLogo from "assets/vector_image/nav_logo.svg";
import Image from "next/image";
import Link from "next/link";
const NavBar = () => {
  return (
    <nav className="bg-theme-green">
      <div className="flex justify-between lg:px-40 sm:px-14 py-1.5">
        {/* <Link href="http://localhost:3000"> */}
        <a className="flex items-center">
          <p className="text-2xl text-theme-black font-bold">Vizpotify</p>
        </a>
      </div>
    </nav>
  );
};

export default NavBar;

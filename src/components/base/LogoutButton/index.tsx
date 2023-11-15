import { signOut } from "next-auth/react";

const LogoutButton = (props) => {
  return (
    <button
      className="px-3 pb-1 flex text-white text-sm items-center mt-5 rounded-full ease-in-out hover:translate-y-1 transition-all group border border-white"
      // onClick={() => signOut({ callbackUrl: "/" })}
      onClick={() => signOut()}
    >Logout
      {/* <p className="font-light ml-3">Logout</p> */}
    </button>
  );
};

export default LogoutButton;

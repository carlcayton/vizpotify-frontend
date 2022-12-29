// import Button from "./Button.component";
import Image from "next/image";
import spotifyLogo from "assets/vector_image/login_logo.svg";
import Link from "next/link";
import PropTypes from "prop-types";
// import { signIn } from "next-auth/react";

const LoginButton = (props) => {
  return (
    <button
      className="p-3 flex items-center my-5 bg-theme-green  rounded-lg ease-in-out hover:translate-y-1 transition-all group"
      onClick={() =>
        props.signIn(props.provider.id, { callbackUrl: "/dashboard" })
      }
    >
      <Image
        className="group-hover:animate-[spin_.5s_ease-in-out]"
        src={spotifyLogo}
        alt=""
      ></Image>
      <p className="font-bold ml-3">Login With Spotify</p>
    </button>
  );
};

export default LoginButton;

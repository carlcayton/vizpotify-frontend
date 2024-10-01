// import Button from "./Button.component";
import Image from "next/image";
import spotifyLogo from "assets/vector_image/login_logo.svg";

import axios from 'axios';

const getSpotifyUserLogin = async () => {
  try {
    const { data: url } = await axios.get("http://localhost:8081/api/v1/auth/login");
    window.location.replace(url);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error.message);
  }
};

const LoginButton = () => {
  return (
    <button
      className="p-3 flex items-center my-5 bg-theme-green  rounded-lg ease-in-out hover:translate-y-1 transition-all group"
      onClick={() => getSpotifyUserLogin()
      }
    >
      <Image
        className="group-hover:animate-[spin_.5s_ease-in-out]"
        src={spotifyLogo}
        alt=""
      ></Image>
      <p className="font-bold ml-3 text-black">Login With Spotify</p>
    </button>
  );
};

export default LoginButton;

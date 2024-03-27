import axios from 'axios';

const signOut = async () => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, null, {
      withCredentials: true,
    });

    if (response.status === 200) {
      window.location.href = process.env.REACT_APP_APP_URL;
    } else {
      console.error('Logout failed:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};

const LogoutButton = (props) => {
  return (
    <button
      className="px-3 pb-1 flex text-white text-sm items-center mt-5 rounded-full ease-in-out hover:translate-y-1 transition-all group border border-white"
      onClick={() => signOut()}
    >Logout
    </button>
  );
};

export default LogoutButton;
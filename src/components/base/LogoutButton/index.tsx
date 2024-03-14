
const signOut = async () => {
  try {
    const response = await fetch('http://localhost:8081/api/v1/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    if (response.ok) {
      window.location.href = 'http://localhost:3000';
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

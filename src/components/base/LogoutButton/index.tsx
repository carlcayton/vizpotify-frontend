
const signOut = async () => {
  try {
    // Call the logout endpoint
    const response = await fetch('http://localhost:8080/api/v1/auth/logout', {
      method: 'POST',
      credentials: 'include', // Include credentials for cookie-based authentication
    });

    if (response.ok) {
      // Redirect to the home page
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

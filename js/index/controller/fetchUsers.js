export async function fetchUsers() {
  try {
    const jwt = Cookies.get("jwt"); // Get the JWT token from cookies

    // Check if the JWT token is present
    if (!jwt) {
      console.error("JWT token is missing");
      return [];
    }

    const response = await fetch("http://localhost:3000/profile/users", {
      headers: {
        Authorization: `Bearer ${jwt}`, // Add the JWT token to the request headers
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const users = await response.json();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

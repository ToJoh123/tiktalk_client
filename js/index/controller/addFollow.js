export async function addFollow(user) {
  try {
    const jwt = Cookies.get("jwt");

    if (!jwt) {
      console.error("JWT token is missing");
      return false;
    }

    const response = await fetch(
      `http://localhost:3000/profile/add?username=${user.username}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    return true;
  } catch (error) {
    console.error("Error following user:", error);
    return false;
  }
}

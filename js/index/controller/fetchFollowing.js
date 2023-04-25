export async function fetchFollowing() {
  try {
    const jwt = Cookies.get("jwt");

    if (!jwt) {
      console.error("JWT token is missing");
      return [];
    }

    const response = await fetch(
      "http://localhost:3000/profile/follows?type=following",
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const following = await response.json();
    console.log("Following list:", following);
    return following;
  } catch (error) {
    console.error("Error fetching following list:", error);
    return [];
  }
}

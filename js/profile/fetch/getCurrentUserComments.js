// getCurrentUserComments.js

export default function getCurrentUserComments(username = null) {
  const jwt = Cookies.get("jwt");
  const urlParams = new URLSearchParams(window.location.search);
  const profileName = urlParams.get("username");
  let endpoint = "http://localhost:3000/comments/user";
  if (profileName) {
    console.log("get the url param");
    endpoint += `?username=${profileName}`;
  }
  return fetch(endpoint, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data.data;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
}

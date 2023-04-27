// getCurrentUserComments.js

export async function getThisUserComments(username) {
  return fetch(`http://localhost:3000/comments/user?username=${username}`, {
    method: "GET",
    credentials: "include",
    headers: {
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

// getCurrentUserComments.js

export default function getCurrentUserComments() {
  return fetch("http://localhost:3000/comments/user", {
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

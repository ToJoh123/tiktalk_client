// getAllComments.js

export async function getAllComments() {
  return fetch("http://localhost:3000/comments", {
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
    });
}

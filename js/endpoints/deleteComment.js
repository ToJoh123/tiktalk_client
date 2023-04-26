export function deleteComment(commentId) {
  fetch(`http://localhost:3000/comments`, {
    method: "DELETE",
    credentials: "include",
    body: JSON.stringify({
      _id: commentId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

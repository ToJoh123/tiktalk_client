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
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      window.location.reload();
    })
    .catch((error) => {
      console.error(error);
    });
}

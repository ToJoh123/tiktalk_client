export async function deleteComment(commentId) {
  return fetch(`http://localhost:3000/comments`, {
    method: "DELETE",
    credentials: "include",
    body: JSON.stringify({
      _id: commentId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      const statusCode = response.status;
      return response.json().then((data) => {
        return { status: statusCode, data };
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

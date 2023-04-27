export async function postComment(text, commentId) {
  if (!text) {
    return;
  }
  return fetch("http://localhost:3000/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parentId: commentId,
      text: text,
    }),
    credentials: "include",
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

export function postComment(text, commentId) {
  fetch("http://localhost:3000/comments", {
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
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // getAllComments().then((data) => renderComments(data));
    })
    .catch((error) => {
      console.error(error);
    });
}

import { getAllComments } from "../controller/getAllComments.js";
import { renderComments } from "./renderComments.js";
export function postComment(e) {
  e.preventDefault();
  const commentText = document.getElementById("post-comment-text").value;
  fetch("http://localhost:3000/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: commentText,
    }),
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      getAllComments().then((data) => renderComments(data));
    })
    .catch((error) => {
      console.error(error);
    });
  //reset the form
  document.getElementById("post-comment-form").reset();
}

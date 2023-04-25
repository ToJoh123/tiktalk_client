/**
 * 1. takes in a comment and uses the comment id to find the correct form
 * 2. add event listener to the form
 * 3. prevent default
 * 4. get the text from the input field
 */
import { getAllComments } from "../controller/getAllComments.js";
import { renderComments } from "../model/renderComments.js";

export function postReplyEvent(comment) {
  const replyForm = document.getElementById(`post-reply-form-${comment._id}`);

  //for each comment we add an event listener to the form
  replyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const replyText = document.getElementById(
      `post-reply-text-${comment._id}`
    ).value;
    postReply(replyText, comment._id);
  });
}

export function postReply(text, commentId) {
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
      getAllComments().then((data) => renderComments(data));
    })
    .catch((error) => {
      console.error(error);
    });
  //reset the form
  document.getElementById(`post-reply-form-${commentId}`).reset();
}

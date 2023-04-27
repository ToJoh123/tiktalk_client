import { postComment } from "../../../endpoints/postComment.js";
import { deleteComment } from "../../../endpoints/deleteComment.js";
import { editComment } from "../events/editComment.js";
import { getAllComments } from "../../../endpoints/getAllComments.js";
import { commentSection } from "../../sections/commentSection.js";
import { likeCommentHandler } from "../../../endpoints/likeCommentHandler.js";
export function addReplyButtonListeners() {
  const replyButtons = document.querySelectorAll(".toggleReplies");
  replyButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const commentId = button.id.replace("replyBtn-", "");
      const replyContainer = document.getElementById(
        `reply-container-${commentId}`
      );
      replyContainer.classList.toggle("hidden");
    });
  });
}

export function addSubmitFormButtonListeners() {
  const submitFormButtons = document.querySelectorAll('[id^="submitFormBtn-"]');
  submitFormButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      const commentId = button.id.replace("submitFormBtn-", "");
      const replyText = document.getElementById(`post-reply-text-${commentId}`);
      // Handle the form submission logic here
      postComment(replyText.value, commentId).then((result) => {
        const { status, data } = result; // Destructure status and data from the result object

        if (status === 200) {
          getAllComments().then((data) => commentSection(data));
        }
        if (status === 400) {
          console.log("reply not posted");
        }
      });

      // Clear the form
      document.getElementById(`post-reply-form-${commentId}`).reset();
    });
  });
}

export function addLikeButtonListeners() {
  const likeBtns = [...document.querySelectorAll("button.likeBtn")];
  likeBtns.forEach((button) => {
    button.addEventListener("click", likeCommentHandler);
  });
}

export function addDeleteButtonListeners() {
  const deleteBtns = document.querySelectorAll('[id^="delete-btn-"]');
  deleteBtns.forEach((button) => {
    button.addEventListener("click", function () {
      const commentId = button.id.replace("delete-btn-", "");
      // Handle delete button logic here
      deleteComment(commentId).then(({ status, data }) => {
        if (status === 200) {
          getAllComments().then((data) => commentSection(data));
        }
        if (status === 400) {
          console.log("comment not deleted");
        }
      });
    });
  });
}

export function addEditButtonListeners() {
  const editBtns = document.querySelectorAll('[id^="edit-btn-"]');
  editBtns.forEach((button) => {
    button.addEventListener("click", function () {
      const commentId = button.id.replace("edit-btn-", "");
      // Handle edit button logic here
      editComment(commentId);
    });
  });
}

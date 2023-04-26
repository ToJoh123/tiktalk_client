import { postComment } from "../../../endpoints/postComment.js";
import { deleteComment } from "../../../endpoints/deleteComment.js";
import { editComment } from "../events/editComment.js";
import { getAllComments } from "../../../endpoints/getAllComments.js";
import { commentSection } from "../../sections/commentSection.js";
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
      postComment(replyText.value, commentId).then((data) => {
        console.log(data);
        getAllComments().then((data) => commentSection(data));
      });
      // Clear the form
      document.getElementById(`post-reply-form-${commentId}`).reset();
    });
  });
}

export function addLikeButtonListeners() {
  const likeBtns = document.querySelectorAll(".likeBtn");
  likeBtns.forEach((button) => {
    button.addEventListener("click", function () {
      const commentId = button.id.replace("like-btn-", "");
      // Handle like button logic here
      console.log("you have liked comment with id: " + commentId);
    });
  });
}

export function addDeleteButtonListeners() {
  const deleteBtns = document.querySelectorAll('[id^="delete-btn-"]');
  deleteBtns.forEach((button) => {
    button.addEventListener("click", function () {
      const commentId = button.id.replace("delete-btn-", "");
      // Handle delete button logic here
      deleteComment(commentId)
        .then((data) => {
          console.log(data);
          getAllComments().then((data) => commentSection(data));
        })
        .catch((error) => {
          console.error(error);
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
      console.log("you have clicked the edit button for comment: " + commentId);
      editComment(commentId);
    });
  });
}

/**
 * this function is responsible for rendering the comment section
 * 1. starts with a fetch to get the current user's comments
 * 2. then it filters the comments to get the root comments
 * 3. then it gets the replies for each root comment
 * 4. then it gets the number of replies for each root comment
 */
import { rootCommentSection } from "./html/rootCommentSection.js";
import { getCurrentUserComments } from "../../endpoints/getCurrentUserComments.js";
import { getAllComments } from "../../endpoints/getAllComments.js";
import { postComment } from "../../endpoints/postComment.js";
import { deleteComment } from "../../endpoints/deleteComment.js";
import { editComment } from "./events/editComment.js";
const commentContainerElement = document.querySelector("#comments-container-1");

export function commentSection(comments) {
  getCurrentUserComments().then((data) => {
    const backEndCurrentUserComments = data;
    const editAbleCommentIds = backEndCurrentUserComments.map(
      (comment) => comment._id
    );
    const rootComments = comments
      .filter((comment) => comment.parentId === null)
      .sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    const getReplies = (commentId) => {
      //get replies for a comment
      return (
        comments
          .filter((comment) => comment.parentId === commentId)
          //sort replies by date --> latest first
          .sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          })
      );
    };
    const numberOfReplies = (commentId) => {
      //get number of replies for a comment
      return comments.filter((comment) => comment.parentId === commentId)
        .length;
    };
    const numberOfComments = rootComments.length;
    let renderedComments = 0;
    let isContentRendered = false;
    if (comments.length === 0) {
      commentContainerElement.textContent = "No comments yet";
    }
    if (comments.length > 0) {
      commentContainerElement.innerHTML = "";
      rootComments.map((comment) => {
        const commentElement = rootCommentSection(
          comment,
          numberOfReplies(comment._id),
          getReplies(comment._id),
          editAbleCommentIds
        );
        commentContainerElement.appendChild(commentElement);
        renderedComments++;
      });
    }

    if (renderedComments === numberOfComments) {
      isContentRendered = true;
    }
    if (isContentRendered) {
      // Add event listeners to reply buttons
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

      // Add event listeners to submit form buttons
      const submitFormButtons = document.querySelectorAll(
        '[id^="submitFormBtn-"]'
      );
      submitFormButtons.forEach((button) => {
        button.addEventListener("click", function (event) {
          event.preventDefault();
          const commentId = button.id.replace("submitFormBtn-", "");
          const replyText = document.getElementById(
            `post-reply-text-${commentId}`
          );
          // Handle the form submission logic here
          postComment(replyText.value, commentId);
          // Clear the form
          document.getElementById(`post-reply-form-${commentId}`).reset();
        });
      });

      // Add event listeners to like buttons
      const likeBtns = document.querySelectorAll(".likeBtn");
      likeBtns.forEach((button) => {
        button.addEventListener("click", function () {
          const commentid = button.id.replace("like-btn-", "");

          //handle like button logic here
          console.log("you have liked comment with id: " + commentid);
        });
      });

      //add event listeners to delete buttons
      const deleteBtns = document.querySelectorAll('[id^="delete-btn-"]');
      deleteBtns.forEach((button) => {
        button.addEventListener("click", function () {
          const commentId = button.id.replace("delete-btn-", "");
          //handle delete button logic here
          deleteComment(commentId)
            .then((data) => {
              console.log(data);
              window.location.reload();
            })
            .catch((error) => {
              console.error(error);
            });
        });
      });

      //add event listeners to edit buttons
      const editBtns = document.querySelectorAll('[id^="edit-btn-"]');
      editBtns.forEach((button) => {
        button.addEventListener("click", function () {
          const commentId = button.id.replace("edit-btn-", "");
          //handle edit button logic here
          console.log(
            "you have clicked the edit button for comment: " + commentId
          );
          editComment(commentId);
        });
      });
    }
  });
}

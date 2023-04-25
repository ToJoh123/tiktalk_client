// renderComments.js
import { renderRootComments } from "../view/renderRootComments.js";
import { renderReplies } from "../view/renderReplies.js";
import { toggleHiddenReplies } from "../view/toggleHiddenReplies.js";
import { postReplyEvent } from "../view/postReplyEvent.js";

export function renderComments(comments) {
  //clear the comments container
  document.getElementById("comments-container-1").innerHTML = "";
  //check if comments are empty
  if (comments.length === 0) {
    document.getElementById("comments-container-1").innerHTML =
      "No comments to show";
    return;
  }

  const rootComments = comments.filter((comment) => comment.parentId === null);
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
    return comments.filter((comment) => comment.parentId === commentId).length;
  };

  //render the comments,create event listeners for the comment button and render replies
  rootComments.forEach((comment) => {
    renderRootComments(comment, numberOfReplies(comment._id));

    //add event listener to the comment button
    requestAnimationFrame(() => {
      toggleHiddenReplies(comment);
    });
    //add delay
    setTimeout(() => {
      postReplyEvent(comment);
    }, 2000);

    //render replies
    const replies = getReplies(comment._id);
    replies.forEach((reply) => {
      renderReplies(reply);
    });
  });
}

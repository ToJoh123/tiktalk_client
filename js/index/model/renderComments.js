// renderComments.js
import { renderRootComments } from "../view/renderRootComments.js";
import { renderReplies } from "../view/renderReplies.js";

export function renderComments(comments) {
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

  //render the comments
  rootComments.forEach((comment) => {
    renderRootComments(comment, numberOfReplies(comment._id));

    //add event listener to the comment button
    const commentButton = document.getElementById(`commentBtn-${comment._id}`);
    commentButton.addEventListener("click", () => {
      const replyContainer = document.getElementById(
        `reply-container-${comment._id}`
      );
      replyContainer.classList.toggle("hidden");
    });
    //render replies
    const replies = getReplies(comment._id);
    replies.forEach((reply) => {
      renderReplies(reply);
    });
  });
}

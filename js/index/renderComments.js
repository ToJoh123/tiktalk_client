// renderComments.js
import { renderRootComments } from "./renderRootComments.js";
import { renderReplies } from "./renderReplies.js";

export function renderComments(comments) {
  console.log(comments);
  //check if comments are empty
  if (comments.length === 0) {
    document.getElementById("comments-container-1").innerHTML =
      "No comments to show";
    return;
  }

  const rootComments = comments.filter((comment) => comment.parentId === null);
  const getReplies = (commentId) => {
    //get replies for a comment
    return comments
      .filter((comment) => comment.parentId === commentId)
      .sort((a, b) => a.createdAt - b.createdAt);
  };

  //render the comments
  rootComments.forEach((comment) => {
    renderRootComments(comment);

    //render replies
    const commentId = comment._id;
    getReplies(commentId).forEach((reply) => {
      renderReplies(reply);
    });
  });
}

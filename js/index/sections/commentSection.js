import { rootCommentSection } from "./html/rootCommentSection.js";
const commentContainerElement = document.querySelector("#comments-container-1");

export function commentSection(comments) {
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

  if (comments.length === 0) {
    commentContainerElement.textContent = "No comments yet";
  }
  if (comments.length > 0) {
    commentContainerElement.innerHTML = "";
    rootComments.map((comment) => {
      const commentElement = rootCommentSection(
        comment,
        numberOfReplies(comment._id),
        getReplies(comment._id)
      );

      commentContainerElement.appendChild(commentElement);
    });
  }
}

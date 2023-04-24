/**
 * 1. find the correct element
 * 2. add event listener to the element
 * 3. toggle the hidden class
 */
export function toggleHiddenReplies(comment) {
  const commentButton = document.querySelector(`#replyBtn-${comment._id}`);
  commentButton.addEventListener("click", () => {
    const replyContainer = document.getElementById(
      `reply-container-${comment._id}`
    );
    replyContainer.classList.toggle("hidden");
  });
}

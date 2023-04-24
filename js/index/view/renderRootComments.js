export function renderRootComments(comment, numberOfReplies) {
  const rootElement = document.getElementById("comments-container-1");
  const rootCommentHtmlContent = `
    <div class="comment" id="comment-id-${comment._id}">
      <div class="commentProfile">
        <img src="https://picsum.photos/40/40" alt="pfp" />
        <h3>${comment.username}</h3>
      </div>
      <p>${comment.text}</p>
      <div class="buttons">
        <button class="fa-regular fa-heart"></button>
        <button class="fa-regular fa-comment" id="replyBtn-${comment._id}">${numberOfReplies}</button>
      </div>
      <input
        type="text"
        name="comment"
        id="comment"
        placeholder="Write a comment..."
      />
      <div class="reply-container hidden" id="reply-container-${comment._id}"/>
    </div>
  `;
  //append the comment to the comments container
  rootElement.innerHTML += rootCommentHtmlContent;
}

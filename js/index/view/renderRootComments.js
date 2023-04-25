export function renderRootComments(comment, numberOfReplies) {
  const rootElement = document.getElementById("comments-container-1");
  const rootCommentHtmlContent = `
    <div class="comment" id="comment-id-${comment._id}">
      <div class="commentProfile">
        <img src="https://picsum.photos/40/40" alt="pfp" />
        <h3>${comment.username}</h3>
      </div>
      <p id="comment-text-${comment._id}">${comment.text}</p>
      <div class="buttons" id="buttons-${comment._id}">
        <button class="fa-regular fa-heart"></button>
        <button class="fa-regular fa-comment" id="replyBtn-${comment._id}">${numberOfReplies}</button>
      </div>
      <form id="post-reply-form-${comment._id}">
        <input
          type="text"
          name="reply"
          id="post-reply-text-${comment._id}"
          placeholder="Write a comment..."
        />
        <button type="submit" id="submitFormBtn-${comment._id}">Reply</button>
      </form>
      <div class="reply-container hidden" id="reply-container-${comment._id}"/>
    </div>
  `;
  //append the comment to the comments container
  rootElement.innerHTML += rootCommentHtmlContent;
}

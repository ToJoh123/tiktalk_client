export function renderReplies(reply) {
  // Get the reply container element
  const replyElement = document.getElementById(
    `reply-container-${reply.parentId}`
  );
  if (!replyElement) {
    console.error(
      "@renderReplies(): Reply container not found for id: ",
      reply._id
    );
    return;
  }
  const replyHtmlContent = `
    <div class="comment" id="comment-id-${reply._id}">
      <div class="commentProfile">
        <img src="https://picsum.photos/40/40" alt="pfp" />
        <h3>${reply.username}</h3>
      </div>
      <p id="comment-text-${reply._id}">${reply.text}</p>
      <div class="buttons" id="buttons-${reply._id}">
        <button class="fa-regular fa-heart"></button>
        <button class="fa-regular fa-comment"></button>
      </div>
    </div>
  `;
  replyElement.innerHTML += replyHtmlContent;
}

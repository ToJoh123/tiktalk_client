export function replySection(reply) {
  const replyElement = `
    <div class="comment" id="comment-id-${reply._id}">
      <div class="commentProfile">
        <img src="https://picsum.photos/40/40" alt="pfp" />
        <h3>${reply.username}</h3>
      </div>
      <p id="comment-text-${reply._id}">${reply.text}</p>
      <div class="buttons" id="buttons-${reply._id}">
        <button class="fa-regular fa-heart"></button>
      </div>
    </div>
  `;
  return replyElement;
}

/**
 * This code is responsible for creating the HTML element for a reply.
 * @param {*} reply
 * @param {*} editAbleCommentIds
 * @returns HTML element
 */
export function replySection(reply, editAbleCommentIds) {
  const replyElement = `
    <div class="comment" id="comment-id-${reply._id}">
      <div class="commentProfile">
        <img src="https://picsum.photos/40/40" alt="pfp" />
        <h3>${reply.username}</h3>
      </div>
      <p id="comment-text-${reply._id}">${reply.text}</p>
      <div class="buttons" id="buttons-${reply._id}">
        <button class="fa-regular fa-heart"></button>
        ${
          editAbleCommentIds.includes(reply._id)
            ? `
        <button class="fa-regular fa-heart" id="edit-btn-${reply._id}">edit</button>
        <button class="fa-regular fa-heart" id="delete-btn-${reply._id}">delete</button>
        `
            : ""
        } 
      </div>
    </div>
  `;
  return replyElement;
}

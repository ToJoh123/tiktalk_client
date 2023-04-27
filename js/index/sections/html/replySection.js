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
        ${
          editAbleCommentIds.includes(reply._id)
            ? `
            <button class="fa-regular fa-heart likeBtn" id="like-btn-${reply._id}" data-comment-id="${reply._id}"></button>
            <button class="fa-regular fa-pen-to-square" id="edit-btn-${reply._id}"></button>
            <button class="fa-solid fa-trash" id="delete-btn-${reply._id}"></button>
        `
            : `
        <button class="fa-regular fa-heart likeBtn" id="like-btn-${reply._id}" data-comment-id="${reply._id}"/>
        `
        } 
      </div>
    </div>
  `;
  return replyElement;
}

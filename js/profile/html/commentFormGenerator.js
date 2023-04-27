export function commentFormGenerator(comment) {
  return `
      <div class="comment" id="comment-id-${comment._id}">
        <p id="status-${comment._id}"></p>
        <form class="editForm" id="edit-form-${comment._id}">
          <input type="text" value="${comment.text}" id="edit-comment-${comment._id}" />
          <br>
          <button type="submit" class="fa-regular fa-save" id="edit-btn-${comment._id}"></button>
        </form>
        <button class="fa-solid fa-trash deleteBtn" id="delete-btn-${comment._id}"></button>
        <p>posted: ${comment.createdAt}</p>
      </div>
    `;
}

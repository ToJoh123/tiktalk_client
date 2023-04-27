export function commentViewGenerator(comment) {
  return `
        <div class="comment" id="comment-id-${comment._id}">
          <p>${comment.text}</p>
          <p>posted: ${comment.createdAt}</p>
        </div>
      `;
}

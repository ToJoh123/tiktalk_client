export function editComment(comment) {
  const paragrafElement = document.getElementById(
    `comment-text-${comment._id}`
  );
  //turns this element into a textarea
  paragrafElement.outerHTML = `<textarea id="comment-text-${comment._id}" class="comment-text">${comment.text}</textarea>`;
  //adds a button to save the comment
  const buttonElement = document.getElementById(
    `comment-button-${comment._id}`
  );
  buttonElement.outerHTML = `<button id="save-edit-button-${comment._id}" class="comment-button">Save</button>`;
  //adds a button to cancel the edit
  const cancelButtonElement = document.getElementById(
    `cancel-edit-button-${comment._id}`
  );
  cancelButtonElement.outerHTML = `<button id="cancel-edit-button-${comment._id}" class="comment-button">Cancel</button>`;
  //adds event listener to the save button
  const saveButtonElement = document.getElementById(
    `save-edit-button-${comment._id}`
  );
  saveButtonElement.addEventListener("click", () => {
    saveComment(comment);
  });
  //adds event listener to the cancel button
  const cancelEditButtonElement = document.getElementById(
    `cancel-edit-button-${comment._id}`
  );
  cancelEditButtonElement.addEventListener("click", () => {
    cancelEditComment(comment);
  });

  // console.log("edit comment", comment);
}

function saveComment(comment) {
  const paragrafElement = document.getElementById(
    `comment-text-${comment._id}`
  );
  const text = paragrafElement.value;
  const data = {
    text: text,
  };
  fetch(`/api/comments/${comment._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(() => {
    location.reload();
  });
}

export function editComment(comment) {
  convertToTextArea(comment);
  addSaveButton(comment);
}
function convertToTextArea(comment) {
  const textToEdit = document.getElementById(`comment-text-${comment._id}`);
  textToEdit.outerHTML = `<textarea id="comment-text-${comment._id}" class="comment-text">${comment.text}</textarea>`;
}
function addSaveButton(comment) {
  //check if there is already a save button
  const saveButton = document.getElementById(`save-edit-button-${comment._id}`);
  if (!saveButton) {
    const buttonsContainer = document.getElementById(`buttons-${comment._id}`);
    if (buttonsContainer) {
      const buttonHTML = `<button id="save-edit-button-${comment._id}" class="comment-button">Save</button>
                          <button id="cancel-edit-button-${comment._id}" class="comment-button">Cancel</button>`;
      buttonsContainer.insertAdjacentHTML("afterend", buttonHTML);
      const newSaveButton = document.getElementById(
        `save-edit-button-${comment._id}`
      );
      newSaveButton.addEventListener("click", () => saveComment(comment));
      const cancelEditButton = document.getElementById(
        `cancel-edit-button-${comment._id}`
      );
      cancelEditButton.addEventListener("click", () => cancelEdit(comment));
    }
  }
}
function cancelEdit(comment) {
  //reset document to original state
  const textToEdit = document.getElementById(`comment-text-${comment._id}`);
  textToEdit.outerHTML = `<p id="comment-text-${comment._id}" class="comment-text">${comment.text}</p>`;
  const saveButton = document.getElementById(`save-edit-button-${comment._id}`);
  saveButton.remove();
  const cancelButton = document.getElementById(
    `cancel-edit-button-${comment._id}`
  );
  cancelButton.remove();
}
function saveComment(comment) {
  const value = document.getElementById(`comment-text-${comment._id}`).value;
  //this code copies the comment and adds the new text to it
  const newComment = { ...comment, text: value };
  console.log("this is the comment", newComment);
  // const paragrafElement = document.getElementById(
  //   `comment-text-${comment._id}`
  // );
  // const text = paragrafElement.value;
  // const data = {
  //   text: text,
  // };
  // fetch(`/api/comments/${comment._id}`, {
  //   method: "PUT",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(data),
  // }).then(() => {
  //   location.reload();
  // });
}

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

async function saveComment(comment) {
  const value = document.getElementById(`comment-text-${comment._id}`).value;
  const res = await patchCommentModule(comment._id, value);

  // Check the status code and reload the page if it's 200
  if (res && res.status === 200) {
    location.reload();
  } else {
    console.error("Error occurred while saving the comment");
  }
}

export async function patchCommentModule(commentId, text) {
  try {
    const response = await fetch(`http://localhost:3000/comments`, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify({
        _id: commentId,
        text: text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.text();

    // Return an object containing the status code and data
    return {
      status: response.status,
      data,
    };
  } catch (error) {
    console.error(error);
  }
}

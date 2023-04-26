import { patchCommentModule } from "../../../endpoints/patchCommentModule.js";
export function editComment(commentId) {
  convertToTextArea(commentId);
  addSaveButton(commentId);
}

function convertToTextArea(commentId) {
  const textToEdit = document.getElementById(`comment-text-${commentId}`);
  //change the text to a text area
  textToEdit.outerHTML = `<textarea id="comment-text-${commentId}">${textToEdit.outerText}</textarea>`;
}
function addSaveButton(commentId) {
  //check if there is already a save button
  const saveButton = document.getElementById(`save-edit-button-${commentId}`);

  if (!saveButton) {
    const buttonsContainer = document.getElementById(`buttons-${commentId}`);
    if (buttonsContainer) {
      const buttonHTML = `  <button id="save-edit-button-${commentId}" >Save</button>
                            <button id="cancel-edit-button-${commentId}">Cancel</button>`;
      buttonsContainer.insertAdjacentHTML("afterend", buttonHTML);
      const newSaveButton = document.getElementById(
        `save-edit-button-${commentId}`
      );
      newSaveButton.addEventListener("click", () => savecommentId(commentId));
      const cancelEditButton = document.getElementById(
        `cancel-edit-button-${commentId}`
      );
      cancelEditButton.addEventListener("click", () => cancelEdit(commentId));
    }
  }
}
function cancelEdit(commentId) {
  //reset document to original state
  const textToEdit = document.getElementById(`comment-text-${commentId}`);
  textToEdit.outerHTML = `<p id="comment-text-${commentId}">${textToEdit.value}</p>`;
  const saveButton = document.getElementById(`save-edit-button-${commentId}`);
  saveButton.remove();
  const cancelButton = document.getElementById(
    `cancel-edit-button-${commentId}`
  );
  cancelButton.remove();
}

async function savecommentId(commentId) {
  const value = document.getElementById(`comment-text-${commentId}`).value;
  const res = await patchCommentModule(commentId, value);

  // Check the status code and reload the page if it's 200
  if (res && res.status === 200) {
    location.reload();
  } else {
    console.error("Error occurred while saving the commentId");
  }
}

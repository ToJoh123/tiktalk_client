import { deleteComment } from "../controller/deleteComment.js";
import { editComment } from "../controller/editComment.js";

export function renderButtons(data) {
  data.forEach((comment) => {
    const deleteBtnHtml = generateDeleteButtonHtml(comment._id);
    const editBtnHtml = generateEditButtonHtml(comment._id);

    const buttonsElement = document.getElementById(`buttons-${comment._id}`);

    if (buttonsElement) {
      addButtonsToContainer(buttonsElement, deleteBtnHtml, editBtnHtml);
      attachEventListeners(comment);
    } else {
      handleElementNotFound(comment);
    }
  });
}

function generateDeleteButtonHtml(commentId) {
  return `
    <button class="fa-regular fa-heart" id="delete-btn-${commentId}">delete</button>
  `;
}

function generateEditButtonHtml(commentId) {
  return `
    <button class="fa-regular fa-heart" id="edit-btn-${commentId}">edit</button>
  `;
}

function addButtonsToContainer(container, deleteButtonHtml, editButtonHtml) {
  container.insertAdjacentHTML("beforeend", deleteButtonHtml);
  container.insertAdjacentHTML("beforeend", editButtonHtml);
}

function attachEventListeners(comment) {
  addDeleteButtonEvent(comment._id);
  addEditButtonEvent(comment);
}

function addDeleteButtonEvent(commentId) {
  document
    .getElementById(`delete-btn-${commentId}`)
    .addEventListener("click", () => {
      deleteComment(commentId);
    });
}

function addEditButtonEvent(comment) {
  document
    .getElementById(`edit-btn-${comment._id}`)
    .addEventListener("click", () => {
      editComment(comment);
    });
}

function handleElementNotFound(comment) {
  console.warn(`Element with ID 'buttons-${comment._id}' not found`);
}

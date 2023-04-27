import { patchCommentModule } from "../../endpoints/patchCommentModule.js";
import { deleteComment } from "../../endpoints/deleteComment.js";

//this function finds all forms on the page and adds an event listener to each one
export function handleSubmitFormButtons() {
  const forms = [...document.querySelectorAll("form.editForm")];
  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const commentId = event.target.id.split("-")[2];
      const commentText = document.getElementById(
        `edit-comment-${commentId}`
      ).value;

      patchCommentModule(commentId, commentText)
        .then((data) => {
          if (data.status === 200) {
            console.log("comment updated");
            window.location.reload();
          }
          if (data.status === 400) {
            console.log("comment not updated");
          }
        })
        .catch((error) => console.log(error));

      // editComment(commentId, commentText);
    });
  });
}

export function handleDeleteButtons() {
  const deleteButtons = [...document.querySelectorAll("button.deleteBtn")];
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const commentId = button.id.replace("delete-btn-", "");
      deleteComment(commentId).then(({ status, data }) => {
        if (status === 200) {
          window.location.reload();
        }
        if (status === 400) {
          console.log("comment not deleted");
        }
      });
    });
  });
}

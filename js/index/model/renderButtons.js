export function deleteComment(commentId) {
  console.log("delete comment", commentId);
  // fetch(`http://localhost:3000/comments`, {
  //   method: "DELETE",
  //   credentials: "include",
  //   body: JSON.stringify({
  //     commentId: commentId,
  //   }),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // })
  //   .then((response) => response.text())
  //   .then((data) => {
  //     console.log(data);
  //     window.location.reload();
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
}

export function editComment(comment) {
  console.log("edit comment", comment);
}
export function renderButtons(data) {
  // console.log(data);
  data.forEach((comment) => {
    // console.log("render buttons", comment);
    const deleteBtnHtml = `
      <button class="fa-regular fa-heart" id="delete-btn-${comment._id}">delete</button>
    `;
    const editBtnHtml = `
      <button class="fa-regular fa-heart" id="edit-btn-${comment._id}">edit</button>
    `;

    const buttonsElement = document.getElementById(`buttons-${comment._id}`);

    // check if buttonsElement exists before continuing
    if (buttonsElement) {
      // insert delete button HTML before the end of the buttons container
      buttonsElement.insertAdjacentHTML("beforeend", deleteBtnHtml);

      // insert edit button HTML before the end of the buttons container
      buttonsElement.insertAdjacentHTML("beforeend", editBtnHtml);

      // add event listener to the delete button
      document
        .getElementById(`delete-btn-${comment._id}`)
        .addEventListener("click", (e) => {
          deleteComment(comment._id);
        });

      // add event listener to the edit button
      document
        .getElementById(`edit-btn-${comment._id}`)
        .addEventListener("click", (e) => {
          editComment(comment);
        });
    } else {
      console.warn(`Element with ID 'buttons-${comment._id}' not found`);
    }
  });
}

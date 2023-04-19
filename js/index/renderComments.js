// renderComments.js

export function renderComments(comments) {
  //check if comments are empty
  if (comments.length === 0) {
    document.getElementById("comments-container-1").innerHTML =
      "No comments to show";
    return;
  }
  const element = document.getElementById("comments-container-1");
  console.log(comments);
  const commentHtml = `
      <div class="comment">
        <div class="commentProfile">
          <img src="https://picsum.photos/40/40" alt="pfp" />
          <h3>TEST FOR YOU</h3>
        </div>
        <p>TEST FOR YOU</p>
        <div class="buttons">
          <button class="fa-regular fa-heart"></button>
          <button class="fa-regular fa-comment"></button>
        </div>
        <input
          type="text"
          name="comment"
          id="comment"
          placeholder="Write a comment..."
        />
      </div>
    `;
  //this should clear the comments container before adding new comments
  element.innerHTML = "";
  comments.forEach((comment) => {
    element.innerHTML += commentHtml;
  });
}

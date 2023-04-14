import { commentsData } from "../data/data.js";

function openTab(evt, tabName) {
  // Gets all the elements with the class "tabcontent" and hides them
  var tabcontent = document.getElementsByClassName("tabcontent");
  for (var i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Gets all the elements with the class "tablinks" and removes the class "active"
  var tablinks = document.getElementsByClassName("tablinks");
  for (var i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Shows the chosen tabs content and adds the class "active" on the button
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

//render Root comments

//get the comments from the data
//TODO: replace with get request
//filter the comments to get the comments with parentId null
const rootComments = commentsData.filter(
  (comment) => comment.parentId === null
);
//get the replies with the parent id
const getReplies = (commentId) =>
  commentsData.filter((comment) => comment.parentId === commentId);

//get the comments container
const commentsContainer = document.querySelector("#comments-container");
// the html  for each comment
function renderComments(comment) {
  const commentHtml = `
  <div class="comment" id="${comment.id}">
    <div class="commentProfile">
      <img src="https://picsum.photos/40/40" alt="pfp" />
      <h3>${comment.name}</h3>
    </div>
    <p>${comment.text}</p>
    <div class="buttons">
      <button class="fa-regular fa-heart"></button>
      <button class="fa-regular fa-comment" id="replyBtn-${comment.id}"></button>
    </div>
    <input
      type="text"
      name="comment"
      id="commentBody-${comment.id}"
      placeholder="Write a comment..."
    />
</div>
    `;

  //append the comment to the comments container
  commentsContainer.innerHTML += commentHtml;

  //call the function to add event listeners to buttons with a delay
  setTimeout(() => {
    addButtonEventListeners(comment.id);
  }, 0);
}

function addButtonEventListeners(commentId) {
  //create function for reply button
  document
    .querySelector(`#replyBtn-${commentId}`)
    .addEventListener("click", (e) => {
      console.log(
        "this text is submitted by reply button with id:" + commentId
      );
      console.log(getReplies(commentId));
    });
  // TODO: add other buttons below here
}

//render the comments
rootComments.forEach((comment) => {
  renderComments(comment);
});

//end of render root comments

//render replies to comments on click

console.log(commentsData); //TODO: remove this

document.querySelector(`#static-commentBtn`).addEventListener("click", (e) => {
  console.log("this is static button");
});

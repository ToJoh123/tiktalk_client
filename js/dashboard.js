import { commentsData } from "../data/data.js"; //TODO:replace with get request

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
  commentsData.filter((comment) => comment.parentId === commentId); //TODO: we can add sorting so last replies are at the bottom

//get the comments container
const commentsContainer = document.querySelector("#comments-container");
// the html  for each comment
function renderComments(comment) {
  const commentHtml = `
  <div class="comment" id="comment-${comment.id}">
    <div class="commentProfile">
      <img src="https://picsum.photos/40/40" alt="pfp" />
      <h3>${comment.name}</h3>

    </div>
    <p>${comment.text}</p>
    
    <div class="buttons">
      <button class="fa-regular fa-heart"/>
      <button class="fa-regular fa-comment" id="replyBtn-${comment.id}">
      ${getReplies(comment.id).length}
      </button>
    </div>
      <input
        type="text"
        name="comment"
        id="commentBody-${comment.id}"
        placeholder="Write a comment..."
      /> 
      <div class="replyContainer hidden" id="replyContainer-${comment.id}"/>  
</div>
    `;

  //append the comment to the comments container
  commentsContainer.innerHTML += commentHtml;

  //delays the execution of the function to wait for the element to be rendered
  setTimeout(() => {
    toggleRepliesBtn(comment.id);
  }, 0);
}

function renderReply(comment) {
  const replyContainer = document.querySelector(
    `#replyContainer-${comment.parentId}`
  );
  const replyHtml = `
  <div class="comment" id="reply-${comment.id}">
    <div class="commentProfile">
      <img src="https://picsum.photos/40/40" alt="pfp" />
      <h3>${comment.name}</h3>
    </div>
    <p>${comment.text}</p>
    <div class="buttons">
      <button class="fa-regular fa-heart"></button>
    </div>
</div>
    `;
  replyContainer.innerHTML += replyHtml;
}

function toggleRepliesBtn(commentId) {
  document
    .querySelector(`#replyBtn-${commentId}`)
    .addEventListener("click", (e) => {
      document
        .querySelector(`#replyContainer-${commentId}`)
        .classList.toggle("hidden");
    });
}

//render the comments
rootComments.forEach((comment) => {
  renderComments(comment);

  //render replies
  const commentId = comment.id;
  getReplies(commentId).forEach((reply) => {
    renderReply(reply);
  });
});

//end of render root comments

console.log(commentsData); //TODO: remove this

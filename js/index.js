import { commentsData } from "../data/data.js";

// publish comment button

//find submitBtn
const submitBtn = document.querySelector("#submit-btn");

//add event to submitBtn
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  //get the value of the id of the comment
  const commentId = document.querySelector("#comment-body").value;

  //TODO:replace with post request
  console.log("this text is submitted by publish button:", commentId);

  // reset the value of comment body
  document.querySelector("#comment-body").value = "";
});

//end of publish comment button

//get the comments from the data
//TODO: replace with get request
//filter the comments to get the comments with parentId null
const rootComments = commentsData.filter(
  (comment) => comment.parentId === null
);
//get the replies with the parent id
const getReplies = (commentId) =>
  comments.filter((comment) => comment.parentId === commentId);

//get the comments container
const commentsContainer = document.querySelector("#comments-container");
// the html  for each comment
function renderComments(comment) {
  const commentHtml = `
    <div class="comments" id="commentId-${comment.id}">
        <p>${comment.text}</p>
    
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

  //append the comment to the comments container
  commentsContainer.innerHTML += commentHtml;
}

//render the comments
rootComments.forEach((comment) => {
  renderComments(comment);
});

console.log(commentsData);

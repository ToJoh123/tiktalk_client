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

console.log(commentsData);

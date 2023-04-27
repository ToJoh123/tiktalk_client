/**
 * 1. returns an HTML element for a root comment
 * 2. buttons is conditionally rendered based on whether the user is the author of the comment
 * 3. the number of replies is passed in as a parameter
 */
import { replySection } from "./replySection.js";

//event listener for reply button
export function rootCommentSection(
  comment,
  numberOfReplies,
  replies,
  editAbleCommentIds
) {
  const commentElement = document.createElement("div");
  commentElement.classList.add("comment");
  commentElement.id = `comment-id-${comment._id}`;
  const numberOfLikes = comment.likes ? comment.likes.length : 0;
  commentElement.innerHTML = `
      <div class="commentProfile">
        <a href="./profile.html?username=${comment.username}">
          <img src="https://picsum.photos/40/40" alt="pfp" />
        </a>
        <h3>${comment.username}</h3>
      </div>
      <p id="comment-text-${comment._id}">${comment.text}</p>
      <div class="buttons" id="buttons-${comment._id}">
        ${
          editAbleCommentIds.includes(comment._id)
            ? `
        <button class="fa-regular fa-heart likeBtn" data-comment-id="${comment._id}" id="like-btn-${comment._id}">${numberOfLikes}</button>
        <button class="fa-regular fa-pen-to-square" id="edit-btn-${comment._id}"></button>
        <button class="fa-solid fa-trash" id="delete-btn-${comment._id}"></button>
        <button class="fa-regular fa-comment toggleReplies" id="replyBtn-${comment._id}">${numberOfReplies}</button>
        `
            : `        
            <button class="fa-regular fa-heart likeBtn" data-comment-id="${comment._id}" id="like-btn-${comment._id}">${numberOfLikes}</button>
        <button class="fa-regular fa-comment toggleReplies" id="replyBtn-${comment._id}">${numberOfReplies}</button>
         `
        }
      </div>
      <form class="re-form" id="post-reply-form-${comment._id}">
        <input type="text" name="reply" id="post-reply-text-${
          comment._id
        }" placeholder="Write a comment...">
        <button type="submit" id="submitFormBtn-${comment._id}">Reply</button>
      </form>
      <div class="reply-container hidden" id="reply-container-${comment._id}">
      ${replies.map((reply) => {
        const replyHtml = replySection(reply, editAbleCommentIds);
        return replyHtml;
      })}
    </div>
    
    `;

  return commentElement;
}

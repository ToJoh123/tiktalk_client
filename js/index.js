import { getAllComments } from "./index/controller/getAllComments.js";
import { getCurrentUserComments } from "./index/controller/getCurrentUserComments.js";
import { getFollowerComments } from "./index/controller/getFollowerComments.js";
import { renderComments } from "./index/model/renderComments.js";
import { postComment } from "./index/model/postComment.js";
import { populateFollowList } from "./index/controller/populateFollowList.js"
import { renderButtons } from "./index/model/renderButtons.js";
import { checkAuthentication } from "./index/controller/checkAuthentication.js"
import { updateUserInfo } from "./index/controller/updateUserInfo.js";
import { showLogoutConfirmation } from "./index/controller/showLogoutConfirmation.js"

document.addEventListener("DOMContentLoaded", () => {
  checkAuthentication();
  updateUserInfo();
  getAllComments().then((data) => renderComments(data));
  //delay
  setTimeout(() => {
    getCurrentUserComments().then((data) => renderButtons(data));
  }, 1000);

  document
    .getElementById("forYouTab")
    .addEventListener("click", (e) =>
      getAllComments().then((data) => renderComments(data))
    );
  document
    .getElementById("followingTab")
    .addEventListener("click", (e) =>
      getFollowerComments().then((data) => renderComments(data))
    );
  document;
  document
    .getElementById("logoutBtn")
    .addEventListener("click", showLogoutConfirmation);
  document
    .getElementById("post-comment-form")
    .addEventListener("submit", postComment);
  document;
  const followList = document.getElementById("follow-list");
  populateFollowList(followList);
});

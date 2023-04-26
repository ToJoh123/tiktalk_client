import { getAllComments } from "./index/controller/getAllComments.js";
import { getFollowerComments } from "./index/controller/getFollowerComments.js";
import { renderComments } from "./index/model/renderComments.js";
import { postComment } from "./index/model/postComment.js";
import { populateFollowList } from "./index/controller/populateFollowList.js";
import { checkAuthentication } from "./index/controller/checkAuthentication.js";
import { updateUserInfo } from "./index/controller/updateUserInfo.js";
import { showLogoutConfirmation } from "./index/controller/showLogoutConfirmation.js";
import { commentSection } from "./index/sections/commentSection.js";

document.addEventListener("DOMContentLoaded", () => {
  checkAuthentication();
  updateUserInfo();
  getAllComments().then((data) => commentSection(data));

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

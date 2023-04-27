import { getAllComments } from "./endpoints/getAllComments.js";
import { getFollowingComments } from "./endpoints/getFollowingComments.js";
import { postComment } from "./endpoints/postComment.js";
import { populateFollowList } from "./index/controller/populateFollowList.js";
import { checkAuthentication } from "./index/controller/checkAuthentication.js";
import { updateUserInfo } from "./index/controller/updateUserInfo.js";
import { showLogoutConfirmation } from "./endpoints/showLogoutConfirmation.js";
import { commentSection } from "./index/sections/commentSection.js";

document.addEventListener("DOMContentLoaded", () => {
  checkAuthentication();
  updateUserInfo();
  getAllComments().then((data) => commentSection(data));

  document
    .getElementById("forYouTab")
    .addEventListener("click", (e) =>
      getAllComments().then((data) => commentSection(data))
    );
  document
    .getElementById("followingTab")
    .addEventListener("click", (e) =>
      getFollowingComments().then((data) => commentSection(data))
    );
  document;
  document
    .getElementById("logoutBtn")
    .addEventListener("click", showLogoutConfirmation);
  document
    .getElementById("post-comment-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const text = document.getElementById("post-comment-text").value;
      const commentId = null;
      postComment(text, commentId).then((data) => {
        getAllComments().then((data) => commentSection(data));
      });
      // clear input
      document.getElementById("post-comment-text").value = "";
    });
  document;
  const followList = document.getElementById("follow-list");
  populateFollowList(followList);
});

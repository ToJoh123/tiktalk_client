import { updateUserInfo } from "./index/controller/updateUserInfo.js";
import { checkAuthentication } from "./index/controller/checkAuthentication.js";
import { commentSectionManager } from "./profile/commentsSectionManager.js";
import { profileInfo } from "./profile/section/profileInfo.js";
import { fetchCounts } from "./profile/section/fetchcounts.js";
import { showLogoutConfirmation } from "./endpoints/showLogoutConfirmation.js";




document.addEventListener("DOMContentLoaded", () => {
  checkAuthentication();
  profileInfo();
  updateUserInfo();
  fetchCounts();
  commentSectionManager(); //this renders the comments of logged in user

  document
    .getElementById("logoutBtn")
    .addEventListener("click", showLogoutConfirmation);
});

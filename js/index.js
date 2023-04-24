import { getAllComments } from "./index/controller/getAllComments.js";
import { getCurrentUserComments } from "./index/controller/getCurrentUserComments.js";
import { getFollowerComments } from "./index/controller/getFollowerComments.js";
import { renderComments } from "./index/model/renderComments.js";
import { renderButtons } from "./index/model/renderButtons.js";

function checkAuthentication() {
  const jwt = Cookies.get("jwt");
  if (!jwt) {
    window.location.href = "../html/login.html";
  }
}

async function updateUserInfo() {
  try {
    const jwt = Cookies.get("jwt");
    const response = await fetch("http://localhost:3000/api/userinfo", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      //Username value is invalid redirect.
      window.location.href = "../html/login.html";
    }

    const data = await response.json();
    const userFullnameElem = document.querySelectorAll(".user-fullname");
    const userUsernameElem = document.querySelectorAll(".user-username");

    userFullnameElem.forEach((elem) => {
      elem.textContent = data.fullname;
    });

    userUsernameElem.forEach((elem) => {
      elem.textContent = `@${data.username}`;
    });
  } catch (error) {
    console.error("Error updating user info:", error);
  }
}
function showLogoutConfirmation() {
  const confirmation = confirm("Are you sure you want to log out?");
  if (confirmation) {
    fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        window.location.href = "../html/login.html";
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  checkAuthentication();
  updateUserInfo();
  getAllComments().then((data) => renderComments(data));
  getCurrentUserComments().then((data) => renderButtons(data));

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
});

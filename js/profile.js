import getCurrentUserComments from "./profile/fetch/getCurrentUserComments.js";
import { patchCommentModule } from "./profile/fetch/patchCommentModule.js";

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

function checkAuthentication() {
  const jwt = Cookies.get("jwt");
  if (!jwt) {
    window.location.href = "../html/login.html";
  }
}

function fetchCounts() {
  const userFollowEl = document.querySelector("#user-follow");
  const followersEl = userFollowEl.querySelector("#follower-count");
  const followingEl = userFollowEl.querySelector("#following-count");

  //Retrieve JWT token from cookie.

  const jwtToken = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");

  //Fetch the endpoint.
  fetch("http://localhost:3000/profile/count", {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      followersEl.textContent = data.followers;
      followingEl.textContent = data.following;
    })
    .catch((error) => console.log(error));
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
      throw new Error(`HTTP error! status: ${response.status}`);
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

async function profileComments() {
  getCurrentUserComments().then((data) => comments(data));
}

function comments(data) {
  const commentSectionElement = document.getElementById("comment-section");

  data.forEach((comment) => {
    commentSectionElement.innerHTML += createCommentElement(comment);
    //add delay to allow DOM to update before adding event listener
    setTimeout(() => {
      addEventListener(comment);
    }, 0);
  });
}

function createCommentElement(comment) {
  return `
    <div class="comment" id="comment-id-${comment._id}">
      <p id="status-${comment._id}"></p>
      <form id="edit-form-${comment._id}">
        <input type="text" value="${comment.text}" id="edit-comment-${comment._id}" />
        <button type="submit" id="edit-comment-btn-${comment._id}">Edit</button>
      </form>
      <p>posted: ${comment.createdAt}</p>
    </div>
  `;
}
function addEventListener(comment) {
  //add event listener to form to edit comment
  const editForm = document.getElementById(`edit-form-${comment._id}`);
  editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const commentText = document.getElementById(
      `edit-comment-${comment._id}`
    ).value;

    patchCommentModule(comment._id, commentText).then((data) => {
      if (data.status === 200) {
        const statusElement = document.getElementById(`status-${comment._id}`);
        //append status message to comment element
        statusElement.textContent = "Comment updated successfully!";
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  checkAuthentication();
  updateUserInfo();
  fetchCounts();
  profileComments();

  document
    .getElementById("logoutBtn")
    .addEventListener("click", showLogoutConfirmation);
});

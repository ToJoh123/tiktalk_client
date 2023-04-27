import { patchCommentModule } from "./profile/fetch/patchCommentModule.js";
import { updateUserInfo } from "./index/controller/updateUserInfo.js";
import { checkAuthentication } from "./index/controller/checkAuthentication.js";
import { commentSectionManager } from "./profile/commentsSectionManager.js";

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

function fetchCounts() {
  const userFollowEl = document.querySelector("#user-follow");
  const followersEl = userFollowEl.querySelector("#follower-count");
  const followingEl = userFollowEl.querySelector("#following-count");
  const urlParams = new URLSearchParams(window.location.search);
  const profileName = urlParams.get("username");

  //Retrieve JWT token from cookie.
  const jwtToken = document.cookie.replace(
    /(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  //Fetch the correct endpoint depending on user visits a profile or go to their own profile.
  let endpoint = "http://localhost:3000/profile/count";
  if (profileName) {
    endpoint += `?username=${profileName}`;
  }
  fetch(endpoint, {
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

async function profileInfo() {
  try {
    const jwt = Cookies.get("jwt");
    const urlParams = new URLSearchParams(window.location.search);
    const profileName = urlParams.get("username");
    let endpoint = "http://localhost:3000/profile/globalProfile"; // vad betyder globalProfile?
    if (profileName) {
      endpoint += `?username=${profileName}`;
    }
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 400) {
        const data = await response.json();
        const error = data.error;
        console.error(error);
        //Display error message if the res status = 400.
        const errorMessageElem = document.querySelectorAll(".profile-error");
        errorMessageElem.forEach((elem) => {
          elem.textContent = error;
          elem.style.display = "block";
        });
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } else {
      //Hide the error message if the response status is not 400.
      const errorMessageElem = document.querySelectorAll(".profile-error");
      errorMessageElem.forEach((elem) => {
        elem.style.display = "none";
      });

      const data = await response.json();
      const userFullnameElem = document.querySelectorAll(".profile-fullname");
      const userUsernameElem = document.querySelectorAll(".profile-username");
      const fullName = `${data.data[0].firstname} ${data.data[0].surname}`;
      const profileUser = `@${data.data[0].username}`;

      userFullnameElem.forEach((elem) => {
        elem.textContent = fullName;
      });

      userUsernameElem.forEach((elem) => {
        elem.textContent = profileUser;
      });
    }
  } catch (error) {
    console.error("Error updating user info:", error);
  }
}

// function comments(data) {
//   const commentSectionElement = document.getElementById("comment-section");

//   data.forEach((comment) => {
//     commentSectionElement.innerHTML += createCommentElement(comment);
//     //add delay to allow DOM to update before adding event listener
//     setTimeout(() => {
//       addEventListener(comment);
//     }, 0);
//   });
// }

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
  profileInfo();
  updateUserInfo();
  fetchCounts();
  commentSectionManager(); //this renders the comments of logged in user

  document
    .getElementById("logoutBtn")
    .addEventListener("click", showLogoutConfirmation);
});

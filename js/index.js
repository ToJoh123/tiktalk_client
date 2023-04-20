/**
 * Varför kan jag inte importera funktionerna från andra filer?
 * @KANNÅGONFÖRKLARA
 * @BESVIKEN
 */

function getAllComments() {
  return fetch("http://localhost:3000/comments", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data.data;
    })
    .catch((error) => {
      console.error(error);
    });
}
function renderComments(comments) {
  //check if comments are empty
  if (comments.length === 0) {
    document.getElementById("comments-container-1").innerHTML =
      "No comments to show";
    return;
  }
  const element = document.getElementById("comments-container-1");
  console.log(comments);
  const commentHtml = `
      <div class="comment">
        <div class="commentProfile">
          <img src="https://picsum.photos/40/40" alt="pfp" />
          <h3>TEST FOR YOU</h3>
        </div>
        <p>TEST FOR YOU</p>
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
  //this should clear the comments container before adding new comments
  element.innerHTML = "";
  comments.forEach((comment) => {
    element.innerHTML += commentHtml;
  });
}
function getFollowerComments() {
  return fetch("http://localhost:3000/comments/following", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data.data;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
}

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

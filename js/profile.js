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
  const userFollowEl = document.querySelector('#user-follow');
  const followersEl = userFollowEl.querySelector('#follower-count');
  const followingEl = userFollowEl.querySelector('#following-count');

  //Retrieve JWT token from cookie.
  const jwtToken = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");


  //Fetch the endpoint.
  fetch('http://localhost:3000/profile/count', {
    headers: {
      'Authorization': `Bearer ${jwtToken}`
    }
  })
    .then(response => response.json())
    .then(data => {
      followersEl.textContent = data.followers;
      followingEl.textContent = data.following;
    })
    .catch(error => console.log(error));
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

document.addEventListener("DOMContentLoaded", () => {
  checkAuthentication();
  updateUserInfo();
  fetchCounts();

  document
    .getElementById("logoutBtn")
    .addEventListener("click", showLogoutConfirmation);
});

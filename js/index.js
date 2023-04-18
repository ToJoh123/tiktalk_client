function openTab(evt, tabName) {
  // Gets all the elements with the class "tabcontent" and hides them
  let tabcontent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Gets all the elements with the class "tablinks" and removes the class "active"
  let tablinks = document.getElementsByClassName("tablinks");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Shows the chosen tabs content and adds the class "active" on the button
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
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

function checkAuthentication() {
  const jwt = Cookies.get("jwt");
  if (!jwt) {
    window.location.href = "../html/login.html";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  checkAuthentication();

  document
    .getElementById("forYouTab")
    .addEventListener("click", (event) => openTab(event, "for-you"));
  document
    .getElementById("followingTab")
    .addEventListener("click", (event) => openTab(event, "following"));
  document
    .getElementById("forYouTab2")
    .addEventListener("click", (event) => openTab(event, "for-you"));
  document
    .getElementById("followingTab2")
    .addEventListener("click", (event) => openTab(event, "following"));
  document
    .getElementById("logoutBtn")
    .addEventListener("click", showLogoutConfirmation);
});

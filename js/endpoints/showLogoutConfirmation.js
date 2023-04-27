export function showLogoutConfirmation() {
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
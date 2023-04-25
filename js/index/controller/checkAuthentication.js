export function checkAuthentication() {
    const jwt = Cookies.get("jwt");
    if (!jwt) {
      window.location.href = "../html/login.html";
    }
  }
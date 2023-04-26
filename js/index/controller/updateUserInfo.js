export async function updateUserInfo() {
    try {
      const jwt = Cookies.get("jwt");
      const response = await fetch("http://localhost:3000/profile/api/userinfo", {
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
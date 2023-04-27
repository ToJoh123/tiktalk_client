export async function profileInfo() {
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
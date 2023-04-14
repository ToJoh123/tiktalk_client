document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault(); // prevent form submission
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Send a request to the server-side API for authentication
  fetch("http://localhost:3000/login", {
    // Update the URL to your server-side endpoint
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  })
    .then(function (response) {
      // Handle response from server
      if (response.ok) {
        return response.json();
      } else {
        // Display error message to user
        alert("Failed to log in. Please check your username and password.");
        throw new Error("Failed to log in.");
      }
    })
    .then(function (data) {
      console.log("Login successful:", data.message);
      // Set the JWT cookie in the frontend
      Cookies.set("jwt", data.token, {
        expires: 15 * 60 * 1000, // 15 minutes
        secure: true,
        sameSite: "none",
      });
      // Redirect to the main page (index.html)
      window.location.href = "../html/index.html";
    })
    .catch(function (error) {
      // Handle error
      console.error("Error:", error);
    });
});
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // prevent form submission
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Send a request to the server-side API for authentication
    fetch("http://localhost:3000/register", { // Update the URL to your server-side endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then(function(response) {
        // Handle response from server
        if (response.ok) {
          // Redirect to success page or perform other actions
          window.location.href = "/html/dashboard.html";
        } else {
          // Display error message to user
          alert("Failed to create account.");
        }
      })
      .catch(function(error) {
        // Handle error
        console.error("Error:", error);
      });
  });
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    const firstname = document.getElementById("firstname").value;
    const surname = document.getElementById("surname").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    //Send a request to the server-side endpoint.
    fetch("http://localhost:3000/register", { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstname: firstname, surname: surname, username: username, password: password }),
    })
      .then(function(response) {
        if (response.ok) {
          //Redirect to login.
          window.location.href = "../html/login.html";
        } else {
          //Display error message to user.
          response.json().then(function(data) {
            alert(data.message);
          })
        }
      })
      .catch(function(error) {
        console.error("Error:", error);
      });
  });
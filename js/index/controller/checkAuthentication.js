export function checkAuthentication() {
  //Verify the token on the serverside instead of the client.
  fetch('/access/verify')
  .then(response => {
    if (response.status === 401) {
      window.location.replace('login.html');
    } 
  })
  .catch(error => {
    console.error('Error verifying token:', error);
  });
  }
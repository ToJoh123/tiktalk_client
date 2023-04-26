export function checkAuthentication() {
  //Verify the token on the serverside instead of the client.
  fetch('http://localhost:3000/access/verify', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
  .then(response => {
    if (response.status === 401) {
      window.location.replace('login.html');
    } 
  })
  .catch(error => {
    console.error('Error verifying token:', error);
  });
}
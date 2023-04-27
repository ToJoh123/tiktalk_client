export function fetchCounts() {
    const userFollowEl = document.querySelector("#user-follow");
    const followersEl = userFollowEl.querySelector("#follower-count");
    const followingEl = userFollowEl.querySelector("#following-count");
    const urlParams = new URLSearchParams(window.location.search);
    const profileName = urlParams.get("username");
  
    //Retrieve JWT token from cookie.
    const jwt = document.cookie.replace(
      /(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
  
    //Fetch the correct endpoint depending on user visits a profile or go to their own profile.
    let endpoint = "http://localhost:3000/profile/count";
    if (profileName) {
      endpoint += `?username=${profileName}`;
    }
    fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        followersEl.textContent = data.followers;
        followingEl.textContent = data.following;
      })
      .catch((error) => console.log(error));
  }
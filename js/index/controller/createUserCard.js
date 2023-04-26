import { addFollow } from "./addFollow.js";

export function createUserCard(user) {
  const li = document.createElement("li");
  li.classList.add("user-card");

  // Add profile picture
  const profileLink = document.createElement("a"); // Create the link element
  profileLink.href = `./profile.html?username=${user.username}`; // Set the link URL
  li.appendChild(profileLink); // Add the link to the card

  const imageUrl = `https://robohash.org/${user.username}?set=set4`;

  const img = document.createElement("img");
  img.src = imageUrl;
  img.width = 50;
  img.height = 50;
  img.style.borderRadius = "50%";
  profileLink.appendChild(img);

  const userInfo = document.createElement("div");
  userInfo.classList.add("user-card-info");

  const fullnameString = `${user.firstname} ${user.surname}`;

  const fullname = document.createElement("h3");
  fullname.innerText = fullnameString;
  userInfo.appendChild(fullname);

  const username = document.createElement("p");
  username.innerText = user.username;
  userInfo.appendChild(username);

  li.appendChild(userInfo);

  // Add follow button
  const followLink = document.createElement("a");
  followLink.classList.add("follow-link");
  followLink.innerText = "Follow";
  followLink.href = "#"; // Add href to prevent the page from reloading
  followLink.addEventListener("click", async (event) => {
    event.preventDefault();
    const success = await addFollow(user);
    if (success) {
      console.log(`Followed user: ${user._id}`);
      followLink.innerText = "Following";
      followLink.classList.add("following");
    } else {
      console.error(`Failed to follow user: ${user.username}`);
    }
  });
  li.appendChild(followLink);

  return li;
}

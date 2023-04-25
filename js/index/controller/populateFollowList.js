import { fetchUsers } from "./fetchUsers.js";
import { fetchFollowing } from "./fetchFollowing.js";
import { createUserCard } from "./createUserCard.js";

export async function populateFollowList(followList) {
  const users = await fetchUsers();
  const followingList = await fetchFollowing();

  const usersToFollow = users.filter(
    (user) => !followingList.includes(user.username)
  );

  if (usersToFollow.length === 0) {
    const message = document.createElement("p");
    message.innerText = "You're already following everyone";
    followList.appendChild(message);
  } else {
    usersToFollow.forEach((user) => {
      followList.appendChild(createUserCard(user));
    });
  }
}

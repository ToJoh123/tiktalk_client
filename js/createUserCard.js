
export const usersToFollow = [
    {
      id: 1,
      name: "John Doe",
      username: "@johndoe",
      imageUrl: "https://picsum.photos/40/42",
    },
    {
      id: 2,
      name: "Jonathan Ljung",
      username: "@jonathanljung",
      imageUrl: "https://picsum.photos/41/40",
    },
    {
      id: 3,
      name: "Tom Johansson",
      username: "@tomjohansson",
      imageUrl: "https://picsum.photos/40/41",
    },
    // Add more users as needed
  ];
  
  // Function to create user cards
  export function createUserCard(user) {
    const li = document.createElement("li");
    li.classList.add("user-card");
  
    // Add profile picture
    const img = document.createElement("img");
    img.src = user.imageUrl;
    img.width = 50;
    img.height = 50;
    img.style.borderRadius = "50%";
    li.appendChild(img);
  
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-card-info");
  
    const name = document.createElement("h3");
    name.innerText = user.name;
    userInfo.appendChild(name);
  
    const username = document.createElement("p");
    username.innerText = user.username;
    userInfo.appendChild(username);
  
    li.appendChild(userInfo);
  
    // Add follow button
    const followButton = document.createElement("button");
    followButton.classList.add("follow-button");
    followButton.innerText = "Follow";
    followButton.addEventListener("click", () => {
      // Implement your follow functionality here
      console.log(`Follow user: ${user.id}`);
    });
    li.appendChild(followButton);
  
    return li;
  };
  
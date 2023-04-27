import { getCurrentUserComments } from "../endpoints/getCurrentUserComments.js";
import { getThisUserComments } from "../endpoints/getThisUserComments.js";
import { commentFormGenerator } from "./html/commentFormGenerator.js";
import { commentViewGenerator } from "./html/commentViewGenerator.js";
import {
  handleDeleteButtons,
  handleSubmitFormButtons,
} from "./events/events.js";
export async function commentSectionManager() {
  const urlParams = new URLSearchParams(window.location.search);
  const profileName = urlParams.get("username");

  const commentSectionElement = document.querySelector("#comment-section");
  if (!profileName) {
    console.log("view the page as a logged in user");
    getCurrentUserComments()
      .then((data) => {
        const backEndCurrentUserComments = data;
        const commentsCount = backEndCurrentUserComments.length;
        let renderCount = 0;
        let isRendering = false;

        data.forEach((comment) => {
          commentSectionElement.insertAdjacentHTML(
            "beforeend",
            commentFormGenerator(comment)
          );
          renderCount++;
        });

        //when all comments are rendered, add event listeners to the buttons
        if (renderCount === commentsCount && !isRendering) {
          isRendering = true;
          handleSubmitFormButtons();
          handleDeleteButtons();
        }
      })
      .catch((error) => console.log(error));
  }
  if (profileName) {
    console.log("view the page as visitor");
    let renderCount = 0;
    let isRendering = false;
    getThisUserComments(profileName)
      .then((data) => {
        data.forEach((comment) => {
          commentSectionElement.insertAdjacentHTML(
            "beforeend",
            commentViewGenerator(comment)
          );
        });
      })
      .catch((error) => console.log(error));
  }
}

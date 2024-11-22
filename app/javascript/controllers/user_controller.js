import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    const editButton = document.querySelectorAll(".edit-user-profile-btn");
    const userProfileForm = document.getElementById("user-profile-form");
    const userProfileContainer = document.getElementById(
      "user-profile-container"
    );

    if (editButton && userProfileForm) {
      editButton.forEach((button) => {
        button.addEventListener("click", (event) => {
          event.preventDefault();
          if (userProfileForm.style.display === "none") {
            userProfileForm.style.display = "block";
            editButton.innerHTML = "Close Edit Profile";
            userProfileContainer.style.display = "none";
          } else {
            userProfileContainer.style.display = "block";
            userProfileForm.style.display = "none";
            editButton.innerHTML = "Edit Profile";
          }
        });
      });
    }
  }
}

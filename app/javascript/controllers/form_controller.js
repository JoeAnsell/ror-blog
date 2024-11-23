import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    console.log("Form controller connected!");
    // document.querySelectorAll("[data-prevent-scroll]").forEach((button) => {
    //   button.addEventListener("click", (event) => {
    //     event.preventDefault();
    //   });
    // });
  }
}

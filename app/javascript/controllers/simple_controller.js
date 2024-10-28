// app/javascript/controllers/simple_controller.js

import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    console.log("Simple controller connected!");
  }
}

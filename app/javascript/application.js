// app/javascript/application.js

// Import Turbo, Popper, and Bootstrap dependencies
import "@hotwired/turbo-rails";

import "bootstrap";

// Import and set up Stimulus
import { Application } from "@hotwired/stimulus";
import "./controllers";

// Initialize Stimulus
// const application = Application.start();

// Additional imports if necessary
import "./articles-search"; // Assuming you have other scripts like articles-search
// import "./controllers";

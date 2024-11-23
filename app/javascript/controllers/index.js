import { application } from "./application.js";

import CanvasController from "./canvas_controller.js";
application.register("canvas", CanvasController);

import UserController from "./user_controller.js";
application.register("user", UserController);

import FormController from "./form_controller.js";
application.register("form", FormController);

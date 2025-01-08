import { application } from "./application";

import CanvasController from "./canvas_controller.js";
application.register("canvas", CanvasController);

import UserController from "./user_controller.js";
application.register("user", UserController);

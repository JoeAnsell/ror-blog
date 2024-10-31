import { application } from "./application.js";

import CanvasController from "./canvas_controller.js";
application.register("canvas", CanvasController);

import SimpleController from "./simple_controller.js";
application.register("simple", SimpleController);

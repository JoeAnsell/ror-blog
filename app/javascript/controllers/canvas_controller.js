// app/javascript/controllers/canvas_controller.js
import { Controller } from "@hotwired/stimulus";
import { fabric } from "fabric";

export default class extends Controller {
  connect() {
    console.log("Canvas controller connected!");

    const canvas = new fabric.Canvas("fabricCanvas");
    console.log("canvas", canvas);

    // Add objects to the canvas as needed
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: "blue",
      width: 60,
      height: 70,
    });
    canvas.add(rect);
  }
}

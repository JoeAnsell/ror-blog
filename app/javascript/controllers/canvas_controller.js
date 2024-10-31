// app/javascript/controllers/canvas_controller.js
import { Controller } from "@hotwired/stimulus";
import { Canvas, Rect } from "fabric"; // browser

export default class extends Controller {
  connect() {
    console.log("Canvas controller connected!");
    console.log("Canvas!----");
    console.log("Canvas", Canvas);
    console.log(
      'document.getElementById("fabricCanvas")',
      document.getElementById("fabricCanvas")
    );
    const canvas = new Canvas("fabricCanvas");
    // console.log("canvas", canvas);
    // // Add objects to the canvas as needed
    const rect = new Rect({
      left: 100,
      top: 100,
      fill: "blue",
      width: 60,
      height: 70,
    });
    canvas.add(rect);
  }
}

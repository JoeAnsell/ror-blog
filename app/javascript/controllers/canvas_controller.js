// app/javascript/controllers/canvas_controller.js
import { Controller } from "@hotwired/stimulus";
import { fabric } from "fabric"; // browser

export default class extends Controller {
  connect() {
    console.log("Canvas controller connected!");
    // const canvasContainer = document.getElementById("canvas-container");
    const canvas = new fabric.Canvas("fabricCanvas");

    let size = 100;

    function addImage(event) {
      console.log("double click");
      const pointer = canvas.getPointer(event.e);
      new fabric.Image.fromURL("/shrek.png", (img) => {
        console.log("img", img);
        console.log("canvas", canvas);
        console.log(" canvas.getObjects().length", canvas.getObjects());
        img.set({
          left: pointer.x - size / 2,
          top: pointer.y - size / 2,
        });
        img.scaleToWidth(size);
        img.scaleToHeight(size);

        canvas.add(img);
      });
      canvas.renderAll();
    }

    canvas.on("mouse:dblclick", addImage);
  }
}

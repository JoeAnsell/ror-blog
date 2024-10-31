// app/javascript/controllers/canvas_controller.js
import { Controller } from "@hotwired/stimulus";
import { fabric } from "fabric"; // browser

export default class extends Controller {
  connect() {
    console.log("Canvas controller connected!");
    const canvasContainer = document.getElementById("canvas-container");
    const mouseImageContainer = document.getElementById(
      "mouse-image-container"
    );
    const canvas = new fabric.Canvas("fabricCanvas");

    let imageSize = 100;

    function addImage(event) {
      console.log("double click");
      const pointer = canvas.getPointer(event.e);
      new fabric.Image.fromURL("/shrek.png", (img) => {
        console.log("img", img);
        console.log("canvas", canvas);
        console.log(" canvas.getObjects().length", canvas.getObjects());
        img.set({
          left: pointer.x - imageSize / 2,
          top: pointer.y - imageSize / 2,
        });
        img.scaleToWidth(imageSize);
        img.scaleToHeight(imageSize);

        canvas.add(img);
      });
      canvas.renderAll();
    }

    canvas.on("mouse:dblclick", addImage);
    canvasContainer.addEventListener("click", (event) => {
      mouseImageContainer.style.opacity = 0.25;
    });

    mouseImageContainer.style.width = `${imageSize}px`;
    mouseImageContainer.style.height = `${imageSize}px`;

    canvasContainer.addEventListener("mousemove", (event) => {
      const rect = canvasContainer.getBoundingClientRect();

      // Calculate the mouse's position relative to the container
      const mouseX = event.clientX - rect.left - imageSize / 2;
      const mouseY = event.clientY - rect.top - imageSize / 2;

      mouseImageContainer.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    canvas.on("object:scaling", function (event) {
      mouseImageContainer.style.opacity = 0;
    });
    canvas.on("object:rotating", function (event) {
      mouseImageContainer.style.opacity = 0;
    });
    // canvas.on("object:scaled", function (event) {
    //   console.log("scaled");
    //   mouseImageContainer.style.opacity = 0.25;
    // });
  }
}

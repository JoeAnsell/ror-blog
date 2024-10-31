// app/javascript/controllers/canvas_controller.js
import { Controller } from "@hotwired/stimulus";
import { fabric } from "fabric"; // browser

export default class extends Controller {
  connect() {
    console.log("Canvas controller connected!");
    const canvasContainer = document.getElementById("canvas-container");
    const stickerButton = document.querySelectorAll(".sticker-button");
    const mouseSticker = document.getElementById("mouse-sticker");
    const canvas = new fabric.Canvas("fabricCanvas");

    let imageSize = 100;

    function addImage(event) {
      console.log("double click");
      const pointer = canvas.getPointer(event.e);
      new fabric.Image.fromURL(mouseSticker.src, (img) => {
        console.log("img", img);
        console.log("canvas", canvas);
        console.log(" canvas.getObjects().length", canvas.getObjects());
        img.set({
          left: pointer.x - imageSize / 2,
          top: pointer.y - imageSize / 2,
        });
        img.scaleToWidth(imageSize);
        img.scaleToHeight(imageSize);
        img.on("mouseover", function () {
          mouseSticker.style.opacity = 0;
        });

        img.on("mouseout", function () {
          mouseSticker.style.opacity = 0.25;
        });

        canvas.add(img);
      });
      canvas.renderAll();
    }

    canvas.on("mouse:dblclick", addImage);
    canvasContainer.addEventListener("click", (event) => {
      mouseSticker.style.opacity = 0.25;
    });

    mouseSticker.style.width = `${imageSize}px`;
    mouseSticker.style.height = `${imageSize}px`;

    canvasContainer.addEventListener("mousemove", (event) => {
      const rect = canvasContainer.getBoundingClientRect();

      // Calculate the mouse's position relative to the container
      const mouseX = event.clientX - rect.left - imageSize / 2;
      const mouseY = event.clientY - rect.top - imageSize / 2;

      mouseSticker.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    canvas.on("object:scaling", function (event) {
      mouseSticker.style.opacity = 0;
    });
    canvas.on("object:rotating", function (event) {
      mouseSticker.style.opacity = 0;
    });

    stickerButton.forEach((button) => {
      button.addEventListener("click", (event) => {
        console.log("button clicked");
        console.log(event.target);
        mouseSticker.src = event.target.src;
        // const canvas = canvasContainer.querySelector("canvas");
        // const context = canvas.getContext("2d");
        // context.drawImage(event.target, 0, 0);
      });
    });
  }
}

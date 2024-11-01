// app/javascript/controllers/canvas_controller.js
import { Controller } from "@hotwired/stimulus";
import { fabric } from "fabric"; // browser

export default class extends Controller {
  connect() {
    const savedCanvas = localStorage.getItem("canvasState");
    console.log("Canvas controller connected!");
    const canvasContainer = document.getElementById("canvas-container");
    const stickerButton = document.querySelectorAll(".sticker-button");
    const mouseSticker = document.getElementById("mouse-sticker");
    const saveButton = document.getElementById("save-button");
    const deleteButton = document.getElementById("delete-button");
    const moveForward = document.getElementById("move-forwards");
    const moveBackwards = document.getElementById("move-backwards");
    const canvas = new fabric.Canvas("fabricCanvas");

    let imageSize = 100;

    if (savedCanvas) {
      canvas.loadFromJSON(savedCanvas, canvas.renderAll.bind(canvas));
    }

    const addImage = (event) => {
      const pointer = canvas.getPointer(event.e);
      new fabric.Image.fromURL(mouseSticker.src, (img) => {
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
    };

    const deleteImage = (event) => {
      const activeObject = canvas.getActiveObject();

      // Check if an object is selected
      if (activeObject) {
        // Remove the active object from the canvas
        canvas.remove(activeObject);

        // Re-render the canvas to show changes
        canvas.renderAll();
      } else {
        alert("Please select an image to delete.");
      }
    };

    const handleMoveForwards = (event) => {
      const activeObject = canvas.getActiveObject();

      console.log("activeObject", activeObject);
      // Check if an object is selected
      if (activeObject) {
        // Move the active object forward in the z-index
        activeObject.bringForward();

        // Re-render the canvas to show changes
        canvas.renderAll();
      } else {
        alert("Please select an image to bring forward.");
      }
    };

    const handleMoveBackwards = (event) => {
      const activeObject = canvas.getActiveObject();

      console.log("activeObject", activeObject);
      // Check if an object is selected
      if (activeObject) {
        // Move the active object forward in the z-index
        activeObject.sendBackwards();

        // Re-render the canvas to show changes
        canvas.renderAll();
      } else {
        alert("Please select an image to bring forward.");
      }
    };

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
        const newImage = (button.querySelector("img").src = event.target.src);
        mouseSticker.src = newImage;
      });
    });

    deleteButton.addEventListener("click", function () {
      deleteImage();
    });

    moveForward.addEventListener("click", function () {
      handleMoveForwards();
    });

    moveBackwards.addEventListener("click", function () {
      handleMoveBackwards();
    });

    saveButton.addEventListener("click", (event) => {
      const canvasJSON = canvas.toJSON();
      localStorage.setItem("canvasState", JSON.stringify(canvasJSON));

      console.log(canvasJSON);
    });
  }
}

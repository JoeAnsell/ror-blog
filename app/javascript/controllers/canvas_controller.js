// app/javascript/controllers/canvas_controller.js
import { Controller } from "@hotwired/stimulus";
import { fabric } from "fabric"; // browser
import noUiSlider from "nouislider";

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
    const canvasDataField = document.getElementById("canvas-data-field");
    const canvasImageField = document.getElementById("canvas-image-field");
    const canvas = new fabric.Canvas("fabricCanvas");

    console.log(
      "canvasContainer",
      canvasContainer.getBoundingClientRect().width,
      canvasContainer.getBoundingClientRect().height
    );

    const bg = new fabric.Rect({
      left: -1,
      top: -1,
      width: canvasContainer.getBoundingClientRect().width + 2,
      height: canvasContainer.getBoundingClientRect().height + 2,
      fill: "white",
      selectable: false, // prevent the rectangle from being selected
    });

    canvas.add(bg);

    let imageSize = 100;

    const resizeCanvas = () => {
      canvas.setWidth(canvasContainer.offsetWidth);
      canvas.setHeight(canvasContainer.offsetHeight);
    };
    resizeCanvas();

    // Resize the canvas whenever the window is resized
    window.addEventListener("resize", resizeCanvas);

    // console.log("window.location.href", window.location);
    if (window.location.href.includes("edit")) {
      console.log("editing");
      const canvasJSON = JSON.parse(canvasDataField.value);
      canvas.loadFromJSON(canvasJSON, canvas.renderAll.bind(canvas));
    }

    // if (savedCanvas) {
    // canvas.loadFromJSON(savedCanvas, canvas.renderAll.bind(canvas));
    // }

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

    const deleteImage = (e) => {
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

    canvas.on("after:render", function () {
      console.log("Canvas re-rendered");

      const canvasJSON = canvas.toJSON();
      // console.log(JSON.stringify(canvasJSON));
      canvasDataField.value = JSON.stringify(canvasJSON);
    });

    // canvas.on("object:modified", function () {
    //   console.log("Canvas re-rendered");
    // });

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
      const jpegDataURL = canvas.toDataURL({
        format: "jpeg",
        quality: 0.8, // Lower quality for smaller file size
      });

      // console.log("jpegDataURL", jpegDataURL);
      canvasImageField.value = jpegDataURL; // Set as hidden input's value

      // Display the image in a new window (for testing)
      // window.open(jpegDataURL);
    });

    const rangeSlider = document.getElementById("sticker-size");
    // console.log("rangeSlider", rangeSlider);
    // console.log("noUiSlider", noUiSlider);
    noUiSlider.create(rangeSlider, {
      start: [4000],
      range: {
        min: [2000],
        max: [10000],
      },
    });

    document
      .getElementById("article-form")
      .addEventListener("submit", function (e) {
        // e.preventDefault();
        // Prevent the default form submission
        e.preventDefault();

        // Get the base64 image from Fabric.js canvas
        const base64Image = canvas.toDataURL({ format: "jpeg", quality: 0.8 });

        // Set the base64 image string in the hidden field
        document.getElementById("article-image").value = base64Image;

        // Submit the form
        this.submit();
      });
  }
}

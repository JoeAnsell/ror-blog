// app/javascript/controllers/canvas_controller.js
import { Controller } from "@hotwired/stimulus";
import { fabric } from "fabric"; // browser

export default class extends Controller {
  connect() {
    const canvasContainer = document.getElementById("canvas-container");
    console.log("canvasContainer", canvasContainer);
    if (!canvasContainer) {
      return;
    }

    const stickerButton = document.querySelectorAll(".sticker-button");
    const bgImgButton = document.querySelectorAll(".bg-img-button");
    const mouseSticker = document.getElementById("mouse-sticker");
    const saveButton = document.getElementById("save-button");
    const deleteButton = document.getElementById("delete-button");
    const moveForward = document.getElementById("move-forwards");
    const moveBackwards = document.getElementById("move-backwards");
    const increaseStickerSize = document.getElementById(
      "increase-sticker-size"
    );
    const decreaseStickerSize = document.getElementById(
      "decrease-sticker-size"
    );
    const rotateCounterclockwise = document.getElementById(
      "rotate-counterclockwise"
    );
    const rotateClockwise = document.getElementById("rotate-clockwise");
    const stickerBgToggle = document.getElementById("sticker-bg-toggle");
    const frogStickers = document.getElementById("frog-stickers");
    const backgroundImages = document.getElementById("background-images");

    const canvasDataField = document.getElementById("canvas-data-field");
    const canvasImageField = document.getElementById("canvas-image-field");
    const stickerSize = document.getElementById("sticker-size");
    const stickerSizeMax = stickerSize.max;
    const stickerSizeMin = stickerSize.min;
    const canvas = new fabric.Canvas("fabricCanvas", {
      backgroundColor: "#fff",
      preserveObjectStacking: true, // Keeps object stacking order intact
    });

    let imageSize = 200;

    const resizeCanvas = () => {
      canvas.setWidth(canvasContainer.offsetWidth);
      canvas.setHeight(canvasContainer.offsetHeight);
    };
    resizeCanvas();

    // Resize the canvas whenever the window is resized
    window.addEventListener("resize", resizeCanvas);

    mouseSticker.style.width = `auto`;
    mouseSticker.style.height = `${imageSize}px`;

    // console.log("window.location.href", window.location);
    // if (window.location.href.includes("edit")) {
    //   console.log("editing");
    //   const canvasJSON = JSON.parse(canvasDataField.value);
    //   canvas.loadFromJSON(canvasJSON, canvas.renderAll.bind(canvas));
    // }

    // if (savedCanvas) {
    // canvas.loadFromJSON(savedCanvas, canvas.renderAll.bind(canvas));
    // }

    // ------------ End of Canvas Setup -------------//

    // ------------ Contol functions -------------//
    const addImage = (event) => {
      const pointer = canvas.getPointer(event.e);
      new fabric.Image.fromURL(mouseSticker.src, (img) => {
        img.set({
          left: pointer.x - imageSize / 2,
          top: pointer.y - imageSize / 2,
        });
        img.scaleToWidth(imageSize);
        img.scaleToHeight(imageSize);

        canvas.add(img);
      });
      canvas.renderAll();
    };

    const deleteImage = () => {
      const activeObject = canvas.getActiveObject();

      // Check if an object is selected
      if (activeObject) {
        // Remove the active object from the canvas
        canvas.remove(activeObject);

        // Re-render the canvas to show changes
        canvas.renderAll();
      }
    };

    const handleMoveForwards = () => {
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

    const handleIncreaseMouseStickerSize = () => {
      if (imageSize >= stickerSizeMax) {
        return;
      } else {
        imageSize = imageSize + 10;
        stickerSize.value = imageSize;
        mouseSticker.style.height = `${imageSize}px`;
      }
    };

    const handleDecreaseMouseStickerSize = () => {
      if (imageSize <= stickerSizeMin) {
        return;
      } else {
        imageSize = imageSize - 10;
        stickerSize.value = imageSize;
        mouseSticker.style.height = `${imageSize}px`;
      }
    };

    const handleRotateClockwise = () => {
      const activeObject = canvas.getActiveObject();

      // Check if an object is selected
      if (activeObject) {
        // Get the current angle and add 90 degrees
        let currentAngle = activeObject.angle || 0;
        activeObject.rotate(currentAngle + 90);

        // Re-render the canvas to show changes
        canvas.renderAll();
      } else {
        alert("Please select an object to rotate.");
      }
    };

    const handleRotateCounterClockwise = () => {
      const activeObject = canvas.getActiveObject();

      // Check if an object is selected
      if (activeObject) {
        // Get the current angle and add 90 degrees
        let currentAngle = activeObject.angle || 0;
        activeObject.rotate(currentAngle - 90);

        // Re-render the canvas to show changes
        canvas.renderAll();
      } else {
        alert("Please select an object to rotate.");
      }
    };

    const setBackgroundImage = (imageURL) => {
      console.log("setBackgroundImage", imageURL);
      fabric.Image.fromURL(imageURL, function (img) {
        let canvasWidth = canvas.width;
        let canvasHeight = canvas.height;

        // Get the original image dimensions
        let imgWidth = img.width;
        let imgHeight = img.height;

        // Calculate scale while maintaining aspect ratio
        let scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);

        // Set background image with calculated scale
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          scaleX: scale,
          scaleY: scale,
          originX: "center",
          originY: "center",
          left: canvasWidth / 2, // Center the image
          top: canvasHeight / 2,
        });
      });
    };

    const handleStickerBgToggle = () => {
      const stickerBgToggle = document.getElementById("sticker-bg-toggle");
      if (stickerBgToggle.getAttribute("data-current") === "sticker") {
        stickerBgToggle.setAttribute("data-current", "background");
        stickerBgToggle.innerText = "Backgrounds";
        backgroundImages.setAttribute("class", "d-none flex-column");
        frogStickers.setAttribute("class", "d-flex flex-column");
      } else {
        stickerBgToggle.setAttribute("data-current", "sticker");
        stickerBgToggle.innerText = "Stickers";
        frogStickers.setAttribute("class", "d-none flex-column");
        backgroundImages.setAttribute("class", "d-flex flex-column");
      }
    };

    handleStickerBgToggle();

    // ------------ End of Contol functions -------------//

    canvasContainer.addEventListener("mousemove", (event) => {
      const rect = canvasContainer.getBoundingClientRect();

      // Calculate the mouse's position relative to the container
      const mouseX = event.clientX - rect.left - imageSize / 2;
      const mouseY = event.clientY - rect.top - imageSize / 2;

      mouseSticker.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    canvasContainer.addEventListener("mouseenter", (event) => {
      mouseSticker.style.display = "block";
    });

    canvasContainer.addEventListener("mouseleave", (event) => {
      mouseSticker.style.display = "none";
    });

    stickerButton.forEach((button) => {
      button.addEventListener("click", (event) => {
        const newImage = (button.querySelector("img").src = event.target.src);
        mouseSticker.src = newImage;
      });
    });

    bgImgButton.forEach((button) => {
      button.addEventListener("click", (event) => {
        setBackgroundImage(event.target.src);
      });
    });

    stickerSize.addEventListener("input", function (e) {
      imageSize = e.target.value;
      mouseSticker.style.height = `${imageSize}px`;
    });

    //------------ Canvas Events -------------//

    canvas.on("mouse:dblclick", addImage);

    canvasContainer.addEventListener("click", (event) => {
      event.target.setAttribute("data-active", "true");
      mouseSticker.style.opacity = 0.25;
    });

    canvas.on("before:transform", function (event) {
      console.log("event", event);
      mouseSticker.style.display = "none";
    });

    canvas.on("before:selection:cleared", function (event) {
      mouseSticker.style.display = "block";
    });

    canvas.on("object:scaling", function (event) {
      mouseSticker.style.opacity = 0;
    });
    canvas.on("object:rotating", function (event) {
      mouseSticker.style.opacity = 0;
    });

    //------------ End of Canvas Events -------------//

    //------------ Button Events -------------//

    deleteButton.addEventListener("click", function () {
      deleteImage();
    });

    moveForward.addEventListener("click", function () {
      handleMoveForwards();
    });

    moveBackwards.addEventListener("click", function () {
      handleMoveBackwards();
    });

    increaseStickerSize.addEventListener("click", function () {
      handleIncreaseMouseStickerSize();
    });

    decreaseStickerSize.addEventListener("click", function () {
      handleDecreaseMouseStickerSize();
    });

    rotateCounterclockwise.addEventListener("click", function () {
      handleRotateCounterClockwise();
    });

    rotateClockwise.addEventListener("click", function () {
      handleRotateClockwise();
    });

    stickerBgToggle.addEventListener("click", function () {
      handleStickerBgToggle();
    });

    //------------ End of Button Events -------------//

    //------------ Keyboard Events -------------//
    window.addEventListener("keydown", (event) => {
      if (event.key === "Backspace") {
        deleteImage();
      }
      if (event.key === "]") {
        handleMoveForwards();
      }
      if (event.key === "[") {
        handleMoveBackwards();
      }
      if (event.key === "+") {
        handleIncreaseMouseStickerSize();
      }
      if (event.key === "-") {
        handleDecreaseMouseStickerSize();
      }
    });
    //------------ End of Keyboard Events -------------//

    document
      .getElementById("article-form")
      .addEventListener("submit", function (e) {
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

// saveButton.addEventListener("click", (event) => {
//   const jpegDataURL = canvas.toDataURL({
//     format: "jpeg",
//     quality: 0.8, // Lower quality for smaller file size
//   });

//   // console.log("jpegDataURL", jpegDataURL);
//   canvasImageField.value = jpegDataURL; // Set as hidden input's value

//   // Display the image in a new window (for testing)
//   // window.open(jpegDataURL);
// });

document.addEventListener("turbo:load", function () {
  //Download image btn click
  document
    .getElementById("download-image-btn")
    .addEventListener("click", async function () {
      const imageElement = document.getElementById("article-image");
      const imageUrl = imageElement.src;
      const imageAlt = imageElement.alt;

      const image = await fetch(imageUrl);
      const imageBlog = await image.blob();
      const imageURL = URL.createObjectURL(imageBlog);

      const link = document.createElement("a");
      link.href = imageURL;
      link.download = imageAlt;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
});

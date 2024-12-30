document.addEventListener("turbo:load", function () {
  const searchInput = document.getElementById("search-input");
  console.log("frog");

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      let query = searchInput.value;

      // Perform AJAX request to search_articles
      fetch(`/search_articles?query=${encodeURIComponent(query)}`, {
        method: "GET",
        headers: { "X-Requested-With": "XMLHttpRequest" },
      })
        .then((response) => response.text())
        .then((html) => {
          // Update the search results
          document.getElementById("article-results").innerHTML = html;
        })
        .catch((error) => console.error("Error fetching articles:", error));
    });
  }
});

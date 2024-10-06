const imagesContainer = document.querySelector(".images-container");

let favorites = {};

// Load favorites from localStorage
function loadFavorites() {
  if (localStorage.getItem("nasaFavorites")) {
    favorites = JSON.parse(localStorage.getItem("nasaFavorites"));
    createDOMNodes();
  }
}

// Create DOM nodes for favorite images
function createDOMNodes() {
  imagesContainer.textContent = ""; // Clear any existing content

  Object.values(favorites).forEach((item) => {
    // Card container
    const card = document.createElement("div");
    card.classList.add("card");

    // Link
    const link = document.createElement("a");
    link.href = item.hdurl;
    link.title = "View Full Image";
    link.target = "_blank";

    // Image
    const image = document.createElement("img");
    image.src = item.url;
    image.alt = "NASA Picture of the Day";
    image.loading = "lazy";
    image.classList.add("card-img-top");

    // Card body
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    // Card Title
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = item.title;

    // Remove button
    const removeText = document.createElement("p");
    removeText.classList.add("clickable");
    removeText.textContent = "Remove Favorite";
    removeText.setAttribute("onclick", `removeFavorite('${item.url}')`);

    // Card Text
    const cardText = document.createElement("p");
    cardText.textContent = item.explanation;

    // Footer Container
    const footer = document.createElement("small");
    footer.classList.add("text-muted");

    // Date
    const date = document.createElement("strong");
    date.textContent = item.date;

    // Copyright
    const copyrightResult = item.copyright || "";
    const copyright = document.createElement("span");
    copyright.textContent = ` ${copyrightResult}`;

    // Append elements
    footer.append(date, copyright);
    cardBody.append(cardTitle, removeText, cardText, footer);
    link.appendChild(image);
    card.append(link, cardBody);
    imagesContainer.appendChild(card);
  });
}

// Remove favorite from localStorage and update DOM
function removeFavorite(itemUrl) {
  if (favorites[itemUrl]) {
    delete favorites[itemUrl];
    localStorage.setItem("nasaFavorites", JSON.stringify(favorites));
    createDOMNodes(); // Update the display
  }
}

// Load favorites on page load
loadFavorites();

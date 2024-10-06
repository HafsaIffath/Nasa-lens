const resultsNav = document.getElementById("resultsNav");
const favoritesNav = document.getElementById("favoritesNav");
const imagesContainer = document.querySelector(".images-container");
const saveConfirmed = document.querySelector(".save-confirmed");
const loader = document.querySelector(".loader");
//NASA's API
const count = 10;
const apiKey = `DEMO_KEY`;
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

function showContent(page) {
  window.scrollTo({
    top: 0,
    behavior: "instant",
  });
  if (page === "results") {
    resultsNav.classList.remove("hidden");
    favoritesNav.classList.add("hidden");
  } else {
    resultsNav.classList.add("hidden");
    favoritesNav.classList.remove("hidden");
  }
  loader.classList.add("hidden");
}

function createDOMNodes(page) {
  const currentArray =
    page === "results" ? resultsArray : Object.values(favorites);
  console.log("current array: " + currentArray);
  currentArray.forEach((result) => {
    // Create card container
    const card = document.createElement("div");
    card.classList.add("card");

    // Link
    const link = document.createElement("a");
    link.href = result.hdurl;
    link.title = "View Full Image";
    link.target = "_blank";

    //Image
    const image = document.createElement("img");
    image.src = result.url;
    image.alt = "NASA Picture of the Day";
    image.loading = "lazy";
    image.classList.add("card-img-top");

    //Card body
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    //Card Title
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = result.title;

    //Save Text
    const saveText = document.createElement("p");
    saveText.classList.add("clickable");

    if (page === "results") {
      saveText.textContent = "Add To Favorites";
      saveText.setAttribute("onclick", `saveFavorite('${result.url}')`);
    } else {
      saveText.textContent = "Remove Favorite";
      saveText.setAttribute("onclick", `removeFavorite('${result.url}')`);
    }

    //Card Text
    const cardText = document.createElement("p");
    cardText.textContent = result.explanation;

    //Footer Container
    const footer = document.createElement("small");
    footer.classList.add("text-muted");

    //Date
    const date = document.createElement("strong");
    date.textContent = result.date;

    //Copyright
    const copyrightResult =
      result.copyright === undefined ? "" : result.copyright;
    const copyright = document.createElement("span");
    copyright.textContent = ` ${copyrightResult}`;

    //Append
    footer.append(date, copyright);
    cardBody.append(cardTitle, saveText, cardText, footer);
    link.appendChild(image);
    card.append(link, cardBody);
    imagesContainer.appendChild(card);
  });
}

function updateDOM(page) {
  //Get Favorites from localStorage
  if (localStorage.getItem("nasaFavorites")) {
    favorites = JSON.parse(localStorage.getItem("nasaFavorites"));
  }
  imagesContainer.textContent = "";
  createDOMNodes(page);
  showContent(page);
}

//Get Images form NASA API
async function getNasaPics() {
  //Show Loader
  loader.classList.remove("hidden");
  try {
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
    updateDOM("results");
  } catch (err) {
    //Catch error
    alert("API request failed to respond");
  }
}

//Add result to Favories
function saveFavorite(itemUrl) {
  resultsArray.forEach((item) => {
    if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
      favorites[itemUrl] = item;

      // Update localStorage with new favorites
      localStorage.setItem("nasaFavorites", JSON.stringify(favorites));

      // Show Save Confirmation for 2 seconds
      saveConfirmed.hidden = false;
      setTimeout(() => {
        saveConfirmed.hidden = true;
      }, 2000);

      // Change "Add to Favorites" to "Remove Favorite" for this item
      const saveButton = document.querySelector(`[onclick="saveFavorite('${itemUrl}')"]`);
      if (saveButton) {
        saveButton.textContent = "Remove Favorite";
        saveButton.setAttribute("onclick", `removeFavorite('${itemUrl}')`);
      }
    }
  });
}


//Remove items from favorites
function removeFavorite(itemUrl) {
  if (favorites[itemUrl]) {
    delete favorites[itemUrl];

    // Update localStorage after removing the favorite
    localStorage.setItem("nasaFavorites", JSON.stringify(favorites));

    // Update the DOM to change "Remove Favorite" back to "Add to Favorites"
    const saveButton = document.querySelector(`[onclick="removeFavorite('${itemUrl}')"]`);
    if (saveButton) {
      saveButton.textContent = "Add To Favorites";
      saveButton.setAttribute("onclick", `saveFavorite('${itemUrl}')`);
    }

    updateDOM("favorites"); // Refresh Favorites section if displayed
  }
}

//On Load Call getNasaPics
getNasaPics();
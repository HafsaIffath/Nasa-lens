// const resultsNav = document.getElementById("resultsNav");
// const favoritesNav = document.getElementById("favoritesNav");
// const imagesContainer = document.querySelector(".images-container");
// const saveConfirmed = document.querySelector(".save-confirmed");
const loader = document.querySelector(".loader");
const gallery = document.querySelector(".gallery");
//NASA's API
const count = 45;
const apiKey = `4qn4HzBycPShlBTFoQ6IrjyvmgbIceXVbHVJheL5`;
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

function showContent(page) {
  window.scrollTo({
    top: 0,
    behavior: "instant",
  });
  loader.classList.add("hidden");
  //   if (page === "results") {
  //     resultsNav.classList.remove("hidden");
  //     favoritesNav.classList.add("hidden");
  //   } else {
  //     resultsNav.classList.add("hidden");
  //     favoritesNav.classList.remove("hidden");
  //   }
}

function createDOMNodes(page) {
  const currentArray = resultsArray;
  currentArray.forEach((result) => {
    const gallary_item = document.createElement("div");
    const img = document.createElement("img");
    img.src = result.url;
    img.alt = "NASA Picture of the Day";
    img.loading = "lazy";
    gallary_item.classList.add("gallery-item");
    gallary_item.appendChild(img);
    gallery.appendChild(gallary_item);
  });
}

function updateDOM(page) {
  //Get Favorites from localStorage
  //   if (localStorage.getItem("nasaFavorites")) {
  //     favorites = JSON.parse(localStorage.getItem("nasaFavorites"));
  //   }
  //   imagesContainer.textContent = "";
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
    console.log(resultsArray);
    updateDOM("results");
  } catch (err) {
    //Catch error
    window.location.assign("/ErrorPage/error.html");

    // alert("API request failed to respond");
  }
}

//Add result to Favories
//Add result to Favories
// function saveFavorite(itemUrl) {
//   resultsArray.forEach((item) => {
//     if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
//       favorites[itemUrl] = item;

//       // Update localStorage with new favorites
//       localStorage.setItem("nasaFavorites", JSON.stringify(favorites));

//       // Show Save Confirmation for 2 seconds
//       saveConfirmed.hidden = false;
//       setTimeout(() => {
//         saveConfirmed.hidden = true;
//       }, 2000);

//       // Change "Add to Favorites" to "Remove Favorite" for this item
//       const saveButton = document.querySelector(
//         `[onclick="saveFavorite('${itemUrl}')"]`
//       );
//       if (saveButton) {
//         saveButton.textContent = "Remove Favorite";
//         saveButton.setAttribute("onclick", `removeFavorite('${itemUrl}')`);
//       }
//     }
//   });
// }

//Remove items from favorites
// function removeFavorite(itemUrl) {
//   if (favorites[itemUrl]) {
//     delete favorites[itemUrl];

//     // Update localStorage after removing the favorite
//     localStorage.setItem("nasaFavorites", JSON.stringify(favorites));

//     // Update the DOM to change "Remove Favorite" back to "Add to Favorites"
//     const saveButton = document.querySelector(
//       `[onclick="removeFavorite('${itemUrl}')"]`
//     );
//     if (saveButton) {
//       saveButton.textContent = "Add To Favorites";
//       saveButton.setAttribute("onclick", `saveFavorite('${itemUrl}')`);
//     }

//     updateDOM("favorites"); // Refresh Favorites section if displayed
//   }
// }

//On Load Call getNasaPics
getNasaPics();

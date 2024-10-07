const loader = document.querySelector(".loader");
const gallery = document.querySelector(".gallery");
const loadBtnContainer = document.querySelector(".loadmore");
const loadBtn = document.querySelector(".btn-load");
//NASA's API
const count = 60;
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
  loadBtnContainer.classList.remove("hidden");
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
  gallery.textContent = "";

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
    window.location.assign("/ErrorPage/error.html");

    // alert("API request failed to respond");
  }
}

//Load btn
loadBtn.addEventListener("click", getNasaPics);

//On Load Call getNasaPics
getNasaPics();

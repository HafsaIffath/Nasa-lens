//hamburger
const hamburgerToggle = document.querySelector("#hamburger-toggle");
const navbarHam = document.querySelector(".hamnav");

function onHamClick() {
  if (navbarHam.style.display != "none") {
    navbarHam.style.display = "none";
  } else {
    navbarHam.style.display = "";
  }
}

hamburgerToggle.addEventListener("click", onHamClick);

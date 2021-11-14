let mapContainer = document.getElementById("map");
let addressWrapper = document.getElementById("addressWrapper");

function addAddress() {
  console.log("add address");

  mapContainer.classList.add("hidden");
  addressWrapper.classList.remove("hidden");
}

const showMap = () => {
  addressWrapper.classList.add("hidden");
  mapContainer.classList.remove("hidden");
};

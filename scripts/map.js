let propArr = []
let alert = document.getElementById("alert")
let taxpayerWrapper = document.getElementById("taxpayer")
let streetAddressWrapper = document.getElementById("streetAddress")
let cityWrapper = document.getElementById("city")
let stateWrapper = document.getElementById("state")
let zipWrapper = document.getElementById("zip")
let displayAddress = document.getElementById("displayAddress")

$(document).ready(function () {
  fetch("./addresses.json")
    .then((response) => response.json())
    .then((data) => {
      propArr.push(data.properties)
      let ownerDetails = propArr[0]
      // console.log(ownerDetails)
    })
    .catch((error) => console.log(error))
})

function initMap() {
  var myLatlng = new google.maps.LatLng(45.15945, -93.40238)
  var myOptions = {
    zoom: 18,
    center: myLatlng,
  }
  var map = new google.maps.Map(document.getElementById("map"), myOptions)
  var geocoder = new google.maps.Geocoder()

  google.maps.event.addListener(map, "click", function (event) {
    clrInfo()
    geocoder.geocode(
      {
        latLng: event.latLng,
      },
      function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            let address = results[0].formatted_address
            let addressNum = address.split(" ")[0]
            let match = searchProperties(addressNum)

            if (typeof match !== "undefined") {
              // console.log(match)

              displayAddress.classList.remove("hidden")
              taxpayerWrapper.innerHTML = match.taxpayer + "<br />"
              streetAddressWrapper.innerHTML =
                match.street_number + " " + match.street_name + "<br />"
              cityWrapper.innerHTML = match.city + ","
              stateWrapper.innerHTML = match.state
              zipWrapper.innerHTML = match.zip
            } else {
              displayAddress.classList.remove("hidden")
              taxpayerWrapper.innerHTML = "No info available at this time"
            }
          }
        }
      }
    )
  })
}

const clrInfo = () => {
  taxpayerWrapper.innerHTML = ""
  streetAddressWrapper.innerHTML = ""
  cityWrapper.innerHTML = ""
  stateWrapper.innerHTML = ""
  zipWrapper.innerHTML = ""
}

const searchProperties = (addressNum) => {
  let arrayToSearch = propArr[0]
  let addressToSearch = addressNum

  let findMatch = arrayToSearch.filter(
    (b) => b.street_number === addressToSearch
  )

  let match = findMatch[0]

  if (typeof match !== "undefined") {
    return match
  }
}
const showAlert = (alertText, severity) => {
  alert.innerHTML = ""
  alert.classList.remove("hidden")
  chkSev(severity)
  alert.innerHTML += alertText
}

const chkSev = (severity) => {
  switch (severity) {
    case "danger":
      alert.classList.add("alert-danger")
      alert.style.borderColor = "#842029"
      alert.innerHTML = `
        <i
          class="far fa-exclamation-circle"
          style="margin-right: 10px; font-size: 24px"
        ></i>
      `
      break

    default:
      break
  }
}

const displayInfo = (match) => {
  let infoArr = []
  // console.log("match", match)

  Object.entries(match).forEach(([key, value]) => {
    infoArr.push(`${value}`)
  })

  let owner = infoArr[0]
  let streetNum = infoArr[1]
  let streetName = infoArr[2]
  let city = infoArr[3]
  let state = infoArr[4]
  let zip = infoArr[5]

  // console.log(owner, streetNum, streetName, city, state, zip)
}

var x = document.getElementById("map");
function getLocation() {
  var x = document.getElementById("map");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  var x = document.getElementById("map");
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  var latlon = new google.maps.LatLng(lat, lon);
  var mapholder = document.getElementById("map");
  mapholder.style.height = "250px";
  mapholder.style.width = "100%";

  var myOptions = {
    center: latlon,
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    navigationControlOptions: {
      style: google.maps.NavigationControlStyle.SMALL,
    },
  };
  var map = new google.maps.Map(
    document.getElementById("map"),
    myOptions
  );
  var marker = new google.maps.Marker({
    position: latlon,
    map: map,
    title: "You are here!",
  });
}

function showError(error) {
  var x = document.getElementById("map");
  switch (error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred.";
      break;
  }
}

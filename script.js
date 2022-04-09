var positionDicts = [
  { picName: "placeholder.jpg", lat: -33.812193, lon: 151.153654, radius: 300 }, // tennis
  { picName: "placeholder.jpg", lat: -33.829497, lon: 151.181660, radius: 300 }, // gore creek rock
  { picName: "placeholder.jpg", lat: -33.849445, lon: 151.053984, radius: 2000 }, // olympic park hill rd entry
  { picName: "placeholder.jpg", lat: -33.789743, lon: 150.867243, radius: 1000 }, // zoo
  { picName: "placeholder.jpg", lat: -33.706978, lon: 150.698535, radius: 300 }, // Cranebrook
  { picName: "placeholder.jpg", lat: -33.781500, lon: 150.620980, radius: 300 } // Jelly bean
];

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
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  var latlon = new google.maps.LatLng(lat, lon);

  var myOptions = {
    center: latlon,
    zoom: 17,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    navigationControlOptions: {
      style: google.maps.NavigationControlStyle.SMALL,
    },
  };
  var map = new google.maps.Map(document.getElementById("map"), myOptions);
  

  smallestDistance = 9999999;
  closestPos = positionDicts[0];
  positionDicts.forEach(element => {
    dist = haversine_distance(lat, lon, element.lat, element.lon);
    if (dist < smallestDistance) {
      smallestDistance = dist;
      closestPos = element;
    }
  });
  

  // DEBUG
  debugString = "";
  positionDicts.forEach(element => {
    dist = haversine_distance(lat, lon, element.lat, element.lon);
    debugString += "\n > " + dist;
  });
  document.getElementById("debug").innerText = debugString;


  //
  if (haversine_distance(lat, lon, closestPos.lat, closestPos.lon) < closestPos.radius ) {
    var destination = new google.maps.Marker({
      position: new google.maps.LatLng(closestPos.lat, closestPos.lon),
      map: map,
      title: "dest",
    });
    // Add the photo
    document.getElementById("map").src = "placeholder.jpg"
  }
  document.getElementById("map").src = "placeholder.jpg"

  var current = new google.maps.Marker({
    position: latlon,
    map: map,
    title: "You are here!",
  });

  const cityCircle = new google.maps.Circle({
    strokeColor: "#FF6600",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF6600",
    fillOpacity: 0.35,
    map,
    center: latlon,
    radius: closestPos.radius,
  });
}

function haversine_distance(lat1, lon1, lat2, lon2) {
  var R = 6371071; // Radius of the Earth in metres
  var rlat1 = lat1 * (Math.PI/180); // Convert degrees to radians
  var rlat2 = lat2 * (Math.PI/180); // Convert degrees to radians
  var difflat = rlat2-rlat1; // Radian difference (latitudes)
  var difflon = (lon2-lon1) * (Math.PI/180); // Radian difference (longitudes)

  var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
  return d;
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

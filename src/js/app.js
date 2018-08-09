var map, watchId, userPin;
//witing for form submit event
document.getElementById("query").addEventListener("submit", MapSearch);

function GetMap()
{
	map = new Microsoft.Maps.Map('#myMap', {
		credentials: bing.key
	});
	//StartTracking();//On Load start tracking
}

function StartTracking() {
	map.entities.clear();
	setTimeout('', 2000);
	//Add a pushpin to show the user's location.
	userPin = new Microsoft.Maps.Pushpin(map.getCenter(), { visible: false });
	map.entities.push(userPin);

	//Watch the users location.
	watchId = navigator.geolocation.watchPosition(UsersLocationUpdated);
}

function UsersLocationUpdated(position) {
	var loc = new Microsoft.Maps.Location(
				position.coords.latitude,
				position.coords.longitude);
	$("#latlan").html("<li> Latitude: "+position.coords.latitude+"</li><li> Longitude: "+ position.coords.longitude + "</li>")

	//Update the user pushpin.
	userPin.setLocation(loc);
	userPin.setOptions({ visible: true });

	//Center the map on the user's location.
	map.setView({ center: loc, zoom:19 });
}

function StopTracking() {
		// Cancel the geolocation updates.
		navigator.geolocation.clearWatch(watchId);

		//Remove the user pushpin.
		map.entities.clear();
}

function MapSearch() {
	StopTracking();//Stop Tracking so can search for position
	var SearchLocation = document.getElementById('SearchLocation').value;
	document.getElementById("query").reset();
  Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
    var searchManager = new Microsoft.Maps.Search.SearchManager(map);
    var requestOptions = {
      bounds: map.getBounds(),
      where: SearchLocation,
      callback: function (answer, userData) {
        map.setView({ bounds: answer.results[0].bestView });
        map.entities.push(new Microsoft.Maps.Pushpin(answer.results[0].location));
				//console.log(answer.results[0].location.coords.latitude+" "+answer.results[0].location.lcoords.longitude);
        }
    };
    searchManager.geocode(requestOptions);
  });
}

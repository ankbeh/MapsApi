var map, watchId, userPin;

function GetMap()
{
	map = new Microsoft.Maps.Map('#myMap', {
		credentials: bing.key
	});
	StartTracking();
}

function StartTracking() {
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
	map.setView({ center: loc });
}

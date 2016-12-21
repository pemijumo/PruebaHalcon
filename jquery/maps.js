
function pintarMapa() {
    var stops = [
                        {"Geometry":{"Latitude":19.079043,"Longitude":-98.2060973}},
                        {"Geometry":{"Latitude":19.0533330000,"Longitude":-98.2222490000}},
                        {"Geometry":{"Latitude":19.1082448000,"Longitude":-98.2550622000}},
                        {"Geometry":{"Latitude":19.0808040000,"Longitude":-98.2076700000}},
                        {"Geometry":{"Latitude":19.0710620000,"Longitude":-98.2045140000}},
                        {"Geometry":{"Latitude":19.1230140000,"Longitude":-98.2618340000}}/*,
						{"Geometry":{"Latitude":19.079043,"Longitude":-98.2060973}}*/


                    ] ;

    var map = new window.google.maps.Map(document.getElementById("map"));

    // new up complex objects before passing them around
    var directionsDisplay = new window.google.maps.DirectionsRenderer({suppressMarkers: true});
    var directionsService = new window.google.maps.DirectionsService();

    Tour_startUp(stops);

    window.tour.loadMap(map, directionsDisplay);
    window.tour.fitBounds(map);

    if (stops.length > 1)
        window.tour.calcRoute(directionsService, directionsDisplay);
};

function Tour_startUp(stops) {
    if (!window.tour) window.tour = {
        updateStops: function (newStops) {
            stops = newStops;
        },
        // map: google map object
        // directionsDisplay: google directionsDisplay object (comes in empty)
        loadMap: function (map, directionsDisplay) {
            var myOptions = {
                zoom: 13,
                center: new window.google.maps.LatLng(19.079043, -98.2060973), // default 
                mapTypeId: window.google.maps.MapTypeId.ROADMAP
            };
            map.setOptions(myOptions);
            directionsDisplay.setMap(map);
        },
        fitBounds: function (map) {
            var bounds = new window.google.maps.LatLngBounds();

            // extend bounds for each record
            jQuery.each(stops, function (key, val) {
                var myLatlng = new window.google.maps.LatLng(val.Geometry.Latitude, val.Geometry.Longitude);
                bounds.extend(myLatlng);
            });
            map.fitBounds(bounds);
        },
        calcRoute: function (directionsService, directionsDisplay) {
            var batches = [];
            var itemsPerBatch = 10; // google API max = 10 - 1 start, 1 stop, and 8 waypoints
            var itemsCounter = 0;
            var wayptsExist = stops.length > 0;

            while (wayptsExist) {
                var subBatch = [];
                var subitemsCounter = 0;

                for (var j = itemsCounter; j < stops.length; j++) {
                    subitemsCounter++;
                    subBatch.push({
                        location: new window.google.maps.LatLng(stops[j].Geometry.Latitude, stops[j].Geometry.Longitude),
                        stopover: true
                    });
                    if (subitemsCounter == itemsPerBatch)
                        break;
                }

                itemsCounter += subitemsCounter;
                batches.push(subBatch);
                wayptsExist = itemsCounter < stops.length;
                // If it runs again there are still points. Minus 1 before continuing to
                // start up with end of previous tour leg
                itemsCounter--;
            }

            // now we should have a 2 dimensional array with a list of a list of waypoints
            var combinedResults;
            var unsortedResults = [{}]; // to hold the counter and the results themselves as they come back, to later sort
            var directionsResultsReturned = 0;

            for (var k = 0; k < batches.length; k++) {
                var lastIndex = batches[k].length - 1;
                var start = batches[k][0].location;
                var end = batches[k][lastIndex].location;

                // trim first and last entry from array
                var waypts = [];
                waypts = batches[k];
                waypts.splice(0, 1);
                waypts.splice(waypts.length - 1, 1);

                var request = {
                    origin: start,
                    destination: end,
                    waypoints: waypts,
                    travelMode: window.google.maps.TravelMode.WALKING
                };
                (function (kk) {
                    directionsService.route(request, function (result, status) {
                        if (status == window.google.maps.DirectionsStatus.OK) {

                            var unsortedResult = { order: kk, result: result };
                            unsortedResults.push(unsortedResult);

                            directionsResultsReturned++;

                            if (directionsResultsReturned == batches.length) // we've received all the results. put to map
                            {
                                // sort the returned values into their correct order
                                unsortedResults.sort(function (a, b) { return parseFloat(a.order) - parseFloat(b.order); });
                                var count = 0;
                                for (var key in unsortedResults) {
                                    if (unsortedResults[key].result != null) {
                                        if (unsortedResults.hasOwnProperty(key)) {
                                            if (count == 0) // first results. new up the combinedResults object
                                                combinedResults = unsortedResults[key].result;
                                            else {
                                                // only building up legs, overview_path, and bounds in my consolidated object. This is not a complete
                                                // directionResults object, but enough to draw a path on the map, which is all I need
                                                combinedResults.routes[0].legs = combinedResults.routes[0].legs.concat(unsortedResults[key].result.routes[0].legs);
                                                combinedResults.routes[0].overview_path = combinedResults.routes[0].overview_path.concat(unsortedResults[key].result.routes[0].overview_path);

                                                combinedResults.routes[0].bounds = combinedResults.routes[0].bounds.extend(unsortedResults[key].result.routes[0].bounds.getNorthEast());
                                                combinedResults.routes[0].bounds = combinedResults.routes[0].bounds.extend(unsortedResults[key].result.routes[0].bounds.getSouthWest());
                                            }
                                            count++;
                                        }
                                    }
                                }
                                directionsDisplay.setDirections(combinedResults);
                                var legs = combinedResults.routes[0].legs;
                                // alert(legs.length);
                                for (var i=0; i < legs.length;i++){
									var markerletter = "A".charCodeAt(0);
									markerletter += i;
									markerletter = String.fromCharCode(markerletter);
									createMarker(directionsDisplay.getMap(),legs[i].start_location,"marker"+i,"some text for marker "+i+"<br>"+legs[i].start_address,markerletter);
                                }
                                var i=legs.length;
                                var markerletter = "A".charCodeAt(0);
								markerletter += i;
                                markerletter = String.fromCharCode(markerletter);
                                createMarker(directionsDisplay.getMap(),legs[legs.length-1].end_location,"marker"+i,"some text for the "+i+"marker<br>"+legs[legs.length-1].end_address,markerletter);
                            }
                        }
                    });
                })(k);
            }
        }
    };
}






  // Marker sizes are expressed as a Size of X,Y
  // where the origin of the image (0,0) is located
  // in the top left of the image.
 
  // Origins, anchor positions and coordinates of the marker
  // increase in the X direction to the right and in
  // the Y direction down.

  


function createMarker(map, latlng, label, html, color) {
// alert("createMarker("+latlng+","+label+","+html+","+color+")");
    var contentString = '<b>'+label+'</b><br>'+html;
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        shadow: iconShadow,
        icon: getMarkerImage(color),
        shape: iconShape,
        title: label,
        zIndex: Math.round(latlng.lat()*-100000)<<5
        });
        marker.myname = label;

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(contentString); 
        infowindow.open(map,marker);
        });
    return marker;
}
   
var map
var colors = []
var markers = []

function initMap() {

    var directionsService = new google.maps.DirectionsService
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -16.5413554, lng: -51.351121 },
        zoom: 5
    })

    fetch('data.json')
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {

            data.forEach(item => {
                const color = getRandomColor();

                var directionsRenderer = new google.maps.DirectionsRenderer({
                    preserveViewport: true,
                    map: map,
                    polylineOptions: {
                        strokeColor: color,
                        strokeWeight: 5
                    },
                    suppressMarkers: true
                })

                addMarker('A', item.origin, color)
                addMarker('B', item.destination, color)

                item.wayPoints.forEach(point => {
                    addMarker('%E2%80%A2', point.location, color)
                })

                calculateAndDisplayRoute(directionsService, directionsRenderer,
                    item.wayPoints, item.origin, item.destination, color)
            })
        })
        .catch(function (err) {
            console.log(err)
        })
}

function addMarker(title, position, color) {
    const marker = new google.maps.Marker({
        icon: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=" + title + "|" + color.substring(1, color.length),
        position: position,
        map: map,
        color: color,
        animation: google.maps.Animation.DROP
    });

    markers.push(marker);

    var bounds = new google.maps.LatLngBounds();
    markers.forEach(m => {
        bounds.extend(m.position)
    })
    map.fitBounds(bounds);
}

function getRandomColor() {
    var color = '#' + Math.floor(Math.random() * 16777215).toString(16)

    if (!colors.includes(color)) {
        colors.push(color);
        return color;
    }
}

function calculateAndDisplayRoute(directionsService, directionsRenderer, waypts, origin, destination, color) {
    directionsService.route({
        origin: origin,
        destination: destination,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
    }, function (response, status) {
        if (status === 'OK') {
            directionsRenderer.setDirections(response)

            var route = response.routes[0]
            var summaryPanel = document.getElementById('directions-panel')
            //summaryPanel.innerHTML = ''
            // For each route, display summary information.
            var distanceTotal = 0;
            for (var i = 0; i < route.legs.length; i++) {
                var routeSegment = i + 1
                summaryPanel.innerHTML += '<span style="color: ' + color + '"><b>Route Segment: ' + routeSegment +
                    '</b></span><br>'
                summaryPanel.innerHTML += route.legs[i].start_address + '<br><b>to</b><br> '
                summaryPanel.innerHTML += route.legs[i].end_address + '<br>'
                summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>'
                distanceTotal += route.legs[i].distance.value;
            }
            summaryPanel.innerHTML += '<b>Total Distance: ' + distanceTotal/1000 + ' km</b><br><br>'

            summaryPanel.innerHTML += '<b>============================================================</b><br><br>'
        } else {
            window.alert('Directions request failed due to ' + status)
        }
    })
}
document.getElementById("toggleSidebar").addEventListener("click", function() {
    var sidebar = document.getElementById("sidebar");
    var toggleButton = document.getElementById("toggleSidebar");
    
    sidebar.classList.toggle("hidden");
    if (sidebar.classList.contains("hidden")) {
        toggleButton.classList.add("hidden");
    } else {
        toggleButton.classList.remove("hidden");
    }
});

var map = L.map('map').setView([4.486049521789551, 98.0006728735919], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

var userMarker;
var routeLine;
var zonasiRadius = 3000;

var schools = [
    { name: "SMA Negeri 1 Langsa", coords: [4.485424915508707, 97.95397977086314] },
    { name: "SMA Negeri 2 Langsa", coords: [4.456914241430309, 97.9999240688021] },
    { name: "SMA Negeri 3 Langsa", coords: [4.4717503114253985, 97.96243840927237] },
    { name: "SMA Negeri 4 Langsa", coords: [4.5009810402201476, 97.96772348229236] },
    { name: "SMA Negeri 5 Langsa", coords: [4.47078432315616, 97.9401968688022] }
];

schools.forEach(function(school) {
    L.marker(school.coords).addTo(map)
        .bindPopup('<b>' + school.name + '</b>');
});

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            if (userMarker) {
                map.removeLayer(userMarker);
            }

            userMarker = L.marker([userLocation.lat, userLocation.lng]).addTo(map)
                .bindPopup('Lokasi Anda')
                .openPopup();

            map.setView([userLocation.lat, userLocation.lng], 12);
            checkSchoolDistances(userLocation);
        });
    } else {
        alert("Geolocation tidak didukung oleh browser Anda.");
    }
}

document.getElementById('coordsForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var lat = parseFloat(document.getElementById('lat').value);
    var lng = parseFloat(document.getElementById('lng').value);

    if (isNaN(lat) || isNaN(lng)) {
        alert("Koordinat tidak valid.");
        return;
    }

    var userLocation = { lat: lat, lng: lng };

    if (userMarker) {
        map.removeLayer(userMarker);
    }

    userMarker = L.marker([userLocation.lat, userLocation.lng]).addTo(map)
        .bindPopup('Lokasi Anda')
        .openPopup();

    map.setView([userLocation.lat, userLocation.lng], 12);
    checkSchoolDistances(userLocation);
});

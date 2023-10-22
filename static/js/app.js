let map;
// Google Maps is now async
async function initMap() {

    const { Map } = await google.maps.importLibrary("maps");

    map = new Map(document.getElementById("map"), {
        center: center,
        zoom: 12,
        mapId: map_id,
    });
}

initMap();

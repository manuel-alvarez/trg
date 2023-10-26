async function ninth() {
    const { LatLng, LatLngBounds } = await google.maps.importLibrary("core");

    const H3HexagonLayer = deck.H3HexagonLayer
    const GoogleMapsOverlay = deck.GoogleMapsOverlay
    const ICON_MAPPING = {
        marker: {x: 0, y: 0, width: 256, height: 256, mask: true}
    }

    const map = await initMap();

    let bounds = new LatLngBounds();

    fetch("/data/cinco")
        .then((response) => { return response.json() })
        .then((data) => {
            data.results.forEach((row) => {
                const position = new LatLng(row.latitud, row.longitud);
                bounds.extend(position);
            })
            map.fitBounds(bounds);
            map.panToBounds(bounds);
        });

    fetch("/data/nueve")
        .then((response) => { return response.json() })
        .then((data) => {
            deckOverlay = new GoogleMapsOverlay({
                layers: [
                    new H3HexagonLayer({
                        id: 'h3-hexagon-layer',
                        data: data.results,
                        pickable: true,
                        wireframe: false,
                        filled: true,
                        extruded: true,
                        elevationScale: 20,
                        getHexagon: d => d.hex,
                        getFillColor: d => [255, (1 - d.count / 255) * 255, 0],
                        getElevation: d => d.count
                    })
                ]
            })
            deckOverlay.setMap(map)
        })
}

ninth()
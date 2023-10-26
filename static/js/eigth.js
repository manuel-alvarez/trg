async function eigth() {
    const { LatLng, LatLngBounds } = await google.maps.importLibrary("core");

    const S2Layer = deck.S2Layer
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

    fetch("/data/siete")
        .then((response) => { return response.json() })
        .then((data) => {
            deckOverlay = new GoogleMapsOverlay({
                layers: [
                    new S2Layer({
                        id: 's2-layer',
                        data: data.results,
                        pickable: true,
                        wireframe: false,
                        filled: true,
                        extruded: true,
                        elevationScale: 1000,
                        getS2Token: d => d.token,
                        getFillColor: d => [d.value * 255, (1 - d.value) * 255, (1 - d.value) * 128],
                        getElevation: d => d.value * 10
                    })
                ]
            })
            deckOverlay.setMap(map)
        })
}

eigth()
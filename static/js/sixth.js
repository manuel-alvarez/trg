async function sixth() {
    const { LatLng, LatLngBounds } = await google.maps.importLibrary("core");

    const ScatterplotLayer = deck.ScatterplotLayer
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

            console.log(data)

            deckOverlay = new GoogleMapsOverlay({
                layers: [
                    new ScatterplotLayer({
                        id: 'scatterplot-layer',
                        data: data.results,
                        pickable: true,
                        opacity: 0.8,
                        stroked: true,
                        filled: true,
                        radiusScale: 3,
                        radiusMinPixels: 2,
                        radiusMaxPixels: 120,
                        lineWidthMinPixels: 1,
                        getPosition: d => [parseFloat(d.longitud), parseFloat(d.latitud)],
                        getRadius: d => 120,
                        getFillColor: d => [255, 40, 0],
                        getLineColor: d => [0, 0, 0]
                    })
                ]
            })
            deckOverlay.setMap(map)
        })
}

sixth()
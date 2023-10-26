async function fifth() {
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const { LatLngBounds } = await google.maps.importLibrary("core");
    const map = await initMap();

    let bounds = new LatLngBounds();

    fetch("/data/cinco")
        .then((response) => { return response.json() })
        .then((data) => {
            data.results.forEach((row) => {
                const marker = new AdvancedMarkerElement({
                    map,
                    position: { lat: row.latitud, lng: row.longitud },
                    title: `${ row.direccion }`
                });
                bounds.extend(marker.position);
            })

            map.fitBounds(bounds);
            map.panToBounds(bounds);
        })
}

fifth()
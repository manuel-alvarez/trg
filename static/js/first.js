async function first() {
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const map = await initMap();

    let bounds = new google.maps.LatLngBounds();

    fetch("/data/uno")
        .then((response) => { return response.json() })
        .then((data) => {
            data.results.forEach((row) => {
                const marker = new AdvancedMarkerElement({
                    map,
                    position: { lat: row.Latitude, lng: row.Longitude },
                    title: `${ row.Address } ${ row.Number }, ${ row.Locality }`
                });
                bounds.extend(marker.position);
            })

            map.fitBounds(bounds);
            map.panToBounds(bounds);
        })
}

first()
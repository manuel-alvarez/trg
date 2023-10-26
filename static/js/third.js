async function third() {
    const { HeatmapLayer } = await google.maps.importLibrary("visualization");
    const { LatLng, LatLngBounds } = await google.maps.importLibrary("core");
    const map = await initMap();

    let bounds = new LatLngBounds();

    fetch("/data/dos")
        .then((response) => { return response.json() })
        .then((data) => {
            let positions = []; 
            data.results.forEach((row) => {
                const position = new LatLng(row.latitud, row.longitud);
                bounds.extend(position);
                positions.push(position);
            })
            const heatmap = new HeatmapLayer({ data: positions });
            heatmap.setMap(map);

            map.fitBounds(bounds);
            map.panToBounds(bounds);
        })
}

third();

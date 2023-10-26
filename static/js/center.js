async function initCenter() {
    const { PinElement, AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const icon = document.createElement("img");
    icon.src = '/static/img/octopus.png';
    icon.width = 20;
    icon.height = 20;
    document.body.appendChild(icon);

    const pin = new PinElement({
        glyph: icon,
        scale: 1.2,
        background: '#42f560',
        borderColor: '#4C4A4A',
    });

    const marker = new AdvancedMarkerElement({
        map,
        content: pin.element,
        position: center,
      });
}
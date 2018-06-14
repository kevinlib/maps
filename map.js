mapboxgl.accessToken = 'pk.eyJ1Ijoia2V2aW5saWIiLCJhIjoiY2o5N2xvZzJqMDhycjJ3bnI3aW83bW5idCJ9.Wcwr8E1gBxzmFUX037G5Rw';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/kevinlib/cjidj1sf81djb2ro8h83xmzjs',
    center: [-83.74, 42.28], // starting position
    zoom: 10 // starting zoom
});

var url = "fg_data.geojson"
map.on('load', function () {
    map.addSource('points', {type : 'geojson', data: url});
    map.addLayer({
      "id": "points",
      "type": "symbol",
      "source": "points",
      "layout": {
        "icon-image": "marker-editor"
      }
      });
    // });

  map.on('click', function(e) {
    var features = map.queryRenderedFeatures(e.point, {
      layers: ['points'] // replace this with the name of the layer
    });

    if (!features.length) {
      return;
    }

    var feature = features[0];

    var popup = new mapboxgl.Popup({ offset: [0, -15] })
      .setLngLat(feature.geometry.coordinates)
      .setHTML('<strong>' + feature.properties.title + '</strong><p>' + feature.properties.description + '</p>')
      .setLngLat(feature.geometry.coordinates)
      .addTo(map);

      map.on('mousemove', 'points', function(e) {
              // Change the cursor style as a UI indicator.
              map.getCanvas().style.cursor = 'pointer';
          });

      map.on('mouseleave', 'points', function() {
          map.getCanvas().style.cursor = '';
          popup.remove();
      });

  });
  map.addControl(new mapboxgl.NavigationControl());
});

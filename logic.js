// Create a map object.
var map = L.map("map", {
    center: [0, 0],
    zoom: 3
  });

const cirColor = depth => depth>89 ? 'red' : depth>59 ? 'orange' : depth>9 ? 'lightgreen' : 'green';
  
  // Add a tile layer.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson').then(data=>{
    jsonData = data;

    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, {radius: feature.properties.mag*2, fillColor: cirColor(feature.geometry.coordinates[2]), fillOpacity:.70,weight:1,color:'black'});
        }
    }).bindPopup(function (layer) {
        return layer.feature.properties.place;
    }).addTo(map);

  });


  
 
  

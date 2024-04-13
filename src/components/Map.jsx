import { useState, useEffect } from "react"; // Importing necessary hooks from React
import "ol/ol.css"; // Importing OpenLayers CSS file
import Map from "ol/Map"; // Importing Map class from OpenLayers
import View from "ol/View"; // Importing View class from OpenLayers
import XYZ from "ol/source/XYZ"; // Importing XYZ class from OpenLayers
import Draw from "ol/interaction/Draw"; // Importing Draw class from OpenLayers
import { fromLonLat } from "ol/proj"; // Importing fromLonLat function from OpenLayers
import { Vector as VectorSource } from "ol/source.js"; // Importing VectorSource class from OpenLayers
import { Tile as TileLayer } from "ol/layer.js"; // Importing TileLayer class from OpenLayers

// Functional component definition for the map component
const MapComponent = () => {
  // State variables to hold the map and draw interaction instances
  const [map, setMap] = useState(null);
  const [draw, setDraw] = useState(null);

  // useEffect hook to initialize the map when component mounts
  useEffect(() => {
    // Create a new map instance
    const mapInstance = new Map({
      target: "map", // Set the target to the DOM element ID where the map will be rendered
      layers: [
        // Add a tile layer with OpenStreetMap as the source
        new TileLayer({
          source: new XYZ({
            url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png", // URL for OpenStreetMap tiles
          }),
        }),
      ],
      view: new View({
        center: fromLonLat([-110, 46]), // Set initial center coordinates using fromLonLat function
        zoom: 6, // Set initial zoom level
      }),
    });

    // Set the map instance to state
    setMap(mapInstance);

    // Create a draw interaction for drawing LineStrings
    const drawInteraction = new Draw({
      source: new VectorSource(), // Create a vector source for drawing features
      type: "LineString", // Set the type of geometry to be drawn
    });

    // Set the draw interaction to state
    setDraw(drawInteraction);

    // No cleanup needed for this effect
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  // useEffect hook to add the draw interaction to the map when map and draw instances are available
  useEffect(() => {
    if (map && draw) {
      map.addInteraction(draw); // Add the draw interaction to the map
    }
  }, [map, draw]); // Dependencies: map and draw instances

  // Return the map container div
  return <div id="map" style={{ width: "100%", height: "400px" }}></div>;
};

export default MapComponent; // Exporting the MapComponent as the default export

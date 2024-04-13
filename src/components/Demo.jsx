import { useEffect, useRef } from "react"; // Importing necessary hooks from React
import "ol/ol.css"; // Importing OpenLayers CSS file
import Map from "ol/Map"; // Importing Map class from OpenLayers
import View from "ol/View"; // Importing View class from OpenLayers
import TileLayer from "ol/layer/Tile"; // Importing TileLayer class from OpenLayers
import OSM from "ol/source/OSM"; // Importing OSM class from OpenLayers
import { Draw, Modify, Snap } from "ol/interaction"; // Importing interaction classes from OpenLayers
import { Vector as VectorLayer } from "ol/layer"; // Importing VectorLayer class from OpenLayers
import { Vector as VectorSource } from "ol/source"; // Importing VectorSource class from OpenLayers
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style"; // Importing style classes from OpenLayers

// Functional component definition for the demo map
const Demo = () => {
  // Ref to hold reference to the map container
  const mapRef = useRef(null);

  // useEffect hook to initialize the map when component mounts
  useEffect(() => {
    // Create a new map instance
    const map = new Map({
      target: mapRef.current, // Set the target to the map container reference
      layers: [
        // Add a tile layer with OpenStreetMap as the source
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0], // Set initial center coordinates
        zoom: 2, // Set initial zoom level
      }),
    });

    // Create a vector source and layer for drawing and styling features
    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        fill: new Fill({
          color: "rgba(255, 255, 255, 0.2)",
        }),
        stroke: new Stroke({
          color: "#ffcc33",
          width: 2,
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: "#ffcc33",
          }),
        }),
      }),
    });
    map.addLayer(vectorLayer);

    // Draw interaction for drawing points, lines, and polygons
    const draw = new Draw({
      source: vectorSource,
      type: "Point", // Set the type of geometry to be drawn
    });
    map.addInteraction(draw);

    // Modify interaction for modifying drawn features
    const modify = new Modify({ source: vectorSource });
    map.addInteraction(modify);

    // Snap interaction to snap to existing features
    const snap = new Snap({ source: vectorSource });
    map.addInteraction(snap);

    // Cleanup function to dispose the map instance when the component unmounts
    return () => {
      map.dispose();
    };
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  // Return the map container div
  return (
    <div
      ref={mapRef}
      className="map"
      style={{ width: "100%", height: "400px" }}
    ></div>
  );
};

export default Demo; // Exporting the Demo component as the default export

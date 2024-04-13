import { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Draw, Modify, Snap } from 'ol/interaction';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';

const Demo = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });

    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2,
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33',
          }),
        }),
      }),
    });
    map.addLayer(vectorLayer);

    // Draw interaction for drawing points, lines, and polygons
    const draw = new Draw({
      source: vectorSource,
      type: 'Point', // Change type to 'LineString' or 'Polygon' for lines and polygons respectively
    });
    map.addInteraction(draw);

    // Modify interaction for modifying drawn features
    const modify = new Modify({ source: vectorSource });
    map.addInteraction(modify);

    // Snap interaction to snap to existing features
    const snap = new Snap({ source: vectorSource });
    map.addInteraction(snap);

    return () => {
      map.dispose();
    };
  }, []);

  return <div ref={mapRef} className="map" style={{ width: '100%', height: '400px' }}></div>;
};

export default Demo;

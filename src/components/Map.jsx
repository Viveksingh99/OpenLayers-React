
import { useState, useEffect } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import XYZ from 'ol/source/XYZ';
import Draw from 'ol/interaction/Draw';
import { fromLonLat } from 'ol/proj';
import { Vector as VectorSource} from 'ol/source.js';
import {Tile as TileLayer} from 'ol/layer.js';



const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [draw, setDraw] = useState(null);

  useEffect(() => {
    const mapInstance = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          }),
        }),
      ],
      view: new View({
        center: fromLonLat([-110, 46]),
        zoom: 6,
      }),
    });

    setMap(mapInstance);

    const drawInteraction = new Draw({
      source: new VectorSource(),
      type: 'LineString',
    });

    setDraw(drawInteraction);

    return () => {
    };
  }, []);

  useEffect(() => {
    if (map && draw) {
      map.addInteraction(draw);
    }
  }, [map, draw]);


  return (
    <div id="map" style={{ width: '100%', height: '400px' }}>
    </div>
  );
};

export default MapComponent;

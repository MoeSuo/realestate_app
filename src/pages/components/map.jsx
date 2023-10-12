import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { ToastContainer } from "react-toastify";
import { useSession, signOut, getSession } from "next-auth/react";
import mapboxgl from 'mapbox-gl';

import "react-toastify/dist/ReactToastify.css";

export default function MapBox() {




  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoibW9lMTIzNDMyNDMyNCIsImEiOiJjbGltenBvZjUwMWRjM2ZveHFyZTFoc2tuIn0.7xlUIZaEGqzCvShGYOYNJA'; // Replace with your Mapbox access token

    const map = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-74.0066, 40.7135],
      zoom: 15.5,
      pitch: 45,
      bearing: -17.6,
      container: 'map',
      antialias: true
    });

    map.on('style.load', () => {
      const layers = map.getStyle().layers;
      const labelLayerId = layers.find(
        (layer) => layer.type === 'symbol' && layer.layout['text-field']
      ).id;

      map.addLayer(
        {
          'id': 'add-3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 1,
          'paint': {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
          }
        },
        labelLayerId
      );
    });
  }, []); // Empty dependency array means this effect runs once, like componentDidMount

  return (
    <>
      <div id="map" style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }}></div>
     

    </>
  );
}

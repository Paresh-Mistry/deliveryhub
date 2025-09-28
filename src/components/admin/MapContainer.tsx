"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import getCoordinates from "@component/components/common/AddrsCoord";
import { MiniMapProps } from "@component/types";

// Custom Zoom Controls
function ZoomControls() {
  const map = useMap();

  const zoomIn = () => map.setZoom(map.getZoom() + 1);
  const zoomOut = () => map.setZoom(map.getZoom() - 1);

  return (
    <div className="absolute top-2 right-2 flex flex-col gap-1 z-10">
      <button
        onClick={zoomIn}
        className="bg-white border rounded px-2 py-1 text-sm shadow"
      >
        +
      </button>
      <button
        onClick={zoomOut}
        className="bg-white border rounded px-2 py-1 text-sm shadow"
      >
        -
      </button>
    </div>
  );
}


export default function MiniMap({ address }: MiniMapProps) {
  const [zoom, setZoom] = useState(13);
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);

  useEffect(() => {
    async function fetchCoords() {
      try {
        const result = await getCoordinates(address);
        setCoords(result);
      } catch (err) {
        console.error("Failed to fetch coordinates:", err);
      }
    }
    fetchCoords();
  }, [address]);

  if (!coords) return <p>Loading map...</p>; // Wait until coordinates are fetched

  return (
    <div className="relative w-full h-100 border-2 border-blue-500 shadow rounded">
      <MapContainer
        center={[coords.lat, coords.lon]}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <Marker position={[coords.lat, coords.lon]}>
          <Popup>{address}</Popup>
        </Marker>
        <ZoomControls />
      </MapContainer>
    </div>
  );
}


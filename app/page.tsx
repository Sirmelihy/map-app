"use client";

import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with Leaflet
const IstanbulMap = dynamic(() => import("@/components/IstanbulMap"), {
  ssr: false,
  loading: () => (
    <div className="map-loading">
      <div className="loading-spinner"></div>
      <p>Harita Yükleniyor...</p>
    </div>
  ),
});

export default function Home() {
  return (
    <div className="map-container">
      <header className="map-header">
        <h1>İstanbul Keşfet</h1>
        <p>Tarihi mekanları keşfetmek için işaretçilere tıklayın</p>
      </header>
      <IstanbulMap />
    </div>
  );
}

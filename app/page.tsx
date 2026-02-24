"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamic import to avoid SSR issues with Leaflet
const TurkeyMap = dynamic(() => import("@/components/TurkeyMap"), {
  ssr: false,
  loading: () => (
    <div className="map-loading">
      <div className="loading-spinner"></div>
      <p>Harita Yükleniyor...</p>
    </div>
  ),
});

export interface Category {
  id: string;
  hex_color: string;
  name: string;
}

export interface Venue {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  hidden: boolean;
  category_id: string;
  category: Category;
}

export default function Home() {

  const [venues, setVenues] = useState<Venue[]>([])

  useEffect(() => {
    const getVenues = async () => {
      const res = await fetch("/api/venues")
      const data = await res.json() as Venue[]
      console.log(data)
      setVenues(data)
    }
    getVenues()
  }, [])

  return (
    <div className="map-container">
      <header className="map-header">
        <h1>Türk Müziği Kültürel Bellek ve Mekân Haritası</h1>
        <p>Kültürel mekanları keşfetmek için işaretçilere tıklayın</p>
      </header>
      <TurkeyMap venues={venues} />
    </div>
  );
}

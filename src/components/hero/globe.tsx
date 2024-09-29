"use client";
import React from "react";
import dynamic from "next/dynamic";
import Arcs from "@/assets/data/arcs.json"

const World = dynamic(() => import("../ui/globe").then((m) => m.World), {
  ssr: false,
});


export function GlobeDemo() {
  const globeConfig = {
    pointSize: 4,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#F00000",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };
  const sampleArcs = Arcs.arcs

  return (
    <div className={"content-center h-screen w-screen -z-10 absolute top-0 left-0 overflow-hidden"}>
      <div className="h-[800px]">
        <World data={sampleArcs} globeConfig={globeConfig} />
      </div>
    </div>
  );
}

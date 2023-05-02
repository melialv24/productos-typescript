import React from "react";
import { PRODUCTS_TYPES, TLocation } from "../types";
import { useRef, useEffect } from "react";

export const MapComponent = ({ location, type }: { location?: TLocation; type?: string }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: location,
        zoom: 15,
      });

      new window.google.maps.Marker({ position: location, map });
    }
  }, [location]);

  return (
    <div
      style={{
        marginBottom: '20px',
        height: "200px",
        width: "100%",
        display: type === PRODUCTS_TYPES.SPACE ? "block" : "none",
      }}
      ref={mapRef}
    />
  );
};

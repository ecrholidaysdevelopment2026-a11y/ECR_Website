"use client";

import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import {
    MapContainer,
    TileLayer,
    Marker,
    useMapEvents,
    useMap,
} from "react-leaflet";
import { useState, useRef, useEffect } from "react";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet/dist/leaflet.css";
import { getLatLngFromMapLink } from "@/app/utils/getLatLngFromMapLink";

/* ✅ FIX MARKER ICON (REQUIRED) */
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const provider = new OpenStreetMapProvider({
    params: { countrycodes: "in" },
    fetch: window.fetch,
});

const MapController = ({ mapRef }) => {
    const map = useMap();
    useEffect(() => {
        mapRef.current = map;
    }, [map]);
    return null;
};

const normalizePosition = (pos) => {
    if (!pos) return null;
    if (typeof pos === "string") return getLatLngFromMapLink(pos);
    if (pos.lat && pos.lng) return pos;
    return null;
};

const MapPicker = ({ onSelect, initialPosition = null, isInput = true }) => {
    const mapRef = useRef(null);
    const [position, setPosition] = useState(null);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const normalized = normalizePosition(initialPosition);
        if (normalized) setPosition(normalized);
    }, [initialPosition]);

    useEffect(() => {
        if (position && mapRef.current) {
            mapRef.current.setView(
                [position.lat, position.lng],
                13,
                { animate: true }
            );
        }
    }, [position]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        const results = await provider.search({ query });
        if (!results.length) return alert("Location not found");

        const { y: lat, x: lng, bounds } = results[0];
        const newPos = { lat, lng };
        setPosition(newPos);

        if (onSelect) {
            onSelect(`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}`);
        }

        if (bounds && mapRef.current) {
            mapRef.current.fitBounds(bounds, { padding: [40, 40] });
        }
    };

    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                setPosition(e.latlng);
                if (onSelect) {
                    onSelect(
                        `https://www.openstreetmap.org/?mlat=${e.latlng.lat}&mlon=${e.latlng.lng}`
                    );
                }
            },
        });

        return position ? <Marker position={position} /> : null;
    };

    return (
        <>
            {isInput && (
                <div className="flex gap-2 mb-2">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search location"
                        className="border p-2 w-full rounded"
                    />
                    <button
                        onClick={handleSearch}
                        className="px-4 bg-black text-white rounded"
                    >
                        Search
                    </button>
                </div>
            )}

            <MapContainer
                center={position ? [position.lat, position.lng] : [20, 78]}
                zoom={position ? 13 : 5}
                style={{ height: "400px", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />
                <MapController mapRef={mapRef} />
                <LocationMarker />
            </MapContainer>
        </>
    );
};

export default MapPicker;

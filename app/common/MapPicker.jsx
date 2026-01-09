"use client";
import { useState, useRef, useEffect } from "react";
import L from "leaflet";
import {
    MapContainer,
    TileLayer,
    Marker,
    useMapEvents,
    useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { FiHome } from "react-icons/fi";
import ReactDOMServer from "react-dom/server";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { getLatLngFromMapLink } from "@/app/utils/getLatLngFromMapLink";

const homeDivIcon = L.divIcon({
    className: "",
    html: ReactDOMServer.renderToString(
        <div
            style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 6px 12px rgba(0,0,0,0.25)",
            }}
        >
            <FiHome size={20} color="#fff" />
        </div>
    ),
    iconSize: [40, 40],
    iconAnchor: [20, 40], 
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
        if (!results.length) {
            alert("Location not found");
            return;
        }

        const { y: lat, x: lng, bounds } = results[0];
        const newPos = { lat, lng };

        setPosition(newPos);

        if (onSelect) {
            onSelect(
                `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}`
            );
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

        return position ? (
            <Marker position={position} icon={homeDivIcon} />
        ) : null;
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

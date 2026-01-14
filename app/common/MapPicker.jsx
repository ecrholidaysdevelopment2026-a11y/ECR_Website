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

import { FaBed } from "react-icons/fa";
import ReactDOMServer from "react-dom/server";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { getLatLngFromMapLink } from "@/app/utils/getLatLngFromMapLink";
import { Popup } from "react-leaflet";
import CustomImage from "./Image";
import Link from "next/link";


const homeDivIcon = L.divIcon({
    className: "",
    html: ReactDOMServer.renderToString(
        <div
            style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "#E91E63",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 6px 12px rgba(0,0,0,0.25)",
            }}
        >
            <FaBed size={18} color="#fff" />

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

    if (pos.mapLink) {
        const latlng = getLatLngFromMapLink(pos.mapLink);
        if (!latlng) return null;

        return {
            ...latlng,
            ...pos,
        };
    }

    if (pos.lat && pos.lng) {
        return pos;
    }

    return null;
};


const MapPicker = ({
    onSelect,
    initialPosition = null,
    multiple = false,
    isInput = true,
}) => {
    const mapRef = useRef(null);
    const [markers, setMarkers] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        if (!initialPosition) return;

        const data = Array.isArray(initialPosition)
            ? initialPosition
            : [initialPosition];

        const normalized = data
            .map(normalizePosition)
            .filter(Boolean);

        setMarkers(normalized);
    }, [initialPosition]);

    useEffect(() => {
        if (!mapRef.current || markers.length === 0) return;

        if (markers.length === 1) {
            mapRef.current.setView(
                [markers[0].lat, markers[0].lng],
                13
            );
        } else {
            mapRef.current.fitBounds(
                markers.map((m) => [m.lat, m.lng]),
                { padding: [40, 40] }
            );
        }
    }, [markers]);

    const emitChange = (list) => {
        if (!onSelect) return;

        const links = list.map(
            (p) =>
                `https://www.openstreetmap.org/?mlat=${p.lat}&mlon=${p.lng}`
        );

        onSelect(multiple ? links : links[0]);
    };

    const handleSearch = async () => {
        if (!query.trim()) return;

        const res = await provider.search({ query });
        if (!res.length) return alert("Location not found");

        const pos = { lat: res[0].y, lng: res[0].x };

        setMarkers((prev) => {
            const updated = multiple ? [...prev, pos] : [pos];
            emitChange(updated);
            return updated;
        });
    };

    const ClickHandler = () => {
        useMapEvents({
            click(e) {
                setMarkers((prev) => {
                    const updated = multiple
                        ? [...prev, e.latlng]
                        : [e.latlng];
                    emitChange(updated);
                    return updated;
                });
            },
        });
        return null;
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
                        {multiple ? "Add" : "Select"}
                    </button>
                </div>
            )}

            <MapContainer
                center={[20, 78]}
                zoom={5}
                className="h-full w-full"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapController mapRef={mapRef} />
                <ClickHandler />
                {markers?.map((pos, index) => (
                    <Marker
                        key={index}
                        position={[pos.lat, pos.lng]}
                        icon={homeDivIcon}
                    >
                        <Popup
                            closeButton={false}
                            className="padding_none"
                            offset={[0, -30]}
                        >
                            <div className="w-[241px] rounded-xl overflow-hidden">
                                <Link href={pos?.slug} className="relative">
                                    <CustomImage
                                        src={pos.image}
                                        alt={pos.title}
                                        className="w-full h-[140px] object-cover"
                                    />
                                </Link>
                                <div className="p-3">
                                    <div className="flex items-center justify-between text-sm font-semibold">
                                        <span className="truncate max-w-[161px]">
                                            {pos.title}
                                        </span>
                                        {pos.rating && (
                                            <span className="flex items-center gap-1 text-black">
                                                ⭐ {pos.rating}
                                            </span>
                                        )}
                                    </div>
                                    <div className="mt-1 flex items-center gap-1 text-sm font-semibold text-black">
                                        ₹{pos.price?.toLocaleString()}
                                        <span className="text-xs font-normal text-gray-500">
                                            for  1 {" "} / night
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Popup>

                    </Marker>
                ))}
            </MapContainer>
        </>
    );
};

export default MapPicker;
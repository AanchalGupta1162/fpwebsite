import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Dropdown, DropdownButton } from "react-bootstrap";
import axios from "axios";

// 📍 Bus Routes Data with Stops
const busRoutes = [
  {
    bus_no: "3",
    name: "Koperkhairne To Thane",
    stops: [
      { id: 1, name: "Koperkhairne Depot", coords: [19.1197, 73.0037] },
      { id: 2, name: "Thane Station", coords: [19.2183, 72.9781] }
    ]
  },
  {
    bus_no: "4",
    name: "Vashi Sec.07 To Thane",
    stops: [
      { id: 1, name: "Vashi Sector 7", coords: [19.0750, 72.9980] },
      { id: 2, name: "Thane Station", coords: [19.2183, 72.9781] }
    ]
  }
];

// 📍 Icons
const busIcon = new L.Icon({
  iconUrl: markerIconPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
});

const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30]
});

// 🗺️ OpenRouteService API Key (Get from https://openrouteservice.org/sign-up/)
const ORS_API_KEY = "YOUR_OPENROUTESERVICE_API_KEY";

const MapComponent = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedBus, setSelectedBus] = useState(busRoutes[0]); // Default bus
  const [routePath, setRoutePath] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  // Fetch Shortest Route from OpenRouteService
  const fetchRoute = async () => {
    if (!selectedBus) return;

    // Start and end coordinates in [longitude, latitude] format
    const start = selectedBus.stops[0].coords.reverse().join(",");
    const end = selectedBus.stops[1].coords.reverse().join(",");

    try {
      const response = await axios.get(
        `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ORS_API_KEY}&start=${start}&end=${end}`
      );

      const newPath = response.data.routes[0].geometry.coordinates.map(coord => coord.reverse());
      setRoutePath(newPath);
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  useEffect(() => {
    fetchRoute();
  }, [selectedBus]);

  return (
    <div style={{ height: "500px", width: "100%", position: "relative" }}>
      {/* 🔽 Dropdown for Bus Selection */}
      <DropdownButton
        id="bus-dropdown"
        title={`Bus: ${selectedBus.name}`}
        variant="primary"
        style={{ position: "absolute", top: 10, right: 10, zIndex: 1000 }}
      >
        {busRoutes.map((bus) => (
          <Dropdown.Item key={bus.bus_no} onClick={() => setSelectedBus(bus)}>
            {bus.name} (🚍 No: {bus.bus_no})
          </Dropdown.Item>
        ))}
      </DropdownButton>

      {/* 🗺️ Map */}
      <MapContainer center={userLocation || [19.1, 72.99]} zoom={12} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Show Selected Bus Stops */}
        {selectedBus.stops.map((stop) => (
          <Marker key={stop.id} position={stop.coords} icon={busIcon}>
            <Popup>{stop.name}</Popup>
          </Marker>
        ))}

        {/* Draw Route Line Between Stops */}
        {routePath.length > 0 && <Polyline positions={routePath} color="blue" />}

        {/* Show User Location */}
        {userLocation && (
          <Marker position={userLocation} icon={userIcon}>
            <Popup>You are here</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;

import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { getAllStores } from "../api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = {
  lat: 28.7041,
  lng: 77.1025, // Default center location (Delhi, India)
};

const GoogleMapComponent = () => {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBnDBgU4eFTbpJWycLL1PmwS7gDzbUTzZ4", // Replace with your key
  });

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const storeData = await getAllStores();
        console.log("Fetched Store Data:", storeData);

        if (Array.isArray(storeData)) {
          setStores(storeData);
        } else {
          console.error("Invalid data format:", storeData);
        }
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchStores();
  }, []);

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={defaultCenter} zoom={10}>
      {stores.map((store) => (
        <Marker
          key={store.id}
          position={{
            lat: store.latitude,
            lng: store.longitude,
          }}
          onClick={() => setSelectedStore(store)}
        />
      ))}

      {selectedStore && (
        <InfoWindow
          position={{
            lat: selectedStore.latitude,
            lng: selectedStore.longitude,
          }}
          onCloseClick={() => setSelectedStore(null)}
        >
          <div>
            <h3>{selectedStore.name}</h3>
            <p>Status: {selectedStore.status ? "Open" : "Closed"}</p>
            <p>Address: {selectedStore.address || "No address available"}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default GoogleMapComponent;

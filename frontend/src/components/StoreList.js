import React, { useEffect, useState } from "react";

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch stores from backend
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch("http://localhost:8080/store/all");
        if (!response.ok) {
          throw new Error("Failed to fetch stores");
        }
        const data = await response.json();
        setStores(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  if (loading) {
    return <p>Loading stores...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Store List</h2>
      {stores.length === 0 ? (
        <p>No stores available</p>
      ) : (
        <ul>
          {stores.map((store) => (
            <li key={store.id}>
              <h3>{store.name}</h3>
              <p>
                <strong>Status:</strong> {store.status ? "Open" : "Closed"}
              </p>
              <p>
                <strong>Location:</strong> Latitude: {store.latitude}, Longitude: {store.longitude}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StoreList;

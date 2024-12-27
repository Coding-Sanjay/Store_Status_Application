import React, { useState } from "react";

const AddStoreForm = () => {
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [status, setStatus] = useState(false); // true for 'Open', false for 'Closed'
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !latitude || !longitude) {
      setError("Please fill in all fields.");
      return;
    }

    const storeData = {
      name,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      status,
    };

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/store/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(storeData),
      });

      if (!response.ok) {
        throw new Error("Failed to add store.");
      }

      // Reset form fields on successful submission
      setName("");
      setLatitude("");
      setLongitude("");
      setStatus(false);
      setError(null);
      alert("Store added successfully!");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add New Store</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Store Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="latitude">Latitude</label>
          <input
            type="number"
            id="latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="longitude">Longitude</label>
          <input
            type="number"
            id="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="status">Store Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value === "true")}
          >
            <option value={false}>Closed</option>
            <option value={true}>Open</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Store"}
        </button>
      </form>
    </div>
  );
};

export default AddStoreForm;

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/store";
 // Update the backend URL accordingly

// Fetch all stores from the backend
export const getAllStores = async () => {
  try {
    const response = await fetch(`${API_URL}/all`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch stores");
    }
  } catch (error) {
    console.error(error);
  }
};

// Add a new store
export const addStore = async (storeData) => {
  try {
    const response = await fetch(`${API_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(storeData),
    });

    if (response.ok) {
      const newStore = await response.json();
      return newStore;
    } else {
      throw new Error("Failed to add store");
    }
  } catch (error) {
    console.error(error);
  }
};

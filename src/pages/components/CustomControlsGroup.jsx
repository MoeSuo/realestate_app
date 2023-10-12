import React, { useEffect, useState } from "react";
import CustomControls from "./CustomControls";
import axios from "axios";

function CustomControlsGroup({ apartmentId }) {
  const [apartmentsData, setApartmentsData] = useState([]);
  console.log("Received apartmentId:", apartmentId);

  useEffect(() => {
    async function fetchCustomData() {
      try {
        const response = await axios.get(
          `/api/apartment?apartmentId=${apartmentId}`
        );

        // Extract data from the response
        const fetchedId = response.data.id;
        const fetchedColor = response.data.clickedMaterialColor;
        const fetchedName = response.data.clickedName;
        const fetchedSelection = response.data.clickedOptionSelection;
        const fetchedVisible = response.data.clickedVisible;
        const fetchedNote = response.data.clickedNote;
        const fetchedOpacity = response.data.clickedOpacity;

        // Create an apartment object
        const apartment = {
          id: fetchedId,
          selection: fetchedSelection,
          color: fetchedColor,
          visible: fetchedVisible,
          note: fetchedNote,
          opacity: fetchedOpacity,
        };

        // Update the apartmentsData array with the new apartment data
        setApartmentsData((prevApartmentsData) => [
          ...prevApartmentsData,
          apartment,
        ]);
      } catch (error) {
        console.log(error);
      }
    }

    // Call the fetchCustomData function when the component mounts
    fetchCustomData();
  }, [apartmentId]);

  return null; // You can return null since you're not rendering anything here
}

export default CustomControlsGroup;

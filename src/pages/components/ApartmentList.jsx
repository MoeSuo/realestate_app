import React from "react";
import {Apart001} from "../Apart_001"; // Import your apartment components here
import { Apart002 } from "../Apart_002";
import { Apart005 } from "../Apart_005";
// Import other necessary dependencies

function ApartmentList({ filter }) {
  // Create an array of apartment IDs or any unique identifier you can filter by
  const apartmentIds = ["001", "002", "005"]; // Replace with your actual IDs
 // Filter apartments based on the filter condition
 const filteredApartments = apartmentIds.filter((id) => {
    if (filter === "all") {
      return true; // Display all apartments
    } else {
      // Implement your filtering logic here, e.g., sold, available
      // Replace the condition below with your actual filtering logic
      return filter === "sold" ? id.includes("sold") : id.includes("available");
    }
  });
  return (
      <div className="apartment-list-container">
      {/* Map over your apartment IDs and render the corresponding components */}
      {apartmentIds.map((id) => (
        <>
          <Apart001 key={id} id={id} />
          <Apart002 key={id} id={id} />
          <Apart005 key={id} id={id} />
          </>
          
          ))}
    </div>
  );
}

export default ApartmentList;

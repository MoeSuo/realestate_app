import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import axios from "axios";

function ApartViewer() {
  const router = useRouter();
  const { apartmentId } = router.query;

  const [customData, setCustomData] = useState(null);
  const { nodes, materials } = useGLTF("/models/kerros.glb");

  useEffect(() => {
    // Fetch customized data from the database using the apartmentId
    async function fetchCustomData() {
      try {
        const response = await axios.get(`/api/apartment/${apartmentId}`);
        setCustomData(response.data);
      } catch (error) {
        console.error("Error fetching customized data:", error);
      }
    }

    if (apartmentId) {
      fetchCustomData();
    }
  }, [apartmentId]);

  // Rest of your rendering logic using Three.js and customData

  return (
    <group>
      {/* Render your GLB file and use customData */}
    </group>
  );
}

export default ApartViewer;

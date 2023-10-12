import React, { useEffect, useState, useCallback, useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Surface(props) {
  const { nodes, materials } = useGLTF("../../models/surface.glb");
  const meshRef = useRef(); // Create a ref to access the mesh

  // Function to change material properties
  const changeMaterialPropertiesOnclick = () => {
    if (meshRef.current) {
      // Access the material of the mesh
      const material = meshRef.current.material;

      // Modify material properties, for example, the color, roughness, metalness, opacity, and transparency
       material.color.set(0xdcf4f5); // Set material color to red
      material.roughness = .9; // Adjust roughness (0 to 1, where 0 is smooth)
      material.metalness = 0.7; // Adjust metalness (0 to 1, where 0 is non-metallic)
      material.opacity = 1; // Set opacity to 50%
      material.transparent = true; // Enable transparency
    }
  };
  // Function to change material properties
  const changeMaterialProperties = () => {
    if (meshRef.current) {
      // Access the material of the mesh
      const material = meshRef.current.material;

      // Modify material properties, for example, the color, roughness, metalness, opacity, and transparency
      // material.color.set(0xff0000); // Set material color to red
      material.roughness = 1; // Adjust roughness (0 to 1, where 0 is smooth)
      material.metalness = 0; // Adjust metalness (0 to 1, where 0 is non-metallic)
      material.opacity = 1; // Set opacity to 50%
      material.transparent = true; // Enable transparency
    }
  };
  // Set material properties with default values when the component loads
  useEffect(() => {
    changeMaterialProperties();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts


  return (
    <group {...props} dispose={null}>
      <mesh
        ref={meshRef} // Assign the ref to the mesh
        geometry={nodes.EXPORT_GOOGLE_SAT_WM.geometry}
        material={materials["rastMat.002"]}
        position={[-200, -1, -250]}
        // onClick={(e) => changeMaterialPropertiesOnclick()}
      />
    </group>
  );
}

useGLTF.preload("../../models/surface.glb");

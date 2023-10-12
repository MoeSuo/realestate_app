import React, { useEffect, useState, useCallback, useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Buildings(props) {
  const { nodes, materials } = useGLTF("../../models/buildings.glb");
  const meshRef = useRef(); // Create a ref to access the mesh

  // Function to change material properties
  const changeMaterialPropertiesOnclick = () => {
    if (meshRef.current) {
      // Access the material of the mesh
      const material = meshRef.current.material;

      // Modify material properties, for example, the color, roughness, metalness, opacity, and transparency
      material.color.set(0xdcf4f5); // Set material color to red
      material.roughness = 0.9; // Adjust roughness (0 to 1, where 0 is smooth)
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
      material.metalness = 0.5; // Adjust metalness (0 to 1, where 0 is non-metallic)
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
        geometry={nodes["91086479"].geometry}
        material={nodes["91086479"].material}
        position={[-200, 0, -250]}
        onClick={(e) => changeMaterialPropertiesOnclick()}
      />
      <mesh
        ref={meshRef} // Assign the ref to the mesh
        geometry={nodes["91086487"].geometry}
        material={nodes["91086487"].material}
        position={[-200, 0, -250]}
        onClick={(e) => changeMaterialPropertiesOnclick()}
      />
      <mesh
        ref={meshRef} // Assign the ref to the mesh
        geometry={nodes["91086488"].geometry}
        material={nodes["91086488"].material}
        position={[-200, 0, -250]}
        onClick={(e) => changeMaterialPropertiesOnclick()}
      />
      <mesh
        ref={meshRef} // Assign the ref to the mesh
        geometry={nodes["91086494"].geometry}
        material={nodes["91086494"].material}
        position={[-200, 0, -250]}
        onClick={(e) => changeMaterialPropertiesOnclick()}
      />
      <mesh
        ref={meshRef} // Assign the ref to the mesh
        geometry={nodes["91086501"].geometry}
        material={nodes["91086501"].material}
        position={[-200, 0, -250]}
        onClick={(e) => changeMaterialPropertiesOnclick()}
      />
      <mesh
        ref={meshRef} // Assign the ref to the mesh
        geometry={nodes["91086511"].geometry}
        material={nodes["91086511"].material}
        position={[-200, 0, -250]}
        onClick={(e) => changeMaterialPropertiesOnclick()}
      />
      <mesh
        ref={meshRef} // Assign the ref to the mesh
        geometry={nodes["91086514"].geometry}
        material={nodes["91086514"].material}
        position={[-200, 0, -250]}
        onClick={(e) => changeMaterialPropertiesOnclick()}
      />
      <mesh
        ref={meshRef} // Assign the ref to the mesh
        geometry={nodes.Lielahden_pientoimistot.geometry}
        material={nodes.Lielahden_pientoimistot.material}
        position={[-200, 0, -250]}
        onClick={(e) => changeMaterialPropertiesOnclick()}
      />
      <mesh
        ref={meshRef} // Assign the ref to the mesh
        geometry={nodes["155078692"].geometry}
        material={nodes["155078692"].material}
        position={[-200, 0, -250]}
        onClick={(e) => changeMaterialPropertiesOnclick()}
      />
      <mesh
        ref={meshRef} // Assign the ref to the mesh
        geometry={nodes["160838461"].geometry}
        material={nodes["160838461"].material}
        position={[-200, 0, -250]}
        onClick={(e) => changeMaterialPropertiesOnclick()}
      />
      <mesh
        ref={meshRef} // Assign the ref to the mesh
        geometry={nodes.Vedenpuhdistus.geometry}
        material={nodes.Vedenpuhdistus.material}
        position={[-200, 0, -250]}
        onClick={(e) => changeMaterialPropertiesOnclick()}
      />
      <mesh
        ref={meshRef} // Assign the ref to the mesh
        geometry={nodes.Lielahden_kartano.geometry}
        material={nodes.Lielahden_kartano.material}
        position={[-200, 0, -250]}
        onClick={(e) => changeMaterialPropertiesOnclick()}
      />
      <mesh
        ref={meshRef} // Assign the ref to the mesh
        geometry={nodes["205502035"].geometry}
        material={nodes["205502035"].material}
        position={[-200, 0, -250]}
        onClick={(e) => changeMaterialPropertiesOnclick()}
      />
      <mesh
        ref={meshRef} // Assign the ref to the mesh
        geometry={nodes["205502036"].geometry}
        material={nodes["205502036"].material}
        position={[-200, 0, -250]}
        onClick={(e) => changeMaterialPropertiesOnclick()}
      />
      <mesh
        ref={meshRef} // Assign the ref to the mesh
        geometry={nodes["205505109"].geometry}
        material={nodes["205505109"].material}
        position={[-200, 0, -250]}
        onClick={(e) => changeMaterialPropertiesOnclick()}
      />
      <mesh
        ref={meshRef} // Assign the ref to the mesh
        geometry={nodes["205506650"].geometry}
        material={nodes["205506650"].material}
        position={[-200, 0, -250]}
        onClick={(e) => changeMaterialPropertiesOnclick()}
      />
      <mesh
        ref={meshRef} // Assign the ref to the mesh
        geometry={nodes.Öljykeskus.geometry}
        material={nodes.Öljykeskus.material}
        position={[-200, 0, -250]}
        onClick={(e) => changeMaterialPropertiesOnclick()}
      />
      <mesh
        ref={meshRef} // Assign the ref to the mesh
        geometry={nodes["205506652"].geometry}
        material={nodes["205506652"].material}
        position={[-200, 0, -250]}
        onClick={(e) => changeMaterialPropertiesOnclick()}
      />
      <mesh
        ref={meshRef} // Assign the ref to the mesh
        geometry={nodes["205506653"].geometry}
        material={nodes["205506653"].material}
        position={[-200, 0, -250]}
        onClick={(e) => changeMaterialPropertiesOnclick()}
      />
      <mesh
        ref={meshRef} // Assign the ref to the mesh
        geometry={nodes["205506707"].geometry}
        material={nodes["205506707"].material}
        position={[-200, 0, -250]}
        onClick={(e) => changeMaterialPropertiesOnclick()}
      />
      <mesh
        ref={meshRef} // Assign the ref to the mesh
        geometry={nodes["205506708"].geometry}
        material={nodes["205506708"].material}
        position={[-200, 0, -250]}
        onClick={(e) => changeMaterialPropertiesOnclick()}
      />
      <mesh
        ref={meshRef} // Assign the ref to the mesh
        geometry={nodes["205506709"].geometry}
        material={nodes["205506709"].material}
        position={[-200, 0, -250]}
        onClick={(e) => changeMaterialPropertiesOnclick()}
      />
      <mesh
        ref={meshRef} // Assign the ref to the mesh
        geometry={nodes["205506710"].geometry}
        material={nodes["205506710"].material}
        position={[-200, 0, -250]}
        onClick={(e) => changeMaterialPropertiesOnclick()}
      />
      <mesh
        ref={meshRef} // Assign the ref to the mesh
        geometry={nodes["205506711"].geometry}
        material={nodes["205506711"].material}
        position={[-200, 0, -250]}
        onClick={(e) => changeMaterialPropertiesOnclick()}
      />
      <mesh
        ref={meshRef} // Assign the ref to the mesh
        geometry={nodes.Vaakahuone.geometry}
        material={nodes.Vaakahuone.material}
        position={[-200, 0, -250]}
        onClick={(e) => changeMaterialPropertiesOnclick()}
      />
      <mesh
        ref={meshRef} // Assign the ref to the mesh
        geometry={nodes.Pumppaamo.geometry}
        material={nodes.Pumppaamo.material}
        position={[-200, 0, -250]}
        onClick={(e) => changeMaterialPropertiesOnclick()}
      />
      <mesh
        ref={meshRef} // Assign the ref to the mesh
        geometry={nodes.Insinöörikonttori.geometry}
        material={nodes.Insinöörikonttori.material}
        position={[-200, 0, -250]}
        onClick={(e) => changeMaterialPropertiesOnclick()}
      />
      <mesh
        ref={meshRef} // Assign the ref to the mesh
        geometry={nodes.Ronttila.geometry}
        material={nodes.Ronttila.material}
        position={[-200, 0, -250]}
        onClick={(e) => changeMaterialPropertiesOnclick()}
      />
      <mesh
        ref={meshRef} // Assign the ref to the mesh
        geometry={nodes["685811234"].geometry}
        material={nodes["685811234"].material}
        position={[-200, 0, -250]}
        onClick={(e) => changeMaterialPropertiesOnclick()}
      />
      <mesh
        ref={meshRef} // Assign the ref to the mesh
        geometry={nodes["994962554"].geometry}
        material={nodes["994962554"].material}
        position={[-200, 0, -250]}
        onClick={(e) => changeMaterialPropertiesOnclick()}
      />
      <mesh
        ref={meshRef} // Assign the ref to the mesh
        geometry={nodes.Nottbeckin_hautakappeli.geometry}
        material={nodes.Nottbeckin_hautakappeli.material}
        position={[-200, 0, -250]}
        onClick={(e) => changeMaterialPropertiesOnclick()}
      />
    </group>
  );
}

useGLTF.preload("../../models/buildings.glb");

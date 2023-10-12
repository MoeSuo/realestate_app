import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Land(props) {
  // const { nodes, materials } = useGLTF('../../models/landscapetampere.glb')
  const { nodes, materials } = useGLTF("../../models/newland3.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.EXPORT_GOOGLE_SAT_WM.geometry}
        material={materials.rastMat}
      >
        <meshPhysicalMaterial color="#9ca3af" />
        </mesh>
      <mesh
        geometry={nodes.Wayshighway.geometry}
        material={nodes.Wayshighway.material}
      />
      <mesh
        geometry={nodes.Areasbuilding.geometry}
        material={nodes.Areasbuilding.material}
      />
    </group>
  );
}

useGLTF.preload("../../models/newland3.glb");

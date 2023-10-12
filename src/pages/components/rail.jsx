import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Rail(props) {
  // const { nodes, materials } = useGLTF('../../models/landscapetampere.glb')
  const { nodes, materials } = useGLTF("../../models/rail.glb");

    return (
      <group {...props} dispose={null}>
        <mesh geometry={nodes.Waysrailway.geometry} material={materials['Material.002']} position={[66.591, 0.101, -2402.15]} rotation={[0, -0.083, 0]} scale={1.36} />
      </group>
    )
  }

useGLTF.preload("../../models/rail.glb");

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Road(props) {
  // const { nodes, materials } = useGLTF('../../models/landscapetampere.glb')
  const { nodes, materials } = useGLTF("../../models/road.glb");

    return (
      <group {...props} dispose={null}>
      <mesh geometry={nodes.Wayshighway.geometry} material={materials['Material.001']} position={[66.591, 0.101, -2402.15]} rotation={[0, -0.083, 0]} scale={1.36} />
    </group>
    )
  }

useGLTF.preload("../../models/road.glb");

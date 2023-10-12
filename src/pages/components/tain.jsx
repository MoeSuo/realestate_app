import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Train(props) {
  // const { nodes, materials } = useGLTF('../../models/landscapetampere.glb')
  const { nodes, materials } = useGLTF("../../models/train.glb");

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes["88821979"].geometry}
        material={materials["Material.003"]}
        position={[-200, -1, -250]}
      />
    </group>
  );
}

useGLTF.preload("../../models/train.glb");

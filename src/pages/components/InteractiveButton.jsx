import React, { useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';

function InteractiveButton({ onClick }) {
  const [hovered, setHover] = useState(false);
  const meshRef = useRef();

  useFrame(() => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    
    <mesh
      ref={meshRef}
      onClick={onClick}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

export default InteractiveButton;

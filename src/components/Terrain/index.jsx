import { useGLTF } from '@react-three/drei';

export function Terrain() {
  // Load model
  const { nodes } = useGLTF('/models/terrain.glb');

  return (
    <group dispose={null}>
      <group dispose={null}>
        <mesh
          geometry={nodes.plane.geometry}
          material={nodes.plane.material} // We'll replace this default Blender material later
          receiveShadow
        />

        <mesh
          rotation-x={-Math.PI / 2}
          position={[0, -0.01, 0]} // Moved it down to prevent the visual glitch from plane collision
          material={nodes.plane.material} // Using the same material for a seamless look
          receiveShadow
        >
          <planeGeometry args={[256, 256]} />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload('/models/terrain.glb');

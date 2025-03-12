import { useGLTF } from '@react-three/drei';

export function Rocks() {
  // Load model
  const { nodes } = useGLTF('/models/rocks.glb');

  return (
    <group rotation-y={Math.PI * 0.5} position={[8, 0.5, -5]} dispose={null}>
      <mesh
        geometry={nodes.rocks.geometry}
        material={nodes.rocks.material}
        castShadow
      />
    </group>
  );
}

useGLTF.preload('/models/rocks.glb');

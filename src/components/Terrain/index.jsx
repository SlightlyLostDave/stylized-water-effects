import { useGLTF } from '@react-three/drei';

export function Terrain() {
  const { nodes } = useGLTF('/models/terrain.glb');
}

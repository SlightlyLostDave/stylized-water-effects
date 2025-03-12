import { useStore } from '../../hooks/useStore';

export const Water = () => {
  const waterLevel = useStore((state) => state.waterLevel);

  return (
    <mesh rotation-x={-Math.PI / 2} position-y={waterLevel}>
      <planeGeometry args={[256, 256]} />
      <meshStandardMaterial color="lightblue" />
    </mesh>
  );
};

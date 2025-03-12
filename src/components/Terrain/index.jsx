import * as THREE from 'three';
import { useEffect, useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useControls } from 'leva';
import CustomShaderMaterial from 'three-custom-shader-material';

import { useStore } from '../../hooks/useStore';

import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

export function Terrain() {
  const waterLevel = useStore((state) => state.waterLevel);

  // Load model
  const { nodes } = useGLTF('/models/terrain.glb');

  // Interactive color parameters
  const { SAND_BASE_COLOR, GRASS_BASE_COLOR, UNDERWATER_BASE_COLOR } =
    useControls('Terrain', {
      SAND_BASE_COLOR: { value: '#ff9900', label: 'Sand' },
      GRASS_BASE_COLOR: { value: '#85a02b', label: 'Grass' },
      UNDERWATER_BASE_COLOR: { value: '#118a4f', label: 'Underwater' },
    });

  // Convert color hex values to Three.js Color objects
  const GRASS_COLOR = useMemo(
    () => new THREE.Color(GRASS_BASE_COLOR),
    [GRASS_BASE_COLOR]
  );
  const UNDERWATER_COLOR = useMemo(
    () => new THREE.Color(UNDERWATER_BASE_COLOR),
    [UNDERWATER_BASE_COLOR]
  );

  // Material
  const materialRef = useRef();

  // Update shader uniforms whenever control values change
  useEffect(() => {
    if (!materialRef.current) return;

    materialRef.current.uniforms.uGrassColor.value = GRASS_COLOR;
    materialRef.current.uniforms.uUnderwaterColor.value = UNDERWATER_COLOR;
    materialRef.current.uniforms.uWaterLevel.value = waterLevel;
  }, [GRASS_COLOR, UNDERWATER_COLOR, waterLevel]);

  return (
    <group dispose={null}>
      <mesh
        geometry={nodes.plane.geometry}
        // We'll replace this default Blender material later
        receiveShadow
      >
        <CustomShaderMaterial
          ref={materialRef}
          baseMaterial={THREE.MeshStandardMaterial}
          color={SAND_BASE_COLOR}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uGrassColor: { value: GRASS_COLOR },
            uUnderwaterColor: { value: UNDERWATER_COLOR },
            uWaterLevel: { value: waterLevel },
          }}
        />
      </mesh>

      <mesh rotation-x={-Math.PI / 2} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[256, 256]} />
        <meshStandardMaterial color={UNDERWATER_BASE_COLOR} />
      </mesh>
    </group>
  );
}

useGLTF.preload('/models/terrain.glb');

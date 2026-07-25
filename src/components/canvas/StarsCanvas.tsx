import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload } from '@react-three/drei';
// @ts-expect-error - maath has no types for the random submodule
import * as random from 'maath/random/dist/maath-random.esm';
import type { Points as ThreePoints } from 'three';
import { useTheme } from '../../hooks/useTheme';

/**
 * Ported from the "Portfolio" project's <StarsCanvas />.
 * Renders a slowly-rotating point-cloud sphere used as an ambient
 * background behind the Hero section.
 */
const StarField = () => {
  const ref = useRef<ThreePoints>(null);
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(4000), { radius: 1.2 }) as Float32Array
  );
  const { effectiveTheme } = useTheme();

  useFrame((_state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta / 12;
    ref.current.rotation.y -= delta / 18;
  });

  const color = effectiveTheme === 'dark' ? '#915EFF' : '#6d28d9';

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color={color}
          size={0.0025}
          sizeAttenuation
          depthWrite={false}
          opacity={0.65}
        />
      </Points>
    </group>
  );
};

/**
 * Absolute-positioned, non-interactive canvas meant to sit behind
 * hero-style content (parent should have `position: relative`).
 */
const StarsCanvas = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <StarField />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;

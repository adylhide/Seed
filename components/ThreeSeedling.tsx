<<<<<<< HEAD
import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PlantLogicProps {
  progress: number;
}

// Generate coordinate distribution for surrounding ambient particle ecosystem
const PARTICLE_COUNT = 60;
const SEED_POSITIONS = new Float32Array(PARTICLE_COUNT * 3);
for (let i = 0; i < PARTICLE_COUNT * 3; i += 3) {
  SEED_POSITIONS[i] = (Math.random() - 0.5) * 2.2;
  SEED_POSITIONS[i + 1] = Math.random() * 2.5 - 1.0;
  SEED_POSITIONS[i + 2] = (Math.random() - 0.5) * 2.2;
}

function PlantLogic({ progress }: PlantLogicProps) {
  const trunkRef = useRef<THREE.Mesh>(null);
  const branchLeftRef = useRef<THREE.Group>(null);
  const branchRightRef = useRef<THREE.Group>(null);
  const canopyRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const particlePositions = useMemo(() => SEED_POSITIONS, []);

  // Growth Stage Calculations based on absolute progress threshold levels
  // Stage 1: Sprout/Stem Elongation (0% -> 33%)
  // Stage 2: Branching Structure Expansion (34% -> 66%)
  // Stage 3: Canopy Bloom & Maturation (67% -> 100%)
  const growth = useMemo(() => {
    return {
      trunkHeight: 0.4 + progress * 1.4,
      trunkThicknessBottom: 0.04 + progress * 0.12,
      trunkThicknessTop: 0.02 + progress * 0.07,
      
      // Secondary branches emerge after 30% progress
      branchScale: progress > 0.3 ? Math.min((progress - 0.3) * 1.43, 1) : 0,
      
      // Foliage canopy structures bloom aggressively past 60% progress
      canopyScale: progress > 0.6 ? Math.min((progress - 0.6) * 2.5, 1) : 0,
    };
  }, [progress]);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const gentleSway = Math.sin(elapsed * 1.2) * 0.02;

    // Apply global environmental idle sway to main trunk
    if (trunkRef.current) {
      trunkRef.current.rotation.z = gentleSway;
    }

    // Dynamic rotation adjustments on the structural sub-branches
    if (branchLeftRef.current && branchRightRef.current) {
      branchLeftRef.current.rotation.z = -0.5 - Math.sin(elapsed * 1.5) * 0.02;
      branchRightRef.current.rotation.z = 0.5 + Math.cos(elapsed * 1.5) * 0.02;
    }

    // Rotate and swirl ambient energy particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y = elapsed * (0.08 + progress * 0.3);
    }
  });

  return (
    <group position={[0, -1.0, 0]}>
      
      {/* 1. Main Structural Trunk */}
      <mesh ref={trunkRef} position={[0, growth.trunkHeight / 2, 0]}>
        <cylinderGeometry 
          args={[growth.trunkThicknessTop, growth.trunkThicknessBottom, growth.trunkHeight, 16]} 
        />
        <meshStandardMaterial color="#4A3B32" roughness={0.9} />
      </mesh>

      {/* 2. Left Structural Branch Group (Emerges midway) */}
      <group 
        ref={branchLeftRef} 
        position={[0, growth.trunkHeight * 0.6, 0]}
        scale={[growth.branchScale, growth.branchScale, growth.branchScale]}
      >
        {/* Branch Wood */}
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.02, 0.04, 0.5, 12]} />
          <meshStandardMaterial color="#4A3B32" roughness={0.9} />
        </mesh>
        
        {/* Early Leaf Cluster on Left Branch */}
        <mesh position={[0, 0.5, 0]} scale={[1, 1.2, 1]}>
          <sphereGeometry args={[0.18, 8, 8]} />
          <meshStandardMaterial color="#306D29" roughness={0.8} flatShading />
        </mesh>
      </group>

      {/* 3. Right Structural Branch Group (Emerges midway) */}
      <group 
        ref={branchRightRef} 
        position={[0, growth.trunkHeight * 0.7, 0]}
        scale={[growth.branchScale, growth.branchScale, growth.branchScale]}
      >
        {/* Branch Wood */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.015, 0.03, 0.4, 12]} />
          <meshStandardMaterial color="#4A3B32" roughness={0.9} />
        </mesh>
        
        {/* Early Leaf Cluster on Right Branch */}
        <mesh position={[0, 0.4, 0]}>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshStandardMaterial color="#3B7A34" roughness={0.8} flatShading />
        </mesh>
      </group>

      {/* 4. Main Crowning Canopy Architecture (Blooms towards 100%) */}
      <group 
        ref={canopyRef} 
        position={[0, growth.trunkHeight, 0]}
        scale={[growth.canopyScale, growth.canopyScale, growth.canopyScale]}
      >
        {/* Central Dense Crown Leaf Mass */}
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.42, 12, 12]} />
          <meshStandardMaterial color="#2B5F25" roughness={0.75} flatShading />
        </mesh>

        {/* Outer Secondary Canopy Cap */}
        <mesh position={[0.15, 0.35, -0.1]} scale={[0.8, 0.8, 0.8]}>
          <sphereGeometry args={[0.35, 10, 10]} />
          <meshStandardMaterial color="#3A7D33" roughness={0.7} flatShading />
        </mesh>

        {/* Opposite Balancing Canopy Cap */}
        <mesh position={[-0.18, 0.3, 0.1]} scale={[0.75, 0.75, 0.75]}>
          <sphereGeometry args={[0.35, 10, 10]} />
          <meshStandardMaterial color="#468F3E" roughness={0.7} flatShading />
        </mesh>

        {/* Top-most Bright Growth Sprout Buds */}
        <mesh position={[0, 0.55, 0]} scale={[0.5, 0.6, 0.5]}>
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshStandardMaterial color="#62A659" roughness={0.65} flatShading />
        </mesh>
      </group>

      {/* 5. Ambient Ecosystem Particle Glow Ring */}
      {progress > 0 && (
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute 
              attach="attributes-position" 
              args={[particlePositions, 3]} 
            />
          </bufferGeometry>
          <pointsMaterial 
            color="#62A659" 
            size={0.04} 
            sizeAttenuation 
            transparent 
            opacity={0.2 + progress * 0.6} 
          />
        </points>
      )}

    </group>
  );
}

export default function ThreeSeedling({ progressPercentage }: { progressPercentage: number }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-[#306D29]/60 p-6 text-center">
        <span className="text-xl mb-1">🌱</span>
        <span className="text-[10px] font-bold uppercase tracking-wider">Ecosystem Display Paused</span>
      </div>
    );
  }

  return (
    <div className="w-full h-64 relative block">
      <Canvas 
        camera={{ position: [0, 0, 2.6], fov: 45 }}
        onError={() => setHasError(true)}
      >
        <ambientLight intensity={1.6} />
        <directionalLight position={[4, 6, 2]} intensity={1.5} />
        <pointLight position={[-3, -2, -2]} intensity={0.5} color="#E7E1B1" />
        <PlantLogic progress={progressPercentage / 100} />
      </Canvas>
    </div>
  );
=======
import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PlantLogicProps {
  progress: number;
}

// Generate coordinate distribution for surrounding ambient particle ecosystem
const PARTICLE_COUNT = 60;
const SEED_POSITIONS = new Float32Array(PARTICLE_COUNT * 3);
for (let i = 0; i < PARTICLE_COUNT * 3; i += 3) {
  SEED_POSITIONS[i] = (Math.random() - 0.5) * 2.2;
  SEED_POSITIONS[i + 1] = Math.random() * 2.5 - 1.0;
  SEED_POSITIONS[i + 2] = (Math.random() - 0.5) * 2.2;
}

function PlantLogic({ progress }: PlantLogicProps) {
  const trunkRef = useRef<THREE.Mesh>(null);
  const branchLeftRef = useRef<THREE.Group>(null);
  const branchRightRef = useRef<THREE.Group>(null);
  const canopyRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const particlePositions = useMemo(() => SEED_POSITIONS, []);

  // Growth Stage Calculations based on absolute progress threshold levels
  // Stage 1: Sprout/Stem Elongation (0% -> 33%)
  // Stage 2: Branching Structure Expansion (34% -> 66%)
  // Stage 3: Canopy Bloom & Maturation (67% -> 100%)
  const growth = useMemo(() => {
    return {
      trunkHeight: 0.4 + progress * 1.4,
      trunkThicknessBottom: 0.04 + progress * 0.12,
      trunkThicknessTop: 0.02 + progress * 0.07,
      
      // Secondary branches emerge after 30% progress
      branchScale: progress > 0.3 ? Math.min((progress - 0.3) * 1.43, 1) : 0,
      
      // Foliage canopy structures bloom aggressively past 60% progress
      canopyScale: progress > 0.6 ? Math.min((progress - 0.6) * 2.5, 1) : 0,
    };
  }, [progress]);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const gentleSway = Math.sin(elapsed * 1.2) * 0.02;

    // Apply global environmental idle sway to main trunk
    if (trunkRef.current) {
      trunkRef.current.rotation.z = gentleSway;
    }

    // Dynamic rotation adjustments on the structural sub-branches
    if (branchLeftRef.current && branchRightRef.current) {
      branchLeftRef.current.rotation.z = -0.5 - Math.sin(elapsed * 1.5) * 0.02;
      branchRightRef.current.rotation.z = 0.5 + Math.cos(elapsed * 1.5) * 0.02;
    }

    // Rotate and swirl ambient energy particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y = elapsed * (0.08 + progress * 0.3);
    }
  });

  return (
    <group position={[0, -1.0, 0]}>
      
      {/* 1. Main Structural Trunk */}
      <mesh ref={trunkRef} position={[0, growth.trunkHeight / 2, 0]}>
        <cylinderGeometry 
          args={[growth.trunkThicknessTop, growth.trunkThicknessBottom, growth.trunkHeight, 16]} 
        />
        <meshStandardMaterial color="#4A3B32" roughness={0.9} />
      </mesh>

      {/* 2. Left Structural Branch Group (Emerges midway) */}
      <group 
        ref={branchLeftRef} 
        position={[0, growth.trunkHeight * 0.6, 0]}
        scale={[growth.branchScale, growth.branchScale, growth.branchScale]}
      >
        {/* Branch Wood */}
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.02, 0.04, 0.5, 12]} />
          <meshStandardMaterial color="#4A3B32" roughness={0.9} />
        </mesh>
        
        {/* Early Leaf Cluster on Left Branch */}
        <mesh position={[0, 0.5, 0]} scale={[1, 1.2, 1]}>
          <sphereGeometry args={[0.18, 8, 8]} />
          <meshStandardMaterial color="#306D29" roughness={0.8} flatShading />
        </mesh>
      </group>

      {/* 3. Right Structural Branch Group (Emerges midway) */}
      <group 
        ref={branchRightRef} 
        position={[0, growth.trunkHeight * 0.7, 0]}
        scale={[growth.branchScale, growth.branchScale, growth.branchScale]}
      >
        {/* Branch Wood */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.015, 0.03, 0.4, 12]} />
          <meshStandardMaterial color="#4A3B32" roughness={0.9} />
        </mesh>
        
        {/* Early Leaf Cluster on Right Branch */}
        <mesh position={[0, 0.4, 0]}>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshStandardMaterial color="#3B7A34" roughness={0.8} flatShading />
        </mesh>
      </group>

      {/* 4. Main Crowning Canopy Architecture (Blooms towards 100%) */}
      <group 
        ref={canopyRef} 
        position={[0, growth.trunkHeight, 0]}
        scale={[growth.canopyScale, growth.canopyScale, growth.canopyScale]}
      >
        {/* Central Dense Crown Leaf Mass */}
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.42, 12, 12]} />
          <meshStandardMaterial color="#2B5F25" roughness={0.75} flatShading />
        </mesh>

        {/* Outer Secondary Canopy Cap */}
        <mesh position={[0.15, 0.35, -0.1]} scale={[0.8, 0.8, 0.8]}>
          <sphereGeometry args={[0.35, 10, 10]} />
          <meshStandardMaterial color="#3A7D33" roughness={0.7} flatShading />
        </mesh>

        {/* Opposite Balancing Canopy Cap */}
        <mesh position={[-0.18, 0.3, 0.1]} scale={[0.75, 0.75, 0.75]}>
          <sphereGeometry args={[0.35, 10, 10]} />
          <meshStandardMaterial color="#468F3E" roughness={0.7} flatShading />
        </mesh>

        {/* Top-most Bright Growth Sprout Buds */}
        <mesh position={[0, 0.55, 0]} scale={[0.5, 0.6, 0.5]}>
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshStandardMaterial color="#62A659" roughness={0.65} flatShading />
        </mesh>
      </group>

      {/* 5. Ambient Ecosystem Particle Glow Ring */}
      {progress > 0 && (
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute 
              attach="attributes-position" 
              args={[particlePositions, 3]} 
            />
          </bufferGeometry>
          <pointsMaterial 
            color="#62A659" 
            size={0.04} 
            sizeAttenuation 
            transparent 
            opacity={0.2 + progress * 0.6} 
          />
        </points>
      )}

    </group>
  );
}

export default function ThreeSeedling({ progressPercentage }: { progressPercentage: number }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-[#306D29]/60 p-6 text-center">
        <span className="text-xl mb-1">🌱</span>
        <span className="text-[10px] font-bold uppercase tracking-wider">Ecosystem Display Paused</span>
      </div>
    );
  }

  return (
    <div className="w-full h-64 relative block">
      <Canvas 
        camera={{ position: [0, 0, 2.6], fov: 45 }}
        onError={() => setHasError(true)}
      >
        <ambientLight intensity={1.6} />
        <directionalLight position={[4, 6, 2]} intensity={1.5} />
        <pointLight position={[-3, -2, -2]} intensity={0.5} color="#E7E1B1" />
        <PlantLogic progress={progressPercentage / 100} />
      </Canvas>
    </div>
  );
>>>>>>> ca6396812bbdbcb8ae8866f8b279a99a82332b8a
}
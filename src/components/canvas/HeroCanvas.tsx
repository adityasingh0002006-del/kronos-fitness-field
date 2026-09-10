"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, Text } from "@react-three/drei";
import * as THREE from "three";

// Floating Ember and Sparks Particle System
function EmberDust({ count = 350 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);

  const [positions, colors, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const spd = new Float32Array(count);

    const yellow = new THREE.Color("#facc15");
    const crimson = new THREE.Color("#ef4444");
    const whiteHot = new THREE.Color("#ffffff");

    for (let i = 0; i < count; i++) {
      // Spread across hero volume
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10 - 1;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;

      // Color variation between yellow, red, and occasional white-hot spark
      const r = Math.random();
      let c: THREE.Color;
      if (r > 0.85) c = whiteHot;
      else if (r > 0.45) c = yellow;
      else c = crimson;

      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      spd[i] = 0.015 + Math.random() * 0.035;
    }
    return [pos, col, spd];
  }, [count]);

  useFrame(() => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += speeds[i]; // float upwards
      pos[i * 3] += Math.sin(pos[i * 3 + 1] * 1.5 + i) * 0.005; // slight drift

      // reset at top
      if (pos[i * 3 + 1] > 6) {
        pos[i * 3 + 1] = -5;
        pos[i * 3] = (Math.random() - 0.5) * 14;
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Textured Heavy Barbell with 25KG Plates & Clamps
function HeavyBarbell({ mousePos }: { mousePos: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth lerp towards cursor offset
    const targetRotY = (mousePos.current.x * 0.55) + Math.sin(state.clock.elapsedTime * 0.5) * 0.12;
    const targetRotX = (-mousePos.current.y * 0.35) + Math.cos(state.clock.elapsedTime * 0.4) * 0.08;
    const targetRotZ = Math.sin(state.clock.elapsedTime * 0.8) * 0.04 - (mousePos.current.x * 0.15);

    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 4, delta);
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 4, delta);
    groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, targetRotZ, 4, delta);

    // Floating breathing bounce
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      Math.sin(state.clock.elapsedTime * 1.6) * 0.12,
      3,
      delta
    );
  });

  // Materials
  const knurledSteelMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1c1c1f",
        metalness: 0.92,
        roughness: 0.35,
      }),
    []
  );

  const chromeSleeveMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#8a8d93",
        metalness: 0.96,
        roughness: 0.18,
      }),
    []
  );

  const castIronPlateMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#141416",
        metalness: 0.75,
        roughness: 0.55,
      }),
    []
  );

  const redBumperMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#b91c1c",
        metalness: 0.25,
        roughness: 0.4,
      }),
    []
  );

  const yellowAccentMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#facc15",
        metalness: 0.4,
        roughness: 0.3,
        emissive: "#422006",
        emissiveIntensity: 0.4,
      }),
    []
  );

  const clampLockMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#27272a",
        metalness: 0.85,
        roughness: 0.3,
      }),
    []
  );

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 1. Main Barbell Shaft (Cylinder along X axis) */}
      <mesh rotation={[0, 0, Math.PI / 2]} material={knurledSteelMat}>
        <cylinderGeometry args={[0.072, 0.072, 5.4, 32]} />
      </mesh>

      {/* Center Knurling Grips and Marks */}
      <mesh position={[-0.85, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={yellowAccentMat}>
        <cylinderGeometry args={[0.076, 0.076, 0.04, 32]} />
      </mesh>
      <mesh position={[0.85, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={yellowAccentMat}>
        <cylinderGeometry args={[0.076, 0.076, 0.04, 32]} />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={yellowAccentMat}>
        <cylinderGeometry args={[0.074, 0.074, 0.12, 32]} />
      </mesh>

      {/* 2. Left and Right Sleeve Hubs (Shaft stops) */}
      {[-1.65, 1.65].map((pos, idx) => (
        <group key={`collar-stop-${idx}`} position={[pos, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]} material={chromeSleeveMat}>
            <cylinderGeometry args={[0.16, 0.16, 0.08, 32]} />
          </mesh>
        </group>
      ))}

      {/* 3. Left Sleeve */}
      <mesh position={[-2.4, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={chromeSleeveMat}>
        <cylinderGeometry args={[0.125, 0.125, 1.45, 32]} />
      </mesh>

      {/* 4. Right Sleeve */}
      <mesh position={[2.4, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={chromeSleeveMat}>
        <cylinderGeometry args={[0.125, 0.125, 1.45, 32]} />
      </mesh>

      {/* WEIGHT PLATES - LEFT SIDE */}
      <group position={[-1.9, 0, 0]}>
        {/* Plate 1: 25KG Crimson Heavy Bumper */}
        <group position={[-0.05, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]} material={redBumperMat}>
            <cylinderGeometry args={[0.95, 0.95, 0.12, 48]} />
          </mesh>
          {/* Outer Rim Lip */}
          <mesh rotation={[0, 0, Math.PI / 2]} material={castIronPlateMat}>
            <cylinderGeometry args={[0.965, 0.965, 0.09, 48]} />
          </mesh>
          {/* Inner Hub */}
          <mesh rotation={[0, 0, Math.PI / 2]} material={chromeSleeveMat}>
            <cylinderGeometry args={[0.26, 0.26, 0.13, 32]} />
          </mesh>
        </group>

        {/* Plate 2: 25KG Cast Iron Dark Disc */}
        <group position={[-0.2, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]} material={castIronPlateMat}>
            <cylinderGeometry args={[0.92, 0.92, 0.11, 48]} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} material={yellowAccentMat}>
            <cylinderGeometry args={[0.24, 0.24, 0.12, 32]} />
          </mesh>
        </group>

        {/* Plate 3: 20KG Hazard Yellow Accent Ring Plate */}
        <group position={[-0.34, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]} material={yellowAccentMat}>
            <cylinderGeometry args={[0.82, 0.82, 0.09, 48]} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} material={castIronPlateMat}>
            <cylinderGeometry args={[0.835, 0.835, 0.05, 48]} />
          </mesh>
        </group>

        {/* Olympic Clamp / Collar Lock */}
        <group position={[-0.46, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]} material={clampLockMat}>
            <cylinderGeometry args={[0.22, 0.22, 0.09, 32]} />
          </mesh>
          {/* Clamp Lever */}
          <mesh position={[0, 0.24, 0]} material={yellowAccentMat}>
            <boxGeometry args={[0.06, 0.16, 0.06]} />
          </mesh>
        </group>
      </group>

      {/* WEIGHT PLATES - RIGHT SIDE */}
      <group position={[1.9, 0, 0]}>
        {/* Plate 1: 25KG Crimson Heavy Bumper */}
        <group position={[0.05, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]} material={redBumperMat}>
            <cylinderGeometry args={[0.95, 0.95, 0.12, 48]} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} material={castIronPlateMat}>
            <cylinderGeometry args={[0.965, 0.965, 0.09, 48]} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} material={chromeSleeveMat}>
            <cylinderGeometry args={[0.26, 0.26, 0.13, 32]} />
          </mesh>
        </group>

        {/* Plate 2: 25KG Cast Iron Dark Disc */}
        <group position={[0.2, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]} material={castIronPlateMat}>
            <cylinderGeometry args={[0.92, 0.92, 0.11, 48]} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} material={yellowAccentMat}>
            <cylinderGeometry args={[0.24, 0.24, 0.12, 32]} />
          </mesh>
        </group>

        {/* Plate 3: 20KG Hazard Yellow Accent Ring Plate */}
        <group position={[0.34, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]} material={yellowAccentMat}>
            <cylinderGeometry args={[0.82, 0.82, 0.09, 48]} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} material={castIronPlateMat}>
            <cylinderGeometry args={[0.835, 0.835, 0.05, 48]} />
          </mesh>
        </group>

        {/* Olympic Clamp / Collar Lock */}
        <group position={[0.46, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]} material={clampLockMat}>
            <cylinderGeometry args={[0.22, 0.22, 0.09, 32]} />
          </mesh>
          {/* Clamp Lever */}
          <mesh position={[0, 0.24, 0]} material={yellowAccentMat}>
            <boxGeometry args={[0.06, 0.16, 0.06]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

export default function HeroCanvas() {
  const mousePos = useRef({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    mousePos.current = { x, y };
  };

  return (
    <div
      className="relative w-full h-[480px] sm:h-[580px] lg:h-[680px] cursor-grab active:cursor-grabbing select-none"
      onPointerMove={handlePointerMove}
    >
      <Canvas
        camera={{ position: [0, 0.3, 4.8], fov: 42 }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
        }}
      >
        <color attach="background" args={["#0a0a0a"]} />
        <fog attach="fog" args={["#0a0a0a", 3.5, 9.5]} />

        {/* Dynamic Studio Lighting */}
        {/* Harsh Crimson Rim Light from left */}
        <spotLight
          position={[-6.5, -0.8, -1.8]}
          intensity={5.5}
          color="#ef4444"
          angle={0.65}
          penumbra={0.8}
          distance={16}
        />
        <pointLight position={[-4, 1.2, 1]} intensity={2.5} color="#dc2626" distance={10} />

        {/* Electric Cyber Yellow Key Light from top-right */}
        <spotLight
          position={[5.5, 4.8, 3.2]}
          intensity={6.0}
          color="#facc15"
          angle={0.55}
          penumbra={0.7}
          distance={18}
        />
        <pointLight position={[3.5, -2, 2]} intensity={2} color="#ffe600" distance={10} />

        {/* Backlight / Silhouette Rim */}
        <directionalLight position={[0, 4, -4]} intensity={1.8} color="#9ca3af" />
        <ambientLight intensity={0.4} />

        {/* Particles */}
        <EmberDust count={300} />

        {/* 3D Barbell */}
        <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.3}>
          <HeavyBarbell mousePos={mousePos} />
        </Float>

        {/* Moody ground shadow */}
        <ContactShadows
          position={[0, -1.6, 0]}
          opacity={0.85}
          scale={10}
          blur={2.4}
          far={4.5}
          color="#000000"
        />
      </Canvas>

      {/* Floating HUD overlay indicator */}
      <div className="pointer-events-none absolute bottom-4 left-6 flex items-center gap-3 text-xs font-mono text-[#9ca3af]/70 tracking-widest uppercase">
        <span className="inline-block w-2 h-2 bg-[#facc15] animate-ping rounded-full" />
        <span>3D RAW IRON ENGINE // PARALLAX ACTIVE</span>
      </div>

      <div className="pointer-events-none absolute top-4 right-6 text-right font-mono text-[10px] text-[#9ca3af]/60 tracking-wider">
        <span className="text-[#facc15] font-bold">KRONOS TITAN-220</span>
        <br />
        OLYMPIC STEEL // 20KG BAR + 140KG IRON
      </div>
    </div>
  );
}

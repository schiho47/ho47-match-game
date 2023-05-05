import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";


interface WorkInProps {}

const WorkIn: React.FC<WorkInProps> = ({}) => {
  return (
    <Canvas
      camera={{ position: [30, -55, 90] }}
      style={{
        height: "100vh",
        width: "100vw",
        position:'absolute',
        top:'0',
        zIndex:'-1'
      }}
    >
      <Environment files="assets/index/old_map_background.hdr" background />
      <OrbitControls autoRotate autoRotateSpeed={0.1} enableZoom={false} />
    </Canvas>
  );
};

export default WorkIn;
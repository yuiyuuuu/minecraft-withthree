import { Physics } from "@react-three/cannon";
import { Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Ground } from "./components/Ground.jsx";
import { Player } from "./components/Player.jsx";
import { FirstPersonView } from "./components/FirstPersonView.jsx";
// import React from "react";

import "./index.scss";
import Cubes from "./components/Cubes.jsx";

const App = () => {
  return (
    <>
      <Canvas>
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={0.5} />
        <FirstPersonView />
        <Physics>
          <Player />
          <Cubes />
          <Ground />
        </Physics>
      </Canvas>

      <div
        className='pointer'
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          color: "white",
        }}
      >
        +
      </div>
    </>
  );
};

export default App;

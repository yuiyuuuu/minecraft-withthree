import { Physics } from "@react-three/cannon";
import { Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Ground } from "./components/Ground.jsx";
import { Player } from "./components/Player.jsx";
import { FirstPersonView } from "./components/FirstPersonView.jsx";
// import React from "react";

import dirtImage from "./images/dirt.jpeg";
import glass from "./images/glass.png";
import grass from "./images/grass.jpeg";
import log from "./images/log.jpeg";
import wood from "./images/wood.png";

import "./index.scss";
import Cubes from "./components/Cubes.jsx";

import { useCallback, useEffect, useState } from "react";
import { useStore } from "./store/useStore.jsx";

const App = () => {
  const [shouldShow, setShouldShow] = useState(false);

  const [texture, setTexture] = useStore((state) => [
    state.texture,
    state.setTexture,
  ]);

  const backquoteKey = useCallback((e) => {
    if (e.code === "Backquote") {
      setShouldShow(true);
      if (texture === "dirt") {
        setTexture("glass");
        return;
      }

      if (texture === "glass") {
        setTexture("grass");
        return;
      }

      if (texture === "grass") {
        setTexture("log");
        return;
      }

      if (texture === "log") {
        setTexture("wood");
        return;
      }

      if (texture === "wood") {
        setTexture("dirt");
        return;
      }
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", backquoteKey);

    document.addEventListener("keyup", (e) => {
      if (e.code === "Backquote") setShouldShow(false);
    });

    return () => {
      document.removeEventListener("keydown", backquoteKey);
    };
  }, [texture]);

  return (
    <>
      <Canvas>
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={0.5} />
        <FirstPersonView />
        <Physics gravity={[0, -30.81, 0]}>
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

      <div
        style={{
          display: shouldShow ? "flex" : "none",
          flexDirection: "row",
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          aspectRatio: 3,
          height: "10vh",
        }}
      >
        <img
          src={dirtImage}
          alt='dirt'
          style={{ border: texture === "dirt" ? "3px solid red" : "" }}
        />
        <img
          src={glass}
          alt='glass'
          style={{ border: texture === "glass" ? "3px solid red" : "" }}
        />

        <img
          src={grass}
          alt='grass'
          style={{ border: texture === "grass" ? "3px solid red" : "" }}
        />

        <img
          src={log}
          alt='log'
          style={{ border: texture === "log" ? "3px solid red" : "" }}
        />
        <img
          src={wood}
          alt='wood'
          style={{ border: texture === "wood" ? "3px solid red" : "" }}
        />
      </div>
    </>
  );
};

export default App;

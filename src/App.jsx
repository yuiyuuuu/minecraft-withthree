import { Physics } from "@react-three/cannon";
import { Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Ground } from "./components/Ground.jsx";
import { Player } from "./components/Player.jsx";
import { FirstPersonView } from "./components/FirstPersonView.jsx";
import Menu from "./components/Menu.jsx";

import dirtImage from "./images/dirt.jpeg";
import glass from "./images/glass.png";
import grass from "./images/grass.jpeg";
import log from "./images/log.jpeg";
import wood from "./images/wood.png";

import "./index.scss";
import Cubes from "./components/Cubes.jsx";

import { useCallback, useEffect, useState } from "react";
import { useStore } from "./store/useStore.jsx";

import $ from "jquery";

const App = () => {
  const [shouldShow, setShouldShow] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const [gravity, setGravity] = useState(true);

  const [texture, setTexture] = useStore((state) => [
    state?.texture,
    state?.setTexture,
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

  useEffect(() => {
    function handleCaps(e) {
      if (e.code === "ShiftLeft") {
        setShowHelp(true);
      }
    }

    function removeCaps(e) {
      if (e.code === "ShiftLeft") {
        setShowHelp(false);
      }
    }
    document.addEventListener("keydown", handleCaps);

    document.addEventListener("keyup", removeCaps);

    return () => {
      document.removeEventListener("keydown", handleCaps);
      document.removeEventListener("keyup", removeCaps);
    };
  }, [showHelp]);

  // console.log(showHelp);
  return (
    <>
      <Canvas
        id='canvas-main'
        style={{ pointerEvents: "none" }}
        className='disabled'
      >
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={0.5} />
        <FirstPersonView />
        <Physics gravity={gravity ? [0, -15.81, 0] : [0, -2, 0]}>
          <Player />
          <Cubes />
          <Ground />
        </Physics>
      </Canvas>

      <Menu setGravity={setGravity} />

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

      <div
        className='overlay-parent'
        style={{ display: showHelp ? "" : "none" }}
      >
        <div className='instructions-overlay'>
          <div>Tutorial</div>

          <div className='tutorial'>Movement - W, A, S, D</div>
          <div className='tutorial'>Jump - Space</div>
          <div className='tutorial'>Left Click - Place Block</div>
          <div className='tutorial'>
            Alt/Option + Left Click - Destroy Block
          </div>
          <div className='tutorial'>Camera - Mouse / Trackpad</div>
          <div className='tutorial'>
            Switch Block - ` key (top left of keyboard below esc key)
          </div>
          <a
            href='https://github.com/yuiyuuuu/minecraft-withthree'
            target='_blank'
            rel='noreferrer'
          >
            <div className='tutorial link'>
              Source Code (click esc then click link)
            </div>
          </a>
        </div>
      </div>

      <div
        style={{ position: "absolute", top: 20, right: 20, fontSize: "12px" }}
      >
        Hold left shift on your keyboard for instructions
      </div>
    </>
  );
};

export default App;

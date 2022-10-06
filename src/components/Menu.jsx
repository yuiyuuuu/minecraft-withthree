import React from "react";

import { useStore } from "../store/useStore";
const setLocalStorage = (key, value) =>
  window.localStorage.setItem(key, JSON.stringify(value));

const Menu = ({ setGravity }) => {
  const [reset, cubes] = useStore((state) => [state?.resetWorld, state.cubes]);

  function saveWorld() {
    setLocalStorage("cubes", cubes);
  }
  return (
    <div
      style={{
        width: "250px",
        display: "flex",
        flexDirection: "row",
        position: "absolute",
        top: 20,
        left: 0,
      }}
    >
      <div className='buttons' onClick={() => saveWorld()}>
        Save
      </div>
      <div
        className='buttons'
        style={{ width: "80px" }}
        onClick={() => reset()}
      >
        Reset
      </div>

      <div
        className='buttons'
        style={{ width: "100px" }}
        onClick={() => setGravity((prev) => !prev)}
      >
        Gravity
      </div>
    </div>
  );
};

export default Menu;

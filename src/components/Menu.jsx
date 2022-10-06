import React from "react";

import { useStore } from "../store/useStore";
const setLocalStorage = (key, value) =>
  window.localStorage.setItem(key, JSON.stringify(value));

const Menu = () => {
  const [reset, cubes] = useStore((state) => [state?.resetWorld, state.cubes]);

  function saveWorld() {
    setLocalStorage("cubes", cubes);
  }
  return (
    <div
      style={{
        width: "200px",
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
      <div className='buttons' onClick={() => reset()}>
        Reset
      </div>
    </div>
  );
};

export default Menu;

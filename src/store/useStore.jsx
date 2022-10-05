import create from "zustand";
import { nanoid } from "nanoid";

export const useStore = create((set) => ({
  texture: "dirt", //default cube
  cubes: [
    {
      key: nanoid(),
      pos: [1, 0.5, 1],
      texture: "dirt",
    },
    {
      key: nanoid(),
      pos: [10, 0.5, 1],
      texture: "grass",
    },
  ], //array of current cubes on the map
  addCube: (x, y, z) => {
    set((prev) => ({
      cubes: [
        ...prev.cubes, //adds the cube to the cube array, but we still have all the previous subes
        {
          key: nanoid(), //random id from nano
          pos: [x, y, z],
          texture: prev.texture,
        },
      ],
    }));
  },
  removeCube: () => {},
  setTexture: () => {},
  saveWorld: () => {},
  resetWorld: () => {},
}));

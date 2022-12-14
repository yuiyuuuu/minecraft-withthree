import create from "zustand";
import { nanoid } from "nanoid";

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));

export const useStore = create((set) => ({
  texture: "glass", //default cube
  cubes: getLocalStorage("cubes") || [], //array of current cubes on the map
  playerPosition: [],
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
  removeCube: (x, y, z) => {
    set((prev) => ({
      cubes: prev.cubes.filter((cube) => {
        const [X, Y, Z] = cube.pos;
        return X !== x || Y !== y || Z !== z; //return for filter means if any of these are true, then we keep the object. if all of them are false, then we remove
      }),
    }));
  },
  setTexture: (texture) => {
    set((prev) => ({
      texture: texture,
    }));
  },
  savePlayerPos: (x, y, z) => {
    set((prev) => ({
      playerPosition: [x, y, z],
    }));
  },

  resetWorld: () => {
    set(() => ({
      cubes: [],
    }));
  },
}));

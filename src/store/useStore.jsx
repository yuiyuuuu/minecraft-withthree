import create from "zustand";
import { nanoid } from "nanoid";

export const useStore = create((set) => ({
  texture: "dirt", //default cube
  cubes: [], //array of current cubes on the map
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
    console.log("ran");
    set((prev) => ({
      cubes: prev.cubes.filter((cube) => {
        const [X, Y, Z] = cube.pos;
        return X !== x || Y !== y || Z !== z; //return for filter means if any of these are true, then we keep the object. if all of them are false, then we remove
      }),
    }));
  },
  setTexture: () => {},
  saveWorld: () => {},
  resetWorld: () => {},
}));

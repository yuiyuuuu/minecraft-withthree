import { useBox } from "@react-three/cannon";
import * as textures from "../images/textures.jsx";
import { useStore } from "../store/useStore.jsx";

const Cube = ({ position, texture }) => {
  const [ref] = useBox(() => ({
    type: "Static",
    position,
  }));

  const [addCube, removeCube, playerPos] = useStore((state) => [
    state?.addCube,
    state?.removeCube,
    state?.playerPosition,
  ]);

  const activeTexture = textures[texture + "Texture"];

  return (
    <mesh
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        const clickedFace = Math.floor(e.faceIndex / 2);
        const [x, y, z] = ref.current.position;

        if (e.altKey) {
          removeCube(x, y, z);
          return;
        }

        if (clickedFace === 1) {
          if (playerPos[0] < x && playerPos[0] > x - 2) {
            return;
          } else {
            addCube(x - 1, y, z);
          }
        }

        if (clickedFace === 4) {
          if (playerPos[2] > z && playerPos[2] < z + 2) {
            return;
          } else {
            addCube(x, y, z + 1);
          }
        }

        if (clickedFace === 0) {
          if (playerPos[0] > x && playerPos[0] < x + 2) {
            return;
          } else {
            addCube(x + 1, y, z);
          }
        }

        if (clickedFace === 5) {
          if (playerPos[2] < z && playerPos[2] > z - 2) {
            return;
          } else {
            addCube(x, y, z - 1);
          }
        }

        if (clickedFace === 2) {
          if (playerPos[1] < y + 2 && playerPos[1] > y) {
            return;
          } else {
            addCube(x, y + 1, z);
          }
        }

        if (clickedFace === 3) {
          addCube(x, y - 1, z);
        }
      }}
    >
      <boxBufferGeometry attatch='geometry' />
      <meshStandardMaterial map={activeTexture} attatch='material' />
    </mesh>
  );
};

export default Cube;

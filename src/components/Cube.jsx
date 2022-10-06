import { useBox } from "@react-three/cannon";
import * as textures from "../images/textures.jsx";
import { useStore } from "../store/useStore.jsx";

const Cube = ({ position, texture }) => {
  const [ref] = useBox(() => ({
    type: "Static",
    position,
  }));

  const [addCube, removeCube] = useStore((state) => [
    state.addCube,
    state.removeCube,
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
          addCube(x - 1, y, z);
        }

        if (clickedFace === 4) {
          addCube(x, y, z + 1);
        }

        if (clickedFace === 0) {
          addCube(x + 1, y, z);
        }

        if (clickedFace === 5) {
          addCube(x, y, z - 1);
        }

        if (clickedFace === 2) {
          addCube(x, y + 1, z);
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

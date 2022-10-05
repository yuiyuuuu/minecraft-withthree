import { useBox } from "@react-three/cannon";
import * as textures from "../images/textures.jsx";

const Cube = ({ position, texture }) => {
  const [ref] = useBox(() => ({
    type: "Static",
    position,
  }));

  const activeTexture = textures[texture + "Texture"];

  return (
    <mesh ref={ref}>
      <boxBufferGeometry attatch='geometry' />
      <meshStandardMaterial map={activeTexture} attatch='material' />
    </mesh>
  );
};

export default Cube;
